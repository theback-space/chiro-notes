'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { DropdownField } from '@/components/dropdown-field';
import { MultiSelectField } from '@/components/multi-select-field';
import { Switch } from '@/components/ui/switch';

const VISIT_TYPE_OPTIONS = [
  { value: 'ongoing', label: 'Ongoing care' },
  { value: 'new', label: 'New client' },
  { value: 'reactivation', label: 'Reactivation' },
];

export function SubjectiveSection() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const s = state.subjective;

  return (
    <div className="space-y-4">
      <DropdownField
        label="Visit Type"
        value={s.visitType}
        onChange={(v) => dispatch({ type: 'SET_SUBJECTIVE', field: 'visitType', value: v })}
        options={VISIT_TYPE_OPTIONS}
      />

      <MultiSelectField
        label="Region(s)"
        selected={s.regions}
        onChange={(v) => dispatch({ type: 'SET_SUBJECTIVE', field: 'regions', value: v })}
        options={config.options.regions}
        placeholder="Add region..."
      />

      <MultiSelectField
        label="Concern(s)"
        selected={s.concerns}
        onChange={(v) => dispatch({ type: 'SET_SUBJECTIVE', field: 'concerns', value: v })}
        options={config.options.concerns}
        placeholder="Add concern..."
      />

      <div className="flex items-center justify-between py-2">
        <label className="text-sm">Denies adverse response to previous session</label>
        <Switch
          checked={s.adverseResponse}
          onCheckedChange={(v) => dispatch({ type: 'SET_SUBJECTIVE', field: 'adverseResponse', value: v })}
        />
      </div>

      <div className="flex items-center justify-between py-2">
        <label className="text-sm">No new sensations, injuries, or incidents</label>
        <Switch
          checked={s.newSensations}
          onCheckedChange={(v) => dispatch({ type: 'SET_SUBJECTIVE', field: 'newSensations', value: v })}
        />
      </div>
    </div>
  );
}
