import type { NoteState } from './types';
import { buildMatrixObjective, getJointRestrictionSegments } from '@/data/segments';
import { ORTHO_NEURO_TESTS, ROM_REGIONS, ROM_GRADE_OPTIONS } from '@/data/ortho-tests';
import { selectVariant, LOCKED_ASSESSMENT, VERBAL_CONSENT } from '@/data/note-phrases';
import {
  REGION_OPTIONS, expandConcern, TOLERANCE_OPTIONS, IMPROVEMENT_OPTIONS,
  TECHNIQUE_OPTIONS, POSITION_OPTIONS, POSTURE_OPTIONS, PALPATION_OPTIONS,
  PLAN_ADDON_OPTIONS, FOLLOWUP_OPTIONS, PROCEDURE_REGION_OPTIONS,
} from '@/data/soap-options';

function getLabel(value: string, options: { value: string; label: string }[]): string {
  if (!value) return '';
  return options.find(o => o.value === value)?.label || value;
}

// ─── SUBJECTIVE ──────────────────────────────────────────────────────────────

function buildSubjective(state: NoteState): string {
  const s = state.subjective;
  const lines: string[] = [];

  const opening = selectVariant(`opening_${s.visitType}`);
  const regionLabels = (s.regions || []).filter(Boolean).map(r => {
    const label = getLabel(r, REGION_OPTIONS) || r || '';
    return label.toLowerCase().replace('ctl (cervical/thoracic/lumbar)', 'cervical, thoracic, and lumbar');
  });
  const concernLabels = (s.concerns || []).filter(Boolean).map(c => expandConcern(c));

  let complaint = '';
  if (regionLabels.length > 0 && concernLabels.length > 0) {
    complaint = `${regionLabels.join(' and ')} ${concernLabels.join(', ')}`;
  } else if (regionLabels.length > 0) {
    complaint = `${regionLabels.join(' and ')} region${regionLabels.length > 1 ? 's' : ''}`;
  } else if (concernLabels.length > 0) {
    complaint = concernLabels.join(', ');
  } else {
    complaint = 'general wellness maintenance';
  }

  lines.push(`${opening} ${complaint}.`);
  if (s.adverseResponse) lines.push(selectVariant('adverse_denial'));
  if (s.newSensations) lines.push(selectVariant('no_new_sensations'));
  if (s.visitType === 'new' || s.visitType === 'reactivation') {
    lines.push('No VBI or other neurological or orthopedic-related symptoms reported.');
  }

  return lines.join(' ');
}

// ─── OBJECTIVE ───────────────────────────────────────────────────────────────
// Compiles ALL matrix checkbox findings into clinical sentences

function buildObjective(state: NoteState): string {
  const lines: string[] = [];

  // 1. Motion palpation intro with joint restriction segments
  const jrSegments = getJointRestrictionSegments(state.segmentMatrix);
  if (jrSegments.length > 0) {
    const intro = selectVariant('motion_palpation_intro');
    lines.push(`${intro} ${jrSegments.join(', ')}.`);
  }

  // 2. Build detailed findings from matrix (JR, TP, TM, Other with sides)
  const matrixLines = buildMatrixObjective(state.segmentMatrix);
  for (const line of matrixLines) {
    // Skip the JR line if we already have the motion palpation intro
    if (jrSegments.length > 0 && line.startsWith('Segmental joint restriction')) continue;
    lines.push(line);
  }

  // If no JR segments but other findings exist, still include the detailed lines
  if (jrSegments.length === 0 && matrixLines.length > 0) {
    // matrixLines already includes everything
  }

  // 3. ROM assessment (new/reactivation)
  for (const [regionId, grade] of Object.entries(state.romAssessment)) {
    if (!grade) continue;
    const regionLabel = ROM_REGIONS.find(r => r.id === regionId)?.label || regionId;
    const gradeLabel = ROM_GRADE_OPTIONS.find(g => g.value === grade)?.label.toLowerCase() || grade;
    lines.push(grade === 'wnl' ? `${regionLabel} within normal limits.` : `${regionLabel} ${gradeLabel}.`);
  }

  // 4. Ortho/neuro tests (only performed ones)
  for (const test of state.orthoNeuroTests) {
    if (test.result === 'not-tested') continue;
    const testDef = ORTHO_NEURO_TESTS.find(t => t.id === test.test);
    const testName = testDef?.label || test.test;
    const resultText = test.result === 'positive' ? 'positive' : test.result === 'negative' ? 'negative' : 'within normal limits';
    const sideText = test.side === 'left' ? ' on the left' : test.side === 'right' ? ' on the right' : test.side === 'bilateral' ? ' bilaterally' : '';
    lines.push(`${testName} ${resultText}${sideText}.`);
  }

  // 5. Posture
  if (state.objective.posture.length > 0) {
    lines.push(`Postural observation: ${state.objective.posture.map(p => getLabel(p, POSTURE_OPTIONS).toLowerCase()).join(', ')}.`);
  }

  // 6. Palpation
  if (state.objective.palpation.length > 0) {
    lines.push(`Palpation: ${state.objective.palpation.map(p => getLabel(p, PALPATION_OPTIONS).toLowerCase()).join(', ')}.`);
  }

  return lines.join(' ');
}

