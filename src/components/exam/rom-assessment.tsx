'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { DropdownField } from '@/components/dropdown-field';
import { ROM_GRADE_OPTIONS, ROM_REGIONS } from '@/data/ortho-tests';

export function RomAssessment() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Range of Motion Assessment</p>
      <p className="text-xs text-muted-foreground italic">New / Reactivation visits only</p>
      {ROM_REGIONS.map(region => (
        <DropdownField
          key={region.id}
          label={region.label}
          value={state.romAssessment[region.id] || null}
          onChange={(v) => dispatch({ type: 'SET_ROM', region: region.id, grade: v })}
          options={ROM_GRADE_OPTIONS}
          placeholder="Select grade..."
        />
      ))}
    </div>
  );
}
