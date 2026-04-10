'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { MultiSelectField } from '@/components/multi-select-field';
import { DropdownField } from '@/components/dropdown-field';

export function PlanSection() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const p = state.plan;

  const planText = state.subjective.visitType === 'ongoing'
    ? config.templates.planOngoing
    : config.templates.planNewReactivation;

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-muted/50 border text-sm text-muted-foreground leading-relaxed">
        {planText}
      </div>

      <MultiSelectField
        label="Optional Add-Ons"
        selected={p.addOns}
        onChange={(v) => dispatch({ type: 'SET_PLAN', field: 'addOns', value: v })}
        options={config.options.planAddOns}
        placeholder="Add recommendation..."
      />

      <DropdownField
        label="Follow-Up"
        value={p.followUp}
        onChange={(v) => dispatch({ type: 'SET_PLAN', field: 'followUp', value: v })}
        options={config.options.followUp}
      />
    </div>
  );
}
