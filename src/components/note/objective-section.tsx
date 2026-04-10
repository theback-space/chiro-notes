'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { MultiSelectField } from '@/components/multi-select-field';
import { buildMatrixObjective, getJointRestrictionSegments } from '@/data/segments';
import { selectVariant } from '@/data/note-phrases';

export function ObjectiveSection() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const o = state.objective;

  const jrSegments = getJointRestrictionSegments(state.segmentMatrix);
  const matrixLines = buildMatrixObjective(state.segmentMatrix);
  const hasFindings = jrSegments.length > 0 || matrixLines.length > 0;

  return (
    <div className="space-y-4">
      {/* Compiled findings from matrix */}
      {hasFindings ? (
        <div className="border-l-2 border-[#c9a84c]/40 pl-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Compiled Findings (from Exam)</p>

          {jrSegments.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {selectVariant('motion_palpation_intro')} {jrSegments.join(', ')}.
            </p>
          )}

          {matrixLines.map((line, i) => {
            // Skip the JR line if we already showed it above
            if (jrSegments.length > 0 && line.startsWith('Segmental joint restriction')) return null;
            return (
              <p key={i} className="text-sm text-muted-foreground">{line}</p>
            );
          })}
        </div>
      ) : (
        <div className="border-l-2 border-muted pl-3 py-2">
          <p className="text-sm text-muted-foreground italic">No findings yet. Use the Exam tab to check segments.</p>
        </div>
      )}

      <MultiSelectField
        label="Posture Observation"
        selected={o.posture}
        onChange={(v) => dispatch({ type: 'SET_OBJECTIVE', field: 'posture', value: v })}
        options={config.options.posture}
        placeholder="Add observation..."
      />

      <MultiSelectField
        label="Palpation Findings"
        selected={o.palpation}
        onChange={(v) => dispatch({ type: 'SET_OBJECTIVE', field: 'palpation', value: v })}
        options={config.options.palpation}
        placeholder="Add finding..."
      />
    </div>
  );
}
