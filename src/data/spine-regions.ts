import type { VertebraDefinition } from '@/lib/types';

export const REGION_COLORS: Record<string, string> = {
  cervical: 'hsl(220, 80%, 60%)',
  thoracic: 'hsl(160, 60%, 45%)',
  lumbar: 'hsl(35, 80%, 55%)',
  sacral: 'hsl(0, 65%, 55%)',
  extra: 'hsl(270, 50%, 55%)',
};

export const VERTEBRAE: VertebraDefinition[] = [
  // Occiput
  { id: 'occiput', label: 'Occiput', shortLabel: 'Occ', region: 'extra', clinicalRegion: 'Occipital region', svgCenter: { x: 100, y: 28 }, svgSize: { width: 40, height: 16 } },

  // Cervical C1-C7
  { id: 'C1', label: 'C1 (Atlas)', shortLabel: 'C1', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 48 }, svgSize: { width: 36, height: 14 } },
  { id: 'C2', label: 'C2 (Axis)', shortLabel: 'C2', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 64 }, svgSize: { width: 36, height: 14 } },
  { id: 'C3', label: 'C3', shortLabel: 'C3', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 80 }, svgSize: { width: 36, height: 14 } },
  { id: 'C4', label: 'C4', shortLabel: 'C4', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 96 }, svgSize: { width: 36, height: 14 } },
  { id: 'C5', label: 'C5', shortLabel: 'C5', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 112 }, svgSize: { width: 37, height: 14 } },
  { id: 'C6', label: 'C6', shortLabel: 'C6', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 128 }, svgSize: { width: 37, height: 14 } },
  { id: 'C7', label: 'C7', shortLabel: 'C7', region: 'cervical', clinicalRegion: 'Cervical spine', svgCenter: { x: 100, y: 144 }, svgSize: { width: 38, height: 14 } },

  // Thoracic T1-T12
  { id: 'T1', label: 'T1', shortLabel: 'T1', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 164 }, svgSize: { width: 40, height: 14 } },
  { id: 'T2', label: 'T2', shortLabel: 'T2', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 180 }, svgSize: { width: 41, height: 14 } },
  { id: 'T3', label: 'T3', shortLabel: 'T3', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 196 }, svgSize: { width: 42, height: 14 } },
  { id: 'T4', label: 'T4', shortLabel: 'T4', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 212 }, svgSize: { width: 43, height: 14 } },
  { id: 'T5', label: 'T5', shortLabel: 'T5', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 228 }, svgSize: { width: 44, height: 14 } },
  { id: 'T6', label: 'T6', shortLabel: 'T6', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 244 }, svgSize: { width: 44, height: 14 } },
  { id: 'T7', label: 'T7', shortLabel: 'T7', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 260 }, svgSize: { width: 45, height: 14 } },
  { id: 'T8', label: 'T8', shortLabel: 'T8', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 276 }, svgSize: { width: 45, height: 14 } },
  { id: 'T9', label: 'T9', shortLabel: 'T9', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 292 }, svgSize: { width: 46, height: 14 } },
  { id: 'T10', label: 'T10', shortLabel: 'T10', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 308 }, svgSize: { width: 46, height: 14 } },
  { id: 'T11', label: 'T11', shortLabel: 'T11', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 324 }, svgSize: { width: 47, height: 14 } },
  { id: 'T12', label: 'T12', shortLabel: 'T12', region: 'thoracic', clinicalRegion: 'Thoracic spine', svgCenter: { x: 100, y: 340 }, svgSize: { width: 48, height: 14 } },

  // Lumbar L1-L5
  { id: 'L1', label: 'L1', shortLabel: 'L1', region: 'lumbar', clinicalRegion: 'Lumbar spine', svgCenter: { x: 100, y: 362 }, svgSize: { width: 50, height: 16 } },
  { id: 'L2', label: 'L2', shortLabel: 'L2', region: 'lumbar', clinicalRegion: 'Lumbar spine', svgCenter: { x: 100, y: 380 }, svgSize: { width: 51, height: 16 } },
  { id: 'L3', label: 'L3', shortLabel: 'L3', region: 'lumbar', clinicalRegion: 'Lumbar spine', svgCenter: { x: 100, y: 398 }, svgSize: { width: 52, height: 16 } },
  { id: 'L4', label: 'L4', shortLabel: 'L4', region: 'lumbar', clinicalRegion: 'Lumbar spine', svgCenter: { x: 100, y: 416 }, svgSize: { width: 53, height: 16 } },
  { id: 'L5', label: 'L5', shortLabel: 'L5', region: 'lumbar', clinicalRegion: 'Lumbar spine', svgCenter: { x: 100, y: 434 }, svgSize: { width: 54, height: 16 } },

  // Sacral
  { id: 'sacrum', label: 'Sacrum', shortLabel: 'Sac', region: 'sacral', clinicalRegion: 'Pelvic region', svgCenter: { x: 100, y: 462 }, svgSize: { width: 52, height: 24 } },
  { id: 'coccyx', label: 'Coccyx', shortLabel: 'Cox', region: 'sacral', clinicalRegion: 'Pelvic region', svgCenter: { x: 100, y: 490 }, svgSize: { width: 24, height: 16 } },

  // Extras
  { id: 'si-left', label: 'Left SI Joint', shortLabel: 'SI-L', region: 'extra', clinicalRegion: 'Pelvic region', svgCenter: { x: 68, y: 462 }, svgSize: { width: 20, height: 20 } },
  { id: 'si-right', label: 'Right SI Joint', shortLabel: 'SI-R', region: 'extra', clinicalRegion: 'Pelvic region', svgCenter: { x: 132, y: 462 }, svgSize: { width: 20, height: 20 } },
  { id: 'pelvis', label: 'Pelvis', shortLabel: 'Pelv', region: 'extra', clinicalRegion: 'Pelvic region', svgCenter: { x: 100, y: 480 }, svgSize: { width: 70, height: 14 } },
  { id: 'ribs-left', label: 'Left Ribs', shortLabel: 'Rib-L', region: 'extra', clinicalRegion: 'Thoracic spine', svgCenter: { x: 55, y: 240 }, svgSize: { width: 20, height: 60 } },
  { id: 'ribs-right', label: 'Right Ribs', shortLabel: 'Rib-R', region: 'extra', clinicalRegion: 'Thoracic spine', svgCenter: { x: 145, y: 240 }, svgSize: { width: 20, height: 60 } },
];

export function getVertebraById(id: string): VertebraDefinition | undefined {
  return VERTEBRAE.find(v => v.id === id);
}

export function getAffectedClinicalRegions(findings: Record<string, unknown[]>): string[] {
  const regions = new Set<string>();
  for (const id of Object.keys(findings)) {
    const v = getVertebraById(id);
    if (v && (findings[id] as unknown[]).length > 0) {
      regions.add(v.clinicalRegion);
    }
  }
  return Array.from(regions);
}
