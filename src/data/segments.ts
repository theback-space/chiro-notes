import type { SegmentFindings } from '@/lib/types';

export interface SegmentDefinition {
  id: string;
  label: string;
  region: 'cervical' | 'thoracic' | 'lumbar' | 'sacral' | 'other';
}

export const SEGMENTS: SegmentDefinition[] = [
  { id: 'C0', label: 'C0 (Occiput)', region: 'cervical' },
  { id: 'C1', label: 'C1 (Atlas)', region: 'cervical' },
  { id: 'C2', label: 'C2 (Axis)', region: 'cervical' },
  { id: 'C3', label: 'C3', region: 'cervical' },
  { id: 'C4', label: 'C4', region: 'cervical' },
  { id: 'C5', label: 'C5', region: 'cervical' },
  { id: 'C6', label: 'C6', region: 'cervical' },
  { id: 'C7', label: 'C7', region: 'cervical' },
  { id: 'T1', label: 'T1', region: 'thoracic' },
  { id: 'T2', label: 'T2', region: 'thoracic' },
  { id: 'T3', label: 'T3', region: 'thoracic' },
  { id: 'T4', label: 'T4', region: 'thoracic' },
  { id: 'T5', label: 'T5', region: 'thoracic' },
  { id: 'T6', label: 'T6', region: 'thoracic' },
  { id: 'T7', label: 'T7', region: 'thoracic' },
  { id: 'T8', label: 'T8', region: 'thoracic' },
  { id: 'T9', label: 'T9', region: 'thoracic' },
  { id: 'T10', label: 'T10', region: 'thoracic' },
  { id: 'T11', label: 'T11', region: 'thoracic' },
  { id: 'T12', label: 'T12', region: 'thoracic' },
  { id: 'L1', label: 'L1', region: 'lumbar' },
  { id: 'L2', label: 'L2', region: 'lumbar' },
  { id: 'L3', label: 'L3', region: 'lumbar' },
  { id: 'L4', label: 'L4', region: 'lumbar' },
  { id: 'L5', label: 'L5', region: 'lumbar' },
  { id: 'sacrum', label: 'Sacrum', region: 'sacral' },
  { id: 'si-left', label: 'SI Joint (L)', region: 'sacral' },
  { id: 'si-right', label: 'SI Joint (R)', region: 'sacral' },
  { id: 'coccyx', label: 'Coccyx', region: 'sacral' },
  { id: 'ribs-left', label: 'Ribs (L)', region: 'other' },
  { id: 'ribs-right', label: 'Ribs (R)', region: 'other' },
  { id: 'pelvis', label: 'Pelvis', region: 'other' },
];

export const REGION_LABELS: Record<string, string> = {
  cervical: 'Cervical',
  thoracic: 'Thoracic',
  lumbar: 'Lumbar',
  sacral: 'Sacral / Pelvic',
  other: 'Other Structures',
};

// Check if a segment has any findings
function hasFindings(f: SegmentFindings): boolean {
  return f.jointRestrictionL || f.jointRestrictionR || f.tendernessL || f.tendernessR || f.tautMuscleL || f.tautMuscleR || f.otherL || f.otherR;
}

// Build objective findings text from the matrix
export function buildMatrixObjective(matrix: Record<string, SegmentFindings>): string[] {
  const lines: string[] = [];
  const jrSegments: string[] = [];
  const tpSegments: string[] = [];
  const tmSegments: string[] = [];
  const otherNotes: string[] = [];

  for (const seg of SEGMENTS) {
    const f = matrix[seg.id];
    if (!f || !hasFindings(f)) continue;

    const sides = (l: boolean, r: boolean): string => {
      if (l && r) return 'bilaterally';
      if (l) return 'on the left';
      if (r) return 'on the right';
      return '';
    };

    // Joint restrictions
    if (f.jointRestrictionL || f.jointRestrictionR) {
      const side = sides(f.jointRestrictionL, f.jointRestrictionR);
      jrSegments.push(`${seg.id}${side ? ' ' + side : ''}`);
    }

    // Tenderness
    if (f.tendernessL || f.tendernessR) {
      const side = sides(f.tendernessL, f.tendernessR);
      tpSegments.push(`${seg.id}${side ? ' ' + side : ''}`);
    }

    // Taut muscle
    if (f.tautMuscleL || f.tautMuscleR) {
      const side = sides(f.tautMuscleL, f.tautMuscleR);
      tmSegments.push(`${seg.id}${side ? ' ' + side : ''}`);
    }

    // Other
    if (f.otherL && f.otherTextL) otherNotes.push(`${seg.id} left: ${f.otherTextL}`);
    if (f.otherR && f.otherTextR) otherNotes.push(`${seg.id} right: ${f.otherTextR}`);
  }

  if (jrSegments.length > 0) {
    lines.push(`Segmental joint restriction noted at ${jrSegments.join(', ')}.`);
  }
  if (tpSegments.length > 0) {
    lines.push(`Tenderness on palpation at ${tpSegments.join(', ')}.`);
  }
  if (tmSegments.length > 0) {
    lines.push(`Taut and tender muscle fibers noted at ${tmSegments.join(', ')}.`);
  }
  if (otherNotes.length > 0) {
    lines.push(`Additional findings: ${otherNotes.join('; ')}.`);
  }

  return lines;
}

// Get segments with any joint restriction for motion palpation intro
export function getJointRestrictionSegments(matrix: Record<string, SegmentFindings>): string[] {
  const ids: string[] = [];
  for (const seg of SEGMENTS) {
    const f = matrix[seg.id];
    if (f && (f.jointRestrictionL || f.jointRestrictionR)) {
      ids.push(seg.id);
    }
  }
  return ids;
}

export function getAdjustedRegions(matrix: Record<string, SegmentFindings>): string[] {
  const regions = new Set<string>();
  for (const [id, f] of Object.entries(matrix)) {
    if (!hasFindings(f)) continue;
    const seg = SEGMENTS.find(s => s.id === id);
    if (!seg) continue;
    if (seg.region === 'cervical') regions.add('Cervical spine');
    else if (seg.region === 'thoracic') regions.add('Thoracic spine');
    else if (seg.region === 'lumbar') regions.add('Lumbar spine');
    else if (seg.region === 'sacral') regions.add('Pelvic region');
    else regions.add('Other');
  }
  return Array.from(regions);
}
