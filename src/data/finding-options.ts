import type { FindingOption } from '@/lib/types';

export const MOTION_FINDING_OPTIONS: FindingOption[] = [
  { value: 'restricted', label: 'Restricted', sentence: 'Restricted segmental motion' },
  { value: 'fixated', label: 'Fixated', sentence: 'Fixation noted' },
  { value: 'hypomobile', label: 'Hypomobile', sentence: 'Hypomobility identified' },
  { value: 'hypermobile', label: 'Hypermobile', sentence: 'Hypermobility noted' },
  { value: 'decreased-rom', label: 'Decreased ROM', sentence: 'Decreased range of motion' },
  { value: 'joint-dysfunction', label: 'Joint dysfunction', sentence: 'Segmental joint dysfunction' },
];

export const DIRECTION_OPTIONS: FindingOption[] = [
  { value: 'flexion', label: 'Flexion', sentence: 'in flexion' },
  { value: 'extension', label: 'Extension', sentence: 'in extension' },
  { value: 'lateral-flexion-left', label: 'Lateral flexion (L)', sentence: 'in left lateral flexion' },
  { value: 'lateral-flexion-right', label: 'Lateral flexion (R)', sentence: 'in right lateral flexion' },
  { value: 'rotation-left', label: 'Rotation (L)', sentence: 'with decreased left rotation' },
  { value: 'rotation-right', label: 'Rotation (R)', sentence: 'with decreased right rotation' },
  { value: 'posterior', label: 'Posterior', sentence: 'with posterior involvement' },
  { value: 'anterior', label: 'Anterior', sentence: 'with anterior involvement' },
];

export const TISSUE_OPTIONS: FindingOption[] = [
  { value: 'hypertonicity', label: 'Hypertonicity', sentence: 'Associated hypertonicity noted on palpation' },
  { value: 'tenderness', label: 'Tenderness', sentence: 'Tenderness noted on palpation' },
  { value: 'tension', label: 'Tension', sentence: 'Muscular tension noted in the surrounding tissue' },
  { value: 'spasm', label: 'Spasm', sentence: 'Muscle spasm noted on palpation' },
  { value: 'trigger-point', label: 'Trigger point', sentence: 'Trigger point identified on palpation' },
];

export function buildFindingSentence(
  vertebraLabel: string,
  finding: { motionFinding: string | null; direction: string | null; tissue: string | null }
): string {
  const parts: string[] = [];

  const motion = MOTION_FINDING_OPTIONS.find(o => o.value === finding.motionFinding);
  const dir = DIRECTION_OPTIONS.find(o => o.value === finding.direction);
  const tissue = TISSUE_OPTIONS.find(o => o.value === finding.tissue);

  if (motion) {
    let sentence = `${motion.sentence} at ${vertebraLabel}`;
    if (dir) sentence += ` ${dir.sentence}`;
    parts.push(sentence + '.');
  }

  if (tissue) {
    parts.push(tissue.sentence + '.');
  }

  return parts.join(' ');
}
