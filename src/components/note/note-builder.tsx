'use client';

import { useState, type ComponentType } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubjectiveSection } from './subjective-section';
import { ObjectiveSection } from './objective-section';
import { AssessmentSection } from './assessment-section';
import { ProceduresSection } from './procedures-section';
import { ResponseSection } from './response-section';
import { PlanSection } from './plan-section';
import { useNoteState, useNoteCompletion } from '@/hooks/use-note-store';
import { useConfig } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';

// Map section keys to components
const SECTION_COMPONENTS: Record<string, ComponentType> = {
  subjective: SubjectiveSection,
  data: SubjectiveSection, // DAP "Data" uses the same subjective+objective UI
  objective: ObjectiveSection,
  assessment: AssessmentSection,
  procedures: ProceduresSection,
  response: ResponseSection,
  plan: PlanSection,
};

export function NoteBuilder() {
  const { config } = useConfig();
  const state = useNoteState();
  const completion = useNoteCompletion(state);
  const [openSection, setOpenSection] = useState<string>(config.sections[0]?.key || 'subjective');

  return (
    <div className="space-y-2 pb-4">
      {config.sections.map(({ key, letter, title }) => {
        const isOpen = openSection === key;
        const isComplete = completion[key as keyof typeof completion] === true;
        const Component = SECTION_COMPONENTS[key];
        if (!Component) return null;

        return (
          <Card key={key} className="overflow-hidden">
            <CardHeader
              className="py-3 px-4 cursor-pointer select-none"
              onClick={() => { haptic('light'); setOpenSection(isOpen ? '' : key); }}
            >
              <CardTitle className="flex items-center gap-3 text-sm font-medium">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete ? 'bg-[#c9a84c]/20 text-[#c9a84c]' : 'bg-muted text-muted-foreground'
                }`}>
                  {letter}
                </span>
                <span className="flex-1 uppercase tracking-wider text-xs">{title}</span>
                <svg
                  className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
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
