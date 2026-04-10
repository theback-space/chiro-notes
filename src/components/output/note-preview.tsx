'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNoteState, useNoteDispatch } from '@/hooks/use-note-store';
import { useClipboard } from '@/hooks/use-clipboard';
import { generateNote } from '@/lib/note-generator';
import { haptic } from '@/hooks/use-haptic';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function NotePreview() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const { copy, copied } = useClipboard();

  const note = useMemo(() => generateNote(state), [state]);
  const hasContent = Object.values(state.segmentMatrix).some(s => s.jointRestrictionL || s.jointRestrictionR || s.tendernessL || s.tendernessR || s.tautMuscleL || s.tautMuscleR || s.otherL || s.otherR) || state.subjective.regions.length > 0;

  return (
    <div className="space-y-4">
      <div className="pb-4">
        {hasContent ? (
          <Card className="border-[#c9a84c]/10">
            <CardContent className="p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{
                  __html: note.replace(
                    /^(SUBJECTIVE|OBJECTIVE|ASSESSMENT|PROCEDURES|RESPONSE|PLAN):/gm,
                    '<span style="color: #c9a84c; font-weight: 700; letter-spacing: 0.1em;">$1:</span>'
                  )
                }}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No note content yet</p>
            <p className="text-sm">Use the Spine and Note tabs to build your session note.</p>
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2 border-t">
        <Button
          onClick={() => { haptic('success'); copy(note); }}
          disabled={!hasContent}
          className={`w-full h-12 text-base font-semibold tracking-wide ${
            copied
              ? 'border-[#c9a84c] text-[#c9a84c]'
              : 'bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90'
          }`}
          variant={copied ? 'outline' : 'default'}
        >
          {copied ? (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </Button>

        <Dialog>
          <DialogTrigger className="inline-flex w-full items-center justify-center text-sm text-destructive hover:text-destructive hover:bg-accent rounded-md py-1.5 cursor-pointer transition-colors">
            Reset Note
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Note?</DialogTitle>
              <DialogDescription>
                This will clear all findings and selections. This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={() => dispatch({ type: 'RESET_ALL' })}>
                Reset Everything
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
