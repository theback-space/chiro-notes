'use client';

import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { NoteState, NoteAction, SubjectiveData, ObjectiveData, ResponseData, PlanData, SegmentFindings } from '@/lib/types';
import { ORTHO_NEURO_TESTS } from '@/data/ortho-tests';

const EMPTY_FINDINGS: SegmentFindings = {
  jointRestrictionL: false, tendernessL: false, tautMuscleL: false, otherL: false, otherTextL: '',
  jointRestrictionR: false, tendernessR: false, tautMuscleR: false, otherR: false, otherTextR: '',
};

const initialState: NoteState = {
  subjective: {
    visitType: 'ongoing',
    regions: [],
    concerns: [],
    adverseResponse: true,
    newSensations: true,
    customNotes: '',
  },
  segmentMatrix: {},
  romAssessment: {},
  orthoNeuroTests: ORTHO_NEURO_TESTS.map(t => ({ test: t.id, result: 'not-tested' })),
  bodyImageData: null,
  objective: { rom: {}, posture: [], palpation: [] },
  procedures: {},
  response: { tolerance: 'tolerated-well', improvements: [] },
  plan: { addOns: [], followUp: 'as-scheduled' },
  activeTab: 'exam',
};

function noteReducer(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.tab };

    case 'TOGGLE_FINDING': {
      const current = state.segmentMatrix[action.segmentId] || { ...EMPTY_FINDINGS };
      return {
        ...state,
        segmentMatrix: {
          ...state.segmentMatrix,
          [action.segmentId]: { ...current, [action.field]: !current[action.field] },
        },
      };
    }

    case 'SET_OTHER_TEXT': {
      const current = state.segmentMatrix[action.segmentId] || { ...EMPTY_FINDINGS };
      const key = action.side === 'L' ? 'otherTextL' : 'otherTextR';
      return {
        ...state,
        segmentMatrix: {
          ...state.segmentMatrix,
          [action.segmentId]: { ...current, [key]: action.text },
        },
      };
    }

    case 'SET_ROM':
      return { ...state, romAssessment: { ...state.romAssessment, [action.region]: action.grade } };

    case 'SET_ORTHO_TEST': {
      const tests = [...state.orthoNeuroTests];
      tests[action.index] = action.result;
      return { ...state, orthoNeuroTests: tests };
    }

    case 'SET_BODY_IMAGE':
      return { ...state, bodyImageData: action.data };

    case 'SET_SUBJECTIVE':
      return { ...state, subjective: { ...state.subjective, [action.field]: action.value } as SubjectiveData & NoteState['subjective'] };

    case 'SET_OBJECTIVE':
      return { ...state, objective: { ...state.objective, [action.field]: action.value } as ObjectiveData };

    case 'SET_PROCEDURE':
      return { ...state, procedures: { ...state.procedures, [action.region]: action.entry } };

    case 'REMOVE_PROCEDURE': {
      const p = { ...state.procedures };
      delete p[action.region];
      return { ...state, procedures: p };
    }

    case 'SET_RESPONSE':
      return { ...state, response: { ...state.response, [action.field]: action.value } as ResponseData };

    case 'SET_PLAN':
      return { ...state, plan: { ...state.plan, [action.field]: action.value } as PlanData };

    case 'RESET_ALL':
      return { ...initialState, orthoNeuroTests: ORTHO_NEURO_TESTS.map(t => ({ test: t.id, result: 'not-tested' })) };

    default:
      return state;
  }
}

const StateContext = createContext<NoteState>(initialState);
const DispatchContext = createContext<Dispatch<NoteAction>>(() => {});

export function NoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useNoteState() { return useContext(StateContext); }
export function useNoteDispatch() { return useContext(DispatchContext); }

export function useNoteCompletion(state: NoteState) {
  const hasFindings = Object.values(state.segmentMatrix).some(s =>
    s.jointRestrictionL || s.jointRestrictionR || s.tendernessL || s.tendernessR ||
    s.tautMuscleL || s.tautMuscleR || s.otherL || s.otherR
  );
  const s = state.subjective.regions.length > 0;
  const o = hasFindings;
  const a = true;
  const p = Object.keys(state.procedures).length > 0;
  const r = state.response.tolerance !== '';
  const pl = true;
  const count = [s, o, a, p, r, pl].filter(Boolean).length;
  return { subjective: s, objective: o, assessment: a, procedures: p, response: r, plan: pl, count, total: 6 };
}
