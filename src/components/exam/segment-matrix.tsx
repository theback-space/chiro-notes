'use client';

import { useState } from 'react';
import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { haptic } from '@/hooks/use-haptic';
import { SEGMENTS, REGION_LABELS } from '@/data/segments';
import type { FindingField, SegmentFindings } from '@/lib/types';

// Finding type abbreviations for the column headers
const FINDING_TYPES = [
  { key: 'other', label: 'O', full: 'Other' },
  { key: 'tenderness', label: 'TP', full: 'Tenderness/Pain' },
  { key: 'tautMuscle', label: 'TM', full: 'Taut/Tender Muscle' },
  { key: 'jointRestriction', label: 'JR', full: 'Joint Restriction' },
] as const;

const EMPTY: SegmentFindings = {
  jointRestrictionL: false, tendernessL: false, tautMuscleL: false, otherL: false, otherTextL: '',
  jointRestrictionR: false, tendernessR: false, tautMuscleR: false, otherR: false, otherTextR: '',
};

// Each finding type gets a unique color
const FINDING_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  jointRestriction: { bg: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.5)', text: '#ef4444' },   // Red
  tenderness:       { bg: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.5)', text: '#3b82f6' },  // Blue
  tautMuscle:       { bg: 'rgba(168,85,247,0.2)', border: 'rgba(168,85,247,0.5)', text: '#a855f7' },  // Purple
  other:            { bg: 'rgba(34,197,94,0.2)',  border: 'rgba(34,197,94,0.5)',  text: '#22c55e' },   // Green
};

function FindingButton({ checked, onClick, findingKey, label }: { checked: boolean; onClick: () => void; findingKey: string; label: string }) {
  const colors = FINDING_COLORS[findingKey] || FINDING_COLORS.other;
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center rounded border transition-all font-bold"
      style={checked ? {
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        fontSize: '8px',
        letterSpacing: '-0.5px',
      } : {
        borderColor: 'rgba(63,63,70,0.35)',
        color: 'transparent',
        fontSize: '8px',
      }}
      title={FINDING_TYPES.find(f => f.key === findingKey)?.full}
    >
      {checked ? label : ''}
    </button>
  );
}

