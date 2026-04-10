'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubjectiveSection } from './subjective-section';
import { ObjectiveSection } from './objective-section';
import { AssessmentSection } from './assessment-section';
import { ProceduresSection } from './procedures-section';
import { ResponseSection } from './response-section';
import { PlanSection } from './plan-section';
import { useNoteState, useNoteCompletion } from '@/hooks/use-note-store';
import { haptic } from '@/hooks/use-haptic';

const SECTIONS = [
  { key: 'subjective', letter: 'S', title: 'Subjective', Component: SubjectiveSection },
  { key: 'objective', letter: 'O', title: 'Objective', Component: ObjectiveSection },
  { key: 'assessment', letter: 'A', title: 'Assessment', Component: AssessmentSection },
  { key: 'procedures', letter: 'P', title: 'Procedures', Component: ProceduresSection },
  { key: 'response', letter: 'R', title: 'Response', Component: ResponseSection },
  { key: 'plan', letter: 'Rx', title: 'Plan', Component: PlanSection },
] as const;

export function NoteBuilder() {
  const [openSection, setOpenSection] = useState<string>('subjective');
  const state = useNoteState();
  const completion = useNoteCompletion(state);

  return (
    <div className="space-y-2 pb-4">
      {SECTIONS.map(({ key, letter, title, Component }) => {
        const isOpen = openSection === key;
        const isComplete = completion[key as keyof typeof completion] === true;

        return (
          <Card key={key} className="overflow-hidden">
            <CardHeader
              className="py-3 px-4 cursor-pointer select-none"
              onClick={() => { haptic('light'); setOpenSection(isOpen ? '' : key); }}
            >
              <CardTitle className="flex items-center gap-3 text-sm font-medium">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete
                    ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {letter}
                </span>
                <span className="flex-1 uppercase tracking-wider text-xs">{title}</span>
                <svg
                  className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </CardTitle>
            </CardHeader>
            {isOpen && (
              <CardContent className="px-4 pb-4 pt-0">
                <Component />
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
