'use client';

import { NoteProvider, useNoteState, useNoteDispatch, useNoteCompletion } from '@/hooks/use-note-store';
import { SegmentMatrix } from '@/components/exam/segment-matrix';
import { BodyCanvas } from '@/components/exam/body-canvas';
import { RomAssessment } from '@/components/exam/rom-assessment';
import { OrthoNeuroTests } from '@/components/exam/ortho-neuro-tests';
import { ExamProcedures } from '@/components/exam/exam-procedures';
import { VisitPresets } from '@/components/exam/visit-presets';
import { NoteBuilder } from '@/components/note/note-builder';
import { NotePreview } from '@/components/output/note-preview';
import { SettingsPanel } from '@/components/settings/settings-panel';
import { ConfigProvider } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';

function AppContent() {
  const state = useNoteState();
  const dispatch = useNoteDispatch();
  const completion = useNoteCompletion(state);
  const isNewOrReactivation = state.subjective.visitType === 'new' || state.subjective.visitType === 'reactivation';

  return (
    <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 h-12 border-b border-[#c9a84c]/10 bg-background/95 backdrop-blur">
        <h1 className="text-xs font-bold tracking-[0.25em] uppercase text-[#c9a84c]">THE-BACK.SPACE</h1>
        <span className="text-xs text-[#c9a84c]/60 font-medium tracking-wider">{completion.count}/{completion.total}</span>
      </header>

      {/* Progress bar */}
      <div className="shrink-0 flex h-0.5 bg-zinc-900">
        {['subjective', 'objective', 'assessment', 'procedures', 'response', 'plan'].map((key) => (
          <div
            key={key}
            className="flex-1 transition-colors duration-500"
            style={{
              backgroundColor: completion[key as keyof typeof completion] === true
                ? '#c9a84c'
                : 'transparent',
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* EXAM Tab */}
        <div className={`px-3 py-3 space-y-6 ${state.activeTab !== 'exam' ? 'hidden' : ''}`}>
          <VisitPresets />
          <div className="h-px bg-[#c9a84c]/10" />
          <SegmentMatrix />

          {/* New/Reactivation only sections */}
          {isNewOrReactivation && (
            <>
              <div className="h-px bg-[#c9a84c]/10" />
              <RomAssessment />
              <div className="h-px bg-[#c9a84c]/10" />
              <OrthoNeuroTests />
            </>
          )}

          <div className="h-px bg-[#c9a84c]/10" />
          <ExamProcedures />

          <div className="h-px bg-[#c9a84c]/10" />
          <BodyCanvas />
        </div>

        {/* NOTE Tab */}
        <div className={`px-3 py-3 ${state.activeTab !== 'note' ? 'hidden' : ''}`}>
          <NoteBuilder />
        </div>

        {/* COPY Tab */}
        <div className={`px-3 py-3 ${state.activeTab !== 'copy' ? 'hidden' : ''}`}>
          <NotePreview />
        </div>

        {/* CONFIG Tab */}
        <div className={`px-3 py-3 ${state.activeTab !== 'settings' ? 'hidden' : ''}`}>
          <SettingsPanel />
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="shrink-0 flex border-t border-[#c9a84c]/10 bg-background/95 backdrop-blur" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {([
          { key: 'exam' as const, label: 'Exam', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          )},
          { key: 'note' as const, label: 'Note', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          )},
          { key: 'copy' as const, label: 'Copy', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )},
          { key: 'settings' as const, label: 'Config', icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          )},
        ]).map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => { haptic('light'); dispatch({ type: 'SET_TAB', tab: key }); }}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              state.activeTab === key
                ? 'text-[#c9a84c]'
                : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function Home() {
  return (
    <ConfigProvider>
      <NoteProvider>
        <AppContent />
      </NoteProvider>
    </ConfigProvider>
  );
}
