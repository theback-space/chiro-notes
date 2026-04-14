'use client';

import { useState } from 'react';
import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';

function FindingButton({ checked, onClick, label, color }: { checked: boolean; onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center rounded border transition-all font-bold"
      style={checked ? {
        backgroundColor: color + '33',
        borderColor: color + '80',
        color: color,
        fontSize: '8px',
        letterSpacing: '-0.5px',
      } : {
        borderColor: 'rgba(63,63,70,0.35)',
        color: 'transparent',
        fontSize: '8px',
      }}
    >
      {checked ? label : ''}
    </button>
  );
}

export function SegmentMatrix() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const [expandedOther, setExpandedOther] = useState<string | null>(null);

  if (!config.matrix.enabled) return null;

  const { regions, findingTypes, bilateral, label } = config.matrix;
  let currentGroup = '';

  // Count findings
  const totalFindings = Object.values(state.segmentMatrix).reduce((acc, s) => {
    return acc + Object.values(s).filter(v => v === true).length;
  }, 0);

  function toggleFinding(segId: string, findingKey: string, side: 'L' | 'R') {
    haptic('selection');
    const field = `${findingKey}${side}`;
    dispatch({ type: 'TOGGLE_FINDING', segmentId: segId, field: field as any });
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-xs text-[#c9a84c]/60">{totalFindings} findings</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 px-1 pb-1 text-[10px] text-muted-foreground flex-wrap">
        {findingTypes.map(ft => (
          <span key={ft.key}><b style={{ color: ft.color }}>{ft.label}</b> {ft.fullLabel}</span>
        ))}
      </div>

      {/* Header */}
      <div className={`grid items-center gap-0 px-1 py-1.5 border-b border-[#c9a84c]/10 sticky top-0 bg-background z-10 ${
        bilateral ? 'grid-cols-[1fr_auto_2fr_auto_1fr]' : 'grid-cols-[2fr_1fr]'
      }`}>
        {bilateral && (
          <>
            <div className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">Left</div>
            <div className="w-1" />
          </>
        )}
        <div className="text-center text-xs text-muted-foreground uppercase tracking-wider font-bold">
          {bilateral ? 'Segment' : 'Region'}
        </div>
        {bilateral && <div className="w-1" />}
        <div className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
          {bilateral ? 'Right' : 'Findings'}
        </div>
      </div>

      {/* Region rows */}
      {regions.map((region) => {
        const showGroupHeader = region.group !== currentGroup;
        currentGroup = region.group;
        const segState = state.segmentMatrix[region.id] || {};
        const hasAny = Object.values(segState).some(v => v === true);

        // Check if any "other" type finding is checked (last finding type is usually "other")
        const hasOtherL = segState[`${findingTypes[0]?.key}L`] === true && findingTypes[0]?.key === 'other';
        const hasOtherR = segState[`${findingTypes[findingTypes.length - 1]?.key}R`] === true;

        return (
          <div key={region.id}>
            {showGroupHeader && (
              <div className="flex items-center px-1 py-1.5 mt-2">
                <span className="text-[10px] font-bold text-[#c9a84c]/60 uppercase tracking-widest">{region.group}</span>
                <div className="flex-1 ml-2 h-px bg-[#c9a84c]/10" />
              </div>
            )}

            <div className={`grid items-center gap-0 px-1 py-0.5 rounded transition-colors ${hasAny ? 'bg-[#c9a84c]/[0.03]' : ''} ${
              bilateral ? 'grid-cols-[1fr_auto_2fr_auto_1fr]' : 'grid-cols-[2fr_1fr]'
            }`}>
              {/* Left side buttons (bilateral only) */}
              {bilateral && (
                <>
                  <div className="flex gap-0.5 justify-center">
                    {findingTypes.map(ft => (
                      <FindingButton
                        key={`${region.id}-L-${ft.key}`}
                        checked={!!segState[`${ft.key}L`]}
                        onClick={() => toggleFinding(region.id, ft.key, 'L')}
                        label={ft.label}
                        color={ft.color}
                      />
                    ))}
                  </div>
                  <div className="w-1" />
                </>
              )}

              {/* Region name */}
              <div className={`text-center text-xs font-medium ${hasAny ? 'text-[#c9a84c]' : 'text-muted-foreground'}`}>
                {region.label}
              </div>

              {bilateral && <div className="w-1" />}

              {/* Right side buttons */}
              <div className="flex gap-0.5 justify-center">
                {findingTypes.slice().reverse().map(ft => (
                  <FindingButton
                    key={`${region.id}-R-${ft.key}`}
                    checked={!!segState[`${ft.key}R`]}
                    onClick={() => toggleFinding(region.id, ft.key, 'R')}
                    label={ft.label}
                    color={ft.color}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