export function SegmentMatrix() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const [expandedOther, setExpandedOther] = useState<string | null>(null);

  let currentRegion = '';

  function toggle(segId: string, field: FindingField) {
    haptic('selection');
    dispatch({ type: 'TOGGLE_FINDING', segmentId: segId, field });
  }

  // Count findings
  const totalFindings = Object.values(state.segmentMatrix).reduce((acc, s) => {
    return acc + [s.jointRestrictionL, s.jointRestrictionR, s.tendernessL, s.tendernessR, s.tautMuscleL, s.tautMuscleR, s.otherL, s.otherR].filter(Boolean).length;
  }, 0);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Chiropractic Palpation Assessment</p>
        <p className="text-xs text-[#c9a84c]/60">{totalFindings} findings</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 px-1 pb-1 text-[10px] text-muted-foreground">
        <span><b style={{ color: '#22c55e' }}>O</b> Other</span>
        <span><b style={{ color: '#3b82f6' }}>TP</b> Tenderness</span>
        <span><b style={{ color: '#a855f7' }}>TM</b> Taut Muscle</span>
        <span><b style={{ color: '#ef4444' }}>JR</b> Joint Restriction</span>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[1fr_auto_2fr_auto_1fr] items-center gap-0 px-1 py-1.5 border-b border-[#c9a84c]/10 sticky top-0 bg-background z-10">
        <div className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">Left</div>
        <div className="w-1" />
        <div className="text-center text-xs text-muted-foreground uppercase tracking-wider font-bold">Segment</div>
        <div className="w-1" />
        <div className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">Right</div>
      </div>

      {/* Segment rows */}
      {SEGMENTS.map((seg) => {
        const showHeader = seg.region !== currentRegion;
        currentRegion = seg.region;
        const f = state.segmentMatrix[seg.id] || EMPTY;
        const hasAny = f.jointRestrictionL || f.jointRestrictionR || f.tendernessL || f.tendernessR || f.tautMuscleL || f.tautMuscleR || f.otherL || f.otherR;
        const showOtherInput = expandedOther === seg.id && (f.otherL || f.otherR);

        return (
          <div key={seg.id}>
            {showHeader && (
              <div className="flex items-center px-1 py-1.5 mt-2">
                <span className="text-[10px] font-bold text-[#c9a84c]/60 uppercase tracking-widest">
                  {REGION_LABELS[seg.region]}
                </span>
                <div className="flex-1 ml-2 h-px bg-[#c9a84c]/10" />
              </div>
            )}

            <div className={`grid grid-cols-[1fr_auto_2fr_auto_1fr] items-center gap-0 px-1 py-0.5 rounded transition-colors ${hasAny ? 'bg-[#c9a84c]/[0.03]' : ''}`}>
              {/* Left checkboxes: O, TP, TM, JR */}
              <div className="flex gap-0.5 justify-center">
                <FindingButton checked={f.otherL} onClick={() => { toggle(seg.id, 'otherL'); if (!f.otherL) setExpandedOther(seg.id); }} findingKey="other" label="O" />
                <FindingButton checked={f.tendernessL} onClick={() => toggle(seg.id, 'tendernessL')} findingKey="tenderness" label="TP" />
                <FindingButton checked={f.tautMuscleL} onClick={() => toggle(seg.id, 'tautMuscleL')} findingKey="tautMuscle" label="TM" />
                <FindingButton checked={f.jointRestrictionL} onClick={() => toggle(seg.id, 'jointRestrictionL')} findingKey="jointRestriction" label="JR" />
              </div>

              <div className="w-1" />

              {/* Segment name centered */}
              <div className={`text-center text-xs font-medium ${hasAny ? 'text-[#c9a84c]' : 'text-muted-foreground'}`}>
                {seg.label}
              </div>

              <div className="w-1" />

              {/* Right checkboxes: JR, TM, TP, O */}
              <div className="flex gap-0.5 justify-center">
                <FindingButton checked={f.jointRestrictionR} onClick={() => toggle(seg.id, 'jointRestrictionR')} findingKey="jointRestriction" label="JR" />
                <FindingButton checked={f.tautMuscleR} onClick={() => toggle(seg.id, 'tautMuscleR')} findingKey="tautMuscle" label="TM" />
                <FindingButton checked={f.tendernessR} onClick={() => toggle(seg.id, 'tendernessR')} findingKey="tenderness" label="TP" />
                <FindingButton checked={f.otherR} onClick={() => { toggle(seg.id, 'otherR'); if (!f.otherR) setExpandedOther(seg.id); }} findingKey="other" label="O" />
              </div>
            </div>

            {/* Other text input row */}
            {showOtherInput && (
              <div className="grid grid-cols-[1fr_auto_2fr_auto_1fr] items-center gap-0 px-1 pb-1">
                {f.otherL && (
                  <input
                    type="text"
                    placeholder="L other..."
                    value={f.otherTextL}
                    onChange={(e) => dispatch({ type: 'SET_OTHER_TEXT', segmentId: seg.id, side: 'L', text: e.target.value })}
                    className="h-7 px-2 text-xs bg-zinc-900 border border-zinc-700 rounded text-center"
                  />
                )}
                {!f.otherL && <div />}
                <div className="w-1" />
                <div />
                <div className="w-1" />
                {f.otherR && (
                  <input
                    type="text"
                    placeholder="R other..."
                    value={f.otherTextR}
                    onChange={(e) => dispatch({ type: 'SET_OTHER_TEXT', segmentId: seg.id, side: 'R', text: e.target.value })}
                    className="h-7 px-2 text-xs bg-zinc-900 border border-zinc-700 rounded text-center"
                  />
                )}
                {!f.otherR && <div />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
