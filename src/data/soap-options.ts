// ─── Subjective Options ──────────────────────────────────────────────────────

export const REGION_OPTIONS = [
  { value: 'cervical', label: 'Cervical' },
  { value: 'thoracic', label: 'Thoracic' },
  { value: 'lumbar', label: 'Lumbar' },
  { value: 'pelvic', label: 'Pelvic' },
  { value: 'full-spine', label: 'Full spine' },
  { value: 'ctl', label: 'CTL (cervical/thoracic/lumbar)' },
];

export const CONCERN_OPTIONS = [
  { value: 'ubnas', label: 'UBNAS', expandedLabel: 'upper back, neck and shoulder tension' },
  { value: 'lbp', label: 'LBP', expandedLabel: 'lower back discomfort' },
  { value: 'tension', label: 'Tension', expandedLabel: 'tension' },
  { value: 'stiffness', label: 'Stiffness', expandedLabel: 'stiffness' },
  { value: 'limited-mobility', label: 'Limited mobility', expandedLabel: 'limited mobility' },
  { value: 'general-wellness', label: 'General wellness', expandedLabel: 'general wellness maintenance' },
  { value: 'posture', label: 'Posture', expandedLabel: 'postural concerns' },
  { value: 'headaches', label: 'Headaches', expandedLabel: 'headaches' },
  { value: 'discomfort', label: 'Discomfort', expandedLabel: 'discomfort' },
  { value: 'intermittent-tension', label: 'Intermittent tension', expandedLabel: 'intermittent tension and stiffness' },
];

export function expandConcern(value: string): string {
  const opt = CONCERN_OPTIONS.find(o => o.value === value);
  return opt?.expandedLabel || opt?.label.toLowerCase() || value;
}

// ─── Objective Options ───────────────────────────────────────────────────────

export const ROM_OPTIONS = [
  { value: 'wnl', label: 'WNL (within normal limits)' },
  { value: 'decreased', label: 'Decreased' },
  { value: 'significantly-decreased', label: 'Significantly decreased' },
  { value: 'not-assessed', label: 'Not assessed' },
];

export const POSTURE_OPTIONS = [
  { value: 'forward-head', label: 'Forward head posture' },
  { value: 'increased-kyphosis', label: 'Increased thoracic kyphosis' },
  { value: 'decreased-lordosis', label: 'Decreased lumbar lordosis' },
  { value: 'increased-lordosis', label: 'Increased lumbar lordosis' },
  { value: 'pelvic-tilt', label: 'Pelvic tilt' },
  { value: 'uneven-shoulders', label: 'Uneven shoulder height' },
  { value: 'lateral-shift', label: 'Lateral shift' },
  { value: 'wnl', label: 'Within normal limits' },
];

export const PALPATION_OPTIONS = [
  { value: 'cervical-hypertonicity', label: 'Cervical hypertonicity' },
  { value: 'thoracic-hypertonicity', label: 'Thoracic hypertonicity' },
  { value: 'lumbar-hypertonicity', label: 'Lumbar hypertonicity' },
  { value: 'upper-trap-tension', label: 'Upper trapezius tension' },
  { value: 'paraspinal-tension', label: 'Paraspinal tension' },
  { value: 'trigger-points', label: 'Trigger points identified' },
];

// ─── Procedure Options ───────────────────────────────────────────────────────
// Format in note: "Region technique – position"
// e.g., "Cervical diversified adjustment – prone"

export const PROCEDURE_REGION_OPTIONS = [
  { value: 'cervical', label: 'Cervical' },
  { value: 'thoracic', label: 'Thoracic' },
  { value: 'lumbar', label: 'Lumbar' },
  { value: 'lumbopelvic', label: 'Lumbopelvic' },
  { value: 'pelvic', label: 'Pelvic' },
  { value: 'ctl', label: 'Cervical/thoracic/lumbar' },
  { value: 'full-spine', label: 'Full spine' },
];

export const TECHNIQUE_OPTIONS = [
  { value: 'diversified', label: 'Diversified', noteText: 'diversified adjustment' },
  { value: 'joint-mobilization', label: 'Joint mobilization', noteText: 'joint mobilization' },
  { value: 'instrument-assisted', label: 'SLAT (instrument-assisted)', noteText: 'instrument-assisted adjustment' },
  { value: 'drop-table', label: 'Drop-table', noteText: 'drop-table adjustment' },
  { value: 'flexion-distraction', label: 'Flexion-distraction', noteText: 'flexion-distraction' },
  { value: 'activator', label: 'Activator', noteText: 'Activator method adjustment' },
];

export const POSITION_OPTIONS = [
  { value: 'prone', label: 'Prone' },
  { value: 'supine', label: 'Supine' },
  { value: 'side-posture', label: 'Side posture' },
  { value: 'anterior-dorsal', label: 'Anterior dorsal' },
  { value: 'seated', label: 'Seated' },
];

export function buildProcedureLine(region: string, technique: string, position: string): string {
  const regionLabel = PROCEDURE_REGION_OPTIONS.find(o => o.value === region)?.label || region;
  const techOpt = TECHNIQUE_OPTIONS.find(o => o.value === technique);
  const techText = techOpt?.noteText || technique;
  const posLabel = POSITION_OPTIONS.find(o => o.value === position)?.label.toLowerCase() || position;
  return `${regionLabel} ${techText} – ${posLabel}`;
}

// ─── Response Options ────────────────────────────────────────────────────────

export const TOLERANCE_OPTIONS = [
  { value: 'tolerated-well', label: 'Tolerated procedures well' },
  { value: 'without-incident', label: 'Tolerated procedures without incident' },
  { value: 'well-no-complaints', label: 'Tolerated well, no complaints' },
];

export const IMPROVEMENT_OPTIONS = [
  { value: 'improved-mobility', label: 'Improved mobility' },
  { value: 'decreased-tension', label: 'Decreased tension' },
  { value: 'improved-rom', label: 'Improved ROM' },
  { value: 'decreased-stiffness', label: 'Decreased stiffness' },
  { value: 'feels-better', label: 'Feels better' },
  { value: 'none-reported', label: 'No immediate changes reported' },
];

// ─── Plan Options ────────────────────────────────────────────────────────────

export const PLAN_ADDON_OPTIONS = [
  { value: 'ice', label: 'Ice 15 minutes as needed' },
  { value: 'heat', label: 'Heat 15 minutes as needed' },
  { value: 'stretching', label: 'Home stretching discussed' },
  { value: 'ergonomic', label: 'Ergonomic considerations discussed' },
  { value: 'hydration', label: 'Hydration encouraged' },
  { value: 'monitor', label: 'Monitor and report any changes' },
];

export const FOLLOWUP_OPTIONS = [
  { value: 'as-scheduled', label: 'Next visit as scheduled' },
  { value: 'one-week', label: 'Re-evaluate in 1 week' },
  { value: 'two-weeks', label: 'Re-evaluate in 2 weeks' },
  { value: 'four-weeks', label: 'Re-evaluate in 4 weeks' },
  { value: 'prn', label: 'As needed (PRN)' },
];
