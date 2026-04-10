'use client';

import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { haptic } from '@/hooks/use-haptic';
import { ORTHO_NEURO_TESTS, TEST_RESULT_OPTIONS, SIDE_OPTIONS } from '@/data/ortho-tests';
import { DropdownField } from '@/components/dropdown-field';

export function OrthoNeuroTests() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Orthopedic / Neurological Tests</p>
      <p className="text-xs text-muted-foreground italic">New / Reactivation visits only</p>

      {ORTHO_NEURO_TESTS.map((test, index) => {
        const current = state.orthoNeuroTests[index] || { test: test.id, result: 'not-tested' };
        const isActive = current.result !== 'not-tested';

        return (
          <div
            key={test.id}
            className={`p-3 rounded-lg border transition-colors ${
              isActive ? 'bg-[#c9a84c]/5 border-[#c9a84c]/20' : 'border-zinc-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isActive ? 'text-[#c9a84c]' : 'text-muted-foreground'}`}>
                {test.label}
              </span>
            </div>

            {/* Result buttons */}
            <div className="flex gap-1.5 mb-2">
              {TEST_RESULT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => {
                    haptic('selection');
                    dispatch({
                      type: 'SET_ORTHO_TEST',
                      index,
                      result: { ...current, result: opt.value },
                    });
                  }}
                  className={`flex-1 h-8 rounded-md text-xs font-semibold border transition-all ${
                    current.result === opt.value
                      ? opt.value === 'positive'
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : opt.value === 'negative' || opt.value === 'wnl'
                          ? 'bg-green-500/20 border-green-500/40 text-green-400'
                          : 'bg-zinc-700 border-zinc-600 text-zinc-300'
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Side selector (if applicable and test is active) */}
            {test.hasSide && isActive && (
              <div className="flex gap-1.5">
                {SIDE_OPTIONS.map(side => (
                  <button
                    key={side.value}
                    onClick={() => {
                      haptic('light');
                      dispatch({
                        type: 'SET_ORTHO_TEST',
                        index,
                        result: { ...current, side: side.value },
                      });
                    }}
                    className={`flex-1 h-7 rounded text-xs border transition-all ${
                      current.side === side.value
                        ? 'bg-[#c9a84c]/20 border-[#c9a84c]/40 text-[#c9a84c]'
                        : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    {side.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
