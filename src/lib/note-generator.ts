import type { NoteState } from './types';
import type { AppConfig } from './config-schema';

function getLabel(value: string, options: { value: string; label: string }[]): string {
  if (!value) return '';
  return options.find(o => o.value === value)?.label || value;
}

function getDailyHash(): number {
  const d = new Date();
  const s = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function pickVariant(phrases: string[]): string {
  if (!phrases || phrases.length === 0) return '';
  return phrases[getDailyHash() % phrases.length];
}

function expandConcern(value: string, options: { value: string; label: string; expandedLabel?: string }[]): string {
  const opt = options.find(o => o.value === value);
  return opt?.expandedLabel || opt?.label?.toLowerCase() || value;
}

// ─── Build matrix objective from config-driven findings ──────────────────────

function buildMatrixObjective(state: NoteState, config: AppConfig): string[] {
  const lines: string[] = [];
  if (!config.matrix.enabled) return lines;

  const { regions, findingTypes } = config.matrix;

  // Group findings by type
  const byType: Record<string, string[]> = {};
  for (const ft of findingTypes) byType[ft.key] = [];

  for (const region of regions) {
    const seg = state.segmentMatrix[region.id];
    if (!seg) continue;

    for (const ft of findingTypes) {
      const hasL = !!seg[`${ft.key}L`];
      const hasR = !!seg[`${ft.key}R`];
      if (!hasL && !hasR) continue;

      const side = hasL && hasR ? 'bilaterally' : hasL ? 'on the left' : 'on the right';
      byType[ft.key].push(`${region.label} ${side}`);
    }
  }

  // Generate sentences per finding type
  for (const ft of findingTypes) {
    const items = byType[ft.key];
    if (items.length === 0) continue;
    lines.push(`${ft.fullLabel} noted at ${items.join(', ')}.`);
  }

  return lines;
}

function getMatrixFindingIds(state: NoteState, config: AppConfig): string[] {
  if (!config.matrix.enabled) return [];
  const ids: string[] = [];
  for (const region of config.matrix.regions) {
    const seg = state.segmentMatrix[region.id];
    if (!seg) continue;
    const hasAny = config.matrix.findingTypes.some(ft => seg[`${ft.key}L`] || seg[`${ft.key}R`]);
    if (hasAny) ids.push(region.label);
  }
  return ids;
}

// ─── SOAP/DAP generators ─────────────────────────────────────────────────────

function buildSubjective(state: NoteState, config: AppConfig): string {
  const s = state.subjective;
  const lines: string[] = [];
  const key = s.visitType === 'reactivation' ? 'reactivation' : s.visitType === 'new' ? 'new' : 'ongoing';
  const opening = pickVariant(config.templates.openingPhrases[key]);

  const regionLabels = (s.regions || []).filter(Boolean).map(r => getLabel(r, config.options.regions).toLowerCase());
  const concernLabels = (s.concerns || []).filter(Boolean).map(c => expandConcern(c, config.options.concerns));

  let complaint = '';
  if (regionLabels.length > 0 && concernLabels.length > 0) complaint = `${regionLabels.join(' and ')} ${concernLabels.join(', ')}`;
  else if (regionLabels.length > 0) complaint = `${regionLabels.join(' and ')} region${regionLabels.length > 1 ? 's' : ''}`;
  else if (concernLabels.length > 0) complaint = concernLabels.join(', ');
  else complaint = 'general wellness maintenance';

  lines.push(`${opening} ${complaint}.`);
  if (s.adverseResponse) lines.push(pickVariant(config.templates.adverseDenialPhrases));
  if (s.newSensations) lines.push(pickVariant(config.templates.noNewSensationsPhrases));
  if ((s.visitType === 'new' || s.visitType === 'reactivation') && config.templates.vbiStatement) {
    lines.push(config.templates.vbiStatement);
  }

  return lines.join(' ');
}

function buildObjective(state: NoteState, config: AppConfig): string {
  const lines: string[] = [];

  // Matrix findings
  const findingIds = getMatrixFindingIds(state, config);
  if (findingIds.length > 0) {
    const intro = pickVariant(config.templates.objectiveIntros);
    lines.push(`${intro} ${findingIds.join(', ')}.`);
  }

  const matrixLines = buildMatrixObjective(state, config);
  lines.push(...matrixLines);

  // ROM
  if (config.romAssessment.enabled) {
    for (const [regionId, grade] of Object.entries(state.romAssessment)) {
      if (!grade) continue;
      const label = config.romAssessment.regions.find(r => r.id === regionId)?.label || regionId;
      const gradeLabel = config.romAssessment.grades.find(g => g.value === grade)?.label.toLowerCase() || grade;
      lines.push(grade === 'wnl' ? `${label} within normal limits.` : `${label} ${gradeLabel}.`);
    }
  }

  // Tests
  if (config.tests.enabled) {
    for (const test of state.orthoNeuroTests) {
      if (test.result === 'not-tested') continue;
      const def = config.tests.items.find(t => t.id === test.test);
      const name = def?.label || test.test;
      const result = test.result === 'positive' ? 'positive' : test.result === 'negative' ? 'negative' : 'within normal limits';
      const side = test.side === 'left' ? ' on the left' : test.side === 'right' ? ' on the right' : test.side === 'bilateral' ? ' bilaterally' : '';
      lines.push(`${name} ${result}${side}.`);
    }
  }

  // Posture + palpation
  if (state.objective.posture.length > 0) {
    lines.push(`Postural observation: ${state.objective.posture.map(p => getLabel(p, config.options.posture).toLowerCase()).join(', ')}.`);
  }
  if (state.objective.palpation.length > 0) {
    lines.push(`Palpation: ${state.objective.palpation.map(p => getLabel(p, config.options.palpation).toLowerCase()).join(', ')}.`);
  }

  return lines.join(' ');
}

function buildProcedures(state: NoteState, config: AppConfig): string {
  const lines: string[] = [];

  // For mental health, show interventions instead of procedures
  if (config.noteFormat === 'dap' && config.options.interventions) {
    const interventions = (state as any).interventions as string[] || [];
    if (interventions.length > 0) {
      const labels = interventions.map(i => {
        const opt = config.options.interventions?.find(o => o.value === i);
        return opt?.noteText || opt?.label || i;
      });
      return `Interventions utilized: ${labels.join(', ')}.`;
    }
    return '';
  }

  for (const [region, proc] of Object.entries(state.procedures)) {
    if (!proc.technique) continue;
    const regionLabel = getLabel(region, config.options.procedureRegions);
    const techOpt = config.options.techniques.find(o => o.value === proc.technique);
    const techText = techOpt?.noteText || techOpt?.label || proc.technique;
    const posLabel = proc.position ? getLabel(proc.position, config.options.positions).toLowerCase() : '';
    lines.push(posLabel ? `${regionLabel} ${techText} – ${posLabel}` : `${regionLabel} ${techText}`);
  }

  if (lines.length > 0 && config.templates.consentLine) lines.push(config.templates.consentLine);
  return lines.join('\n');
}

function buildResponse(state: NoteState, config: AppConfig): string {
  const parts: string[] = [];
  if (state.response.tolerance) {
    if (state.response.tolerance === 'tolerated-well') parts.push(pickVariant(config.templates.tolerancePhrases.well));
    else if (state.response.tolerance === 'without-incident') parts.push(pickVariant(config.templates.tolerancePhrases.withoutIncident));
    else parts.push(`Client ${getLabel(state.response.tolerance, config.options.tolerance).toLowerCase()}.`);
  }
  const real = state.response.improvements.filter(i => i !== 'none-reported');
  if (real.length > 0) parts.push(`Reported ${real.map(i => getLabel(i, config.options.improvements).toLowerCase()).join(' and ')}.`);
  return parts.join(' ');
}

function buildPlan(state: NoteState, config: AppConfig): string {
  const lines: string[] = [];
  lines.push(state.subjective.visitType === 'ongoing' ? config.templates.planOngoing : config.templates.planNew);
  for (const addon of state.plan.addOns) lines.push(getLabel(addon, config.options.planAddOns) + '.');
  if (state.plan.followUp && state.plan.followUp !== 'as-scheduled' && state.plan.followUp !== 'weekly') {
    lines.push(getLabel(state.plan.followUp, config.options.followUp) + '.');
  }
  return lines.join(' ');
}

// ─── GENERATE ────────────────────────────────────────────────────────────────

export function generateNote(state: NoteState, config: AppConfig): string {
  if (config.noteFormat === 'dap') {
    // DAP format: Data, Assessment, Plan
    const data = [buildSubjective(state, config), buildObjective(state, config)].filter(Boolean).join(' ');
    return [
      { header: 'DATA', content: data },
      { header: 'ASSESSMENT', content: config.templates.assessmentText },
      { header: 'PLAN', content: [buildProcedures(state, config), buildPlan(state, config)].filter(Boolean).join('\n') },
    ]
      .filter(s => s.content.trim().length > 0)
      .map(s => `${s.header}:\n${s.content}`)
      .join('\n\n');
  }

  // SOAP format
  return [
    { header: 'SUBJECTIVE', content: buildSubjective(state, config) },
    { header: 'OBJECTIVE', content: buildObjective(state, config) },
    { header: 'ASSESSMENT', content: config.templates.assessmentText },
    { header: 'PROCEDURES', content: buildProcedures(state, config) },
    { header: 'RESPONSE', content: buildResponse(state, config) },
    { header: 'PLAN', content: buildPlan(state, config) },
  ]
    .filter(s => s.content.trim().length > 0)
    .map(s => `${s.header}:\n${s.content}`)
    .join('\n\n');
}
