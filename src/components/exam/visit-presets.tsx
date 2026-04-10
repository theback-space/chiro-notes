'use client';

import { useNoteDispatch } from '@/hooks/use-note-store';
import { haptic } from '@/hooks/use-haptic';
import type { FindingField } from '@/lib/types';

interface Preset {
  label: string;
  description: string;
  segments: Record<string, FindingField[]>;
  procedures: Record<string, { technique: string; position: string }>;
  regions: string[];
  concerns: string[];
}

const PRESETS: Preset[] = [
  {
    label: 'Routine CTL',
    description: 'Full spine maintenance',
    segments: {
      C1: ['jointRestrictionL', 'jointRestrictionR'],
      C2: ['jointRestrictionL', 'jointRestrictionR'],
      C5: ['jointRestrictionL'],
      T4: ['jointRestrictionR'],
      T8: ['jointRestrictionL'],
      L4: ['jointRestrictionL', 'jointRestrictionR'],
      L5: ['jointRestrictionR'],
    },
    procedures: {
      cervical: { technique: 'diversified', position: 'prone' },
      thoracic: { technique: 'diversified', position: 'prone' },
      lumbar: { technique: 'diversified', position: 'side-posture' },
      pelvic: { technique: 'drop-table', position: 'prone' },
    },
    regions: ['full-spine'],
    concerns: ['general-wellness'],
  },
  {
    label: 'Cervical Focus',
    description: 'Neck + upper back',
    segments: {
      C0: ['jointRestrictionR'],
      C1: ['jointRestrictionL', 'jointRestrictionR'],
      C2: ['jointRestrictionL'],
      C5: ['jointRestrictionL', 'tendernessL'],
      C6: ['jointRestrictionR'],
      T1: ['tautMuscleL', 'tautMuscleR'],
      T2: ['jointRestrictionL'],
    },
    procedures: {
      cervical: { technique: 'diversified', position: 'supine' },
      thoracic: { technique: 'diversified', position: 'prone' },
    },
    regions: ['cervical', 'thoracic'],
    concerns: ['ubnas'],
  },
  {
    label: 'Low Back + Pelvis',
    description: 'Lumbar + pelvic focus',
    segments: {
      L3: ['jointRestrictionL'],
      L4: ['jointRestrictionL', 'jointRestrictionR'],
      L5: ['jointRestrictionR', 'tautMuscleR'],
      sacrum: ['jointRestrictionL'],
      'si-left': ['jointRestrictionL'],
    },
    procedures: {
      lumbar: { technique: 'diversified', position: 'side-posture' },
      pelvic: { technique: 'drop-table', position: 'prone' },
    },
    regions: ['lumbar', 'pelvic'],
    concerns: ['lbp'],
  },
  {
    label: 'UBNAS',
    description: 'Upper back, neck, shoulders',
    segments: {
      C1: ['jointRestrictionL', 'jointRestrictionR'],
      C5: ['jointRestrictionL', 'tautMuscleL'],
      C6: ['jointRestrictionR'],
      T1: ['tautMuscleL', 'tautMuscleR'],
      T3: ['jointRestrictionL'],
      T4: ['jointRestrictionR', 'tendernessR'],
    },
    procedures: {
      cervical: { technique: 'diversified', position: 'supine' },
      thoracic: { technique: 'diversified', position: 'anterior-dorsal' },
    },
    regions: ['cervical', 'thoracic'],
    concerns: ['ubnas', 'tension'],
  },
  {
    label: 'SLAT Full Spine',
    description: 'Instrument-assisted, prone',
    segments: {
      C1: ['jointRestrictionL', 'jointRestrictionR'],
      C5: ['jointRestrictionL'],
      T4: ['jointRestrictionR'],
      T8: ['jointRestrictionL'],
      L4: ['jointRestrictionL'],
      sacrum: ['jointRestrictionR'],
    },
    procedures: {
      'full-spine': { technique: 'instrument-assisted', position: 'prone' },
    },
    regions: ['full-spine'],
    concerns: ['general-wellness'],
  },
];

export function VisitPresets() {
  const dispatch = useNoteDispatch();

  function applyPreset(preset: Preset) {
    haptic('success');

    // Reset first
    dispatch({ type: 'RESET_ALL' });

    // Apply segment findings
    for (const [segId, fields] of Object.entries(preset.segments)) {
      for (const field of fields) {
        dispatch({ type: 'TOGGLE_FINDING', segmentId: segId, field });
      }
    }

    // Apply procedures
    for (const [region, entry] of Object.entries(preset.procedures)) {
      dispatch({ type: 'SET_PROCEDURE', region, entry });
    }

    // Apply subjective
    dispatch({ type: 'SET_SUBJECTIVE', field: 'regions', value: preset.regions });
    dispatch({ type: 'SET_SUBJECTIVE', field: 'concerns', value: preset.concerns });
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick-Fill Presets</p>
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all active:scale-95"
          >
            <span className="block font-semibold">{preset.label}</span>
            <span className="block text-[10px] text-muted-foreground mt-0.5">{preset.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
