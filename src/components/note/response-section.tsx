'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { DropdownField } from '@/components/dropdown-field';
import { MultiSelectField } from '@/components/multi-select-field';

export function ResponseSection() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const r = state.response;

  return (
    <div className="space-y-4">
      <DropdownField
        label="Tolerance"
        value={r.tolerance}
        onChange={(v) => dispatch({ type: 'SET_RESPONSE', field: 'tolerance', value: v })}
        options={config.options.tolerance}
      />

      <MultiSelectField
        label="Improvements Noted"
        selected={r.improvements}
        onChange={(v) => dispatch({ type: 'SET_RESPONSE', field: 'improvements', value: v })}
        options={config.options.improvements}
        placeholder="Add improvement..."
      />
    </div>
  );
}
