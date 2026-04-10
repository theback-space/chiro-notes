'use client';

import { useState } from 'react';
import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { DropdownField } from '@/components/dropdown-field';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { haptic } from '@/hooks/use-haptic';
import { buildProcedureLine } from '@/data/soap-options';
import { useConfig } from '@/hooks/use-config';
import { getAffectedClinicalRegions } from '@/data/spine-regions';

export function ProceduresSection() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const autoRegions = getAffectedClinicalRegions(state.spineFindings);
  const TECHNIQUE_OPTIONS = config.options.techniques;
  const POSITION_OPTIONS = config.options.positions;
  const PROCEDURE_REGION_OPTIONS = config.options.procedureRegions;

  const [addRegion, setAddRegion] = useState<string | null>(null);
  const [addTechnique, setAddTechnique] = useState<string>('diversified');
  const [addPosition, setAddPosition] = useState<string | null>(null);

  const existingRegions = Object.keys(state.procedures).filter(r => state.procedures[r]?.technique);

  function handleQuickAdd(regionKey: string) {
    haptic('selection');
    dispatch({
      type: 'SET_PROCEDURE',
      region: regionKey,
      entry: { technique: 'diversified', position: 'prone' },
    });
  }

  function handleManualAdd() {
    if (!addRegion || !addPosition) return;
    haptic('success');
    dispatch({
      type: 'SET_PROCEDURE',
      region: addRegion,
      entry: { technique: addTechnique, position: addPosition },
    });
    setAddRegion(null);
    setAddTechnique('diversified');
    setAddPosition(null);
  }

  function handleRemove(region: string) {
    haptic('light');
    dispatch({ type: 'REMOVE_PROCEDURE', region });
  }

  return (
    <div className="space-y-4">
      {/* Quick add from spine findings */}
      {autoRegions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quick Add from Spine</p>
          <div className="flex flex-wrap gap-1.5">
            {autoRegions.map(region => {
              const regionKey = region.toLowerCase().replace(' spine', '').replace(' region', '');
              const alreadyAdded = existingRegions.includes(regionKey);
              return (
                <Badge
                  key={region}
                  variant={alreadyAdded ? 'secondary' : 'outline'}
                  className={`cursor-pointer text-xs py-1 px-2.5 ${
                    alreadyAdded
                      ? 'opacity-50'
                      : 'border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10'
                  }`}
                  onClick={() => !alreadyAdded && handleQuickAdd(regionKey)}
                >
                  + {region}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {/* Current procedures — editable */}
      {existingRegions.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Procedures</p>
          {existingRegions.map(region => {
            const proc = state.procedures[region];
            const line = buildProcedureLine(region, proc.technique, proc.position);
            return (
              <div key={region} className="space-y-2 p-3 rounded-lg bg-[#c9a84c]/5 border border-[#c9a84c]/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#c9a84c]">{PROCEDURE_REGION_OPTIONS.find(o => o.value === region)?.label || region}</p>
                  <button
                    onClick={() => handleRemove(region)}
                    className="text-destructive text-lg leading-none hover:text-destructive/80 w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
                <DropdownField
                  label="Technique"
                  value={proc.technique}
                  onChange={(v) => dispatch({ type: 'SET_PROCEDURE', region, entry: { ...proc, technique: v } })}
                  options={TECHNIQUE_OPTIONS}
                />
                <DropdownField
                  label="Position"
                  value={proc.position || null}
                  onChange={(v) => dispatch({ type: 'SET_PROCEDURE', region, entry: { ...proc, position: v } })}
                  options={POSITION_OPTIONS}
                />
                <p className="text-xs text-muted-foreground italic">{line}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Manual add */}
      <div className="space-y-2 pt-2 border-t border-muted">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Add Procedure</p>
        <DropdownField
          label="Region"
          value={addRegion}
          onChange={setAddRegion}
          options={PROCEDURE_REGION_OPTIONS}
          placeholder="Select region..."
        />
        <DropdownField
          label="Technique"
          value={addTechnique}
          onChange={setAddTechnique}
          options={TECHNIQUE_OPTIONS}
        />
        <DropdownField
          label="Position"
          value={addPosition}
          onChange={setAddPosition}
          options={POSITION_OPTIONS}
          placeholder="Select position..."
        />
        <Button
          onClick={handleManualAdd}
          disabled={!addRegion || !addPosition}
          className="w-full h-12 bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 font-semibold tracking-wide"
        >
          Add Procedure
        </Button>
      </div>

      <p className="text-xs text-muted-foreground italic">
        &ldquo;Verbal consent obtained prior to care.&rdquo; appended automatically.
      </p>
    </div>
  );
}
