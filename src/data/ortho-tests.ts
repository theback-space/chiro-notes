export interface OrthoTestDefinition {
  id: string;
  label: string;
  hasSide: boolean; // whether L/R/Bilateral is applicable
}

export const ORTHO_NEURO_TESTS: OrthoTestDefinition[] = [
  { id: 'kemps', label: "Kemp's Test", hasSide: true },
  { id: 'valsalva', label: 'Valsalva', hasSide: false },
  { id: 'slr', label: 'Straight Leg Raise', hasSide: true },
  { id: 'cervical-compression', label: 'Cervical Compression', hasSide: true },
  { id: 'cervical-distraction', label: 'Cervical Distraction', hasSide: false },
  { id: 'soto-hall', label: 'Soto-Hall', hasSide: false },
  { id: 'shoulder-depression', label: 'Shoulder Depression', hasSide: true },
  { id: 'dermatomal', label: 'Dermatomal Screening', hasSide: false },
];

export const TEST_RESULT_OPTIONS = [
  { value: 'not-tested', label: 'Not tested' },
  { value: 'positive', label: 'Positive (+)' },
  { value: 'negative', label: 'Negative (-)' },
  { value: 'wnl', label: 'WNL' },
];

export const SIDE_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'bilateral', label: 'Bilateral' },
];

export const ROM_GRADE_OPTIONS = [
  { value: 'wnl', label: 'WNL' },
  { value: 'mild', label: 'Mild decrease' },
  { value: 'moderate', label: 'Moderate decrease' },
  { value: 'severe', label: 'Severe decrease' },
];

export const ROM_REGIONS = [
  { id: 'cervical', label: 'Cervical ROM' },
  { id: 'thoracic', label: 'Thoracic ROM' },
  { id: 'lumbar', label: 'Lumbar ROM' },
];
