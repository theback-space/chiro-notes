'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getVertebraById } from '@/data/spine-regions';
import { buildFindingSentence } from '@/data/finding-options';
import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';
import type { VertebraFinding } from '@/lib/types';

export function VertebraPanel() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { config } = useConfig();
  const MOTION_FINDING_OPTIONS = config.options.motionFindings;
  const DIRECTION_OPTIONS = config.options.directions;
  const TISSUE_OPTIONS = config.options.tissueFindings;
  const vertebra = state.selectedVertebra ? getVertebraById(state.selectedVertebra) : null;
  const findings = state.selectedVertebra ? (state.spineFindings[state.selectedVertebra] || []) : [];

  const [motionFinding, setMotionFinding] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [tissue, setTissue] = useState<string | null>(null);

  const preview = vertebra ? buildFindingSentence(vertebra.label, { motionFinding, direction, tissue }) : '';

  function handleAdd() {
    if (!state.selectedVertebra || !motionFinding) return;
    haptic('success');
    const finding: VertebraFinding = {
      id: crypto.randomUUID(),
      motionFinding,
      direction,
      tissue,
    };
    dispatch({ type: 'ADD_FINDING', vertebraId: state.selectedVertebra, finding });
    setMotionFinding(null);
    setDirection(null);
    setTissue(null);
  }

  function handleRemove(findingId: string) {
    if (!state.selectedVertebra) return;
    dispatch({ type: 'REMOVE_FINDING', vertebraId: state.selectedVertebra, findingId });
  }

  function handleClose() {
    dispatch({ type: 'SELECT_VERTEBRA', id: null });
    setMotionFinding(null);
    setDirection(null);
    setTissue(null);
  }

  return (
    <Sheet open={!!state.selectedVertebra} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <SheetContent side="bottom" className="max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-[#c9a84c]/20">
        {/* Gold accent bar */}
        <div className="w-12 h-1 rounded-full bg-[#c9a84c]/40 mx-auto mb-3" />
        <SheetHeader className="pb-3">
          <SheetTitle className="text-lg tracking-wide text-[#c9a84c]">{vertebra?.label || ''}</SheetTitle>
        </SheetHeader>

        {/* Existing findings */}
        {findings.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Findings</p>
            {findings.map((f) => (
              <div key={f.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                <p className="flex-1 text-muted-foreground">
                  {vertebra ? buildFindingSentence(vertebra.label, f) : ''}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-destructive shrink-0"
                  onClick={() => handleRemove(f.id)}
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add finding form */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Add Finding</p>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Motion Finding *</label>
            <Select value={motionFinding || ''} onValueChange={setMotionFinding}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select finding..." />
              </SelectTrigger>
              <SelectContent>
                {MOTION_FINDING_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Direction</label>
            <Select value={direction || ''} onValueChange={setDirection}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select direction..." />
              </SelectTrigger>
              <SelectContent>
                {DIRECTION_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tissue Finding</label>
            <Select value={tissue || ''} onValueChange={setTissue}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select tissue finding..." />
              </SelectTrigger>
              <SelectContent>
                {TISSUE_OPTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Live preview */}
          {preview && (
            <div className="p-3 rounded-lg bg-[#c9a84c]/5 border-l-2 border-[#c9a84c]/40 text-sm text-muted-foreground italic">
              {preview}
            </div>
          )}

          <Button
            onClick={handleAdd}
            disabled={!motionFinding}
            className="w-full h-12 bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 font-semibold tracking-wide"
          >
            Add Finding
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
