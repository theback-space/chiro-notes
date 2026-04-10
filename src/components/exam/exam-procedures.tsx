'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';
import { Button } from '@/components/ui/button';

// Quick-tap procedure presets
const PROCEDURE_PRESETS = [
  { region: 'cervical', technique: 'diversified', position: 'prone', label: 'Cervical Div. Prone' },
  { region: 'cervical', technique: 'diversified', position: 'supine', label: 'Cervical Div. Supine' },
  { region: 'thoracic', technique: 'diversified', position: 'prone', label: 'Thoracic Div. Prone' },
  { region: 'thoracic', technique: 'diversified', position: 'anterior-dorsal', label: 'Thoracic Ant. Dorsal' },
  { region: 'lumbar', technique: 'diversified', position: 'side-posture', label: 'Lumbar Side Posture' },
  { region: 'lumbar', technique: 'diversified', position: 'prone', label: 'Lumbar Div. Prone' },
  { region: 'pelvic', technique: 'drop-table', position: 'prone', label: 'Pelvic Drop Prone' },
  { region: 'pelvic', technique: 'diversified', position: 'side-posture', label: 'Pelvic Side Posture' },
  { region: 'full-spine', technique: 'instrument-assisted', position: 'prone', label: 'Full Spine SLAT Prone' },
  { region: 'cervical', technique: 'instrument-assisted', position: 'prone', label: 'Cervical SLAT Prone' },
  { region: 'cervical', technique: 'joint-mobilization', position: 'supine', label: 'Cervical Mobs Supine' },
  { region: 'lumbar', technique: 'flexion-distraction', position: 'prone', label: 'Lumbar Flex-Dist.' },
];

export function ExamProcedures() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();

  const entries = Object.entries(state.procedures).filter(([, p]) => p.technique);

  function addPreset(preset: typeof PROCEDURE_PRESETS[0]) {
    haptic('selection');
    dispatch({
      type: 'SET_PROCEDURE',
      region: preset.region,
      entry: { technique: preset.technique, position: preset.position },
    });
  }

  function removeProcedure(region: string) {
    haptic('light');
    dispatch({ type: 'REMOVE_PROCEDURE', region });
  }

  // Get the display text for a procedure
  function getProcedureText(region: string, technique: string, position: string): string {
    const regionLabel = config.options.procedureRegions.find(o => o.value === region)?.label || region;
    const techOpt = config.options.techniques.find(o => o.value === technique);
    const techText = techOpt?.noteText || techOpt?.label || technique;
    const posLabel = config.options.positions.find(o => o.value === position)?.label?.toLowerCase() || position;
    return `${regionLabel} ${techText} – ${posLabel}`;
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Procedures</p>

      {/* Quick-tap presets */}
      <div className="flex flex-wrap gap-1.5">
        {PROCEDURE_PRESETS.map((preset, i) => {
          const isActive = state.procedures[preset.region]?.technique === preset.technique && state.procedures[preset.region]?.position === preset.position;
          return (
            <button
              key={i}
              onClick={() => isActive ? removeProcedure(preset.region) : addPreset(preset)}
              className={`px-2.5 py-1.5 text-[11px] font-medium rounded-md border transition-all ${
                isActive
                  ? 'bg-[#c9a84c]/20 border-[#c9a84c]/40 text-[#c9a84c]'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Current procedures */}
      {entries.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Selected:</p>
          {entries.map(([region, proc]) => (
            <div key={region} className="flex items-center gap-2 p-2 rounded-md bg-[#c9a84c]/5 border border-[#c9a84c]/10">
              <p className="flex-1 text-sm text-[#c9a84c]">{getProcedureText(region, proc.technique, proc.position)}</p>
              <button onClick={() => removeProcedure(region)} className="text-destructive text-sm w-6 h-6 flex items-center justify-center">&times;</button>
            </div>
          ))}
        </div>
      )}

      {entries.length === 0 && (
        <p className="text-xs text-muted-foreground italic">Tap procedure presets above to add.</p>
      )}

      <p className="text-[10px] text-muted-foreground italic">&ldquo;Verbal consent obtained prior to care.&rdquo; appended automatically.</p>
    </div>
  );
}