// ─── PROCEDURES ──────────────────────────────────────────────────────────────

function buildProcedures(state: NoteState): string {
  const lines: string[] = [];

  for (const [region, proc] of Object.entries(state.procedures)) {
    if (!proc.technique) continue;
    const regionLabel = PROCEDURE_REGION_OPTIONS.find(o => o.value === region)?.label || region;
    const techOpt = TECHNIQUE_OPTIONS.find(o => o.value === proc.technique);
    const techText = techOpt?.noteText || techOpt?.label || proc.technique;
    const posLabel = proc.position ? POSITION_OPTIONS.find(o => o.value === proc.position)?.label.toLowerCase() || proc.position : '';
    lines.push(posLabel ? `${regionLabel} ${techText} – ${posLabel}` : `${regionLabel} ${techText}`);
  }

  if (lines.length > 0) lines.push(VERBAL_CONSENT);
  return lines.join('\n');
}

// ─── RESPONSE ────────────────────────────────────────────────────────────────

function buildResponse(state: NoteState): string {
  const parts: string[] = [];
  const r = state.response;

  if (r.tolerance) {
    if (r.tolerance === 'tolerated-well') parts.push(selectVariant('tolerance_well'));
    else if (r.tolerance === 'without-incident') parts.push(selectVariant('tolerance_without_incident'));
    else parts.push(`Client ${getLabel(r.tolerance, TOLERANCE_OPTIONS).toLowerCase()}.`);
  }

  const real = r.improvements.filter(i => i !== 'none-reported');
  if (real.length > 0) {
    parts.push(`Reported ${real.map(i => getLabel(i, IMPROVEMENT_OPTIONS).toLowerCase()).join(' and ')}.`);
  }

  return parts.join(' ');
}

// ─── PLAN ────────────────────────────────────────────────────────────────────

function buildPlan(state: NoteState): string {
  const lines: string[] = [];

  lines.push(state.subjective.visitType === 'ongoing'
    ? 'Continue maintenance chiropractic care while client demonstrates continued positive response and functional improvement.'
    : 'Recommend chiropractic care one to two times per week while client demonstrates continued positive response and functional improvement.'
  );

  for (const addon of state.plan.addOns) lines.push(getLabel(addon, PLAN_ADDON_OPTIONS) + '.');
  if (state.plan.followUp && state.plan.followUp !== 'as-scheduled') {
    lines.push(getLabel(state.plan.followUp, FOLLOWUP_OPTIONS) + '.');
  }

  return lines.join(' ');
}

// ─── GENERATE ────────────────────────────────────────────────────────────────

export function generateNote(state: NoteState): string {
  return [
    { header: 'SUBJECTIVE', content: buildSubjective(state) },
    { header: 'OBJECTIVE', content: buildObjective(state) },
    { header: 'ASSESSMENT', content: LOCKED_ASSESSMENT },
    { header: 'PROCEDURES', content: buildProcedures(state) },
    { header: 'RESPONSE', content: buildResponse(state) },
    { header: 'PLAN', content: buildPlan(state) },
  ]
    .filter(s => s.content.trim().length > 0)
    .map(s => `${s.header}:\n${s.content}`)
    .join('\n\n');
}
