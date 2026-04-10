// ─── SOAP Note State ─────────────────────────────────────────────────────────

export type VisitType = 'ongoing' | 'new' | 'reactivation';

export interface SubjectiveData {
  visitType: VisitType;
  regions: string[];
  concerns: string[];
  adverseResponse: boolean;
  newSensations: boolean;
  customNotes: string;
}

export interface SegmentFindings {
  // Left side
  jointRestrictionL: boolean;
  tendernessL: boolean;
  tautMuscleL: boolean;
  otherL: boolean;
  otherTextL: string;
  // Right side
  jointRestrictionR: boolean;
  tendernessR: boolean;
  tautMuscleR: boolean;
  otherR: boolean;
  otherTextR: string;
}

export interface OrthoTestResult {
  test: string;
  result: string;
  side?: string;
}

export interface ObjectiveData {
  rom: Record<string, string>;
  posture: string[];
  palpation: string[];
}

export interface ProcedureEntry {
  technique: string;
  position: string;
}

export interface ResponseData {
  tolerance: string;
  improvements: string[];
}

export interface PlanData {
  addOns: string[];
  followUp: string;
}

export interface NoteState {
  subjective: SubjectiveData;
  segmentMatrix: Record<string, SegmentFindings>;
  romAssessment: Record<string, string>;
  orthoNeuroTests: OrthoTestResult[];
  bodyImageData: string | null;
  objective: ObjectiveData;
  procedures: Record<string, ProcedureEntry>;
  response: ResponseData;
  plan: PlanData;
  activeTab: 'exam' | 'note' | 'copy' | 'settings';
}

// ─── Actions ─────────────────────────────────────────────────────────────────

export type FindingField = 'jointRestrictionL' | 'tendernessL' | 'tautMuscleL' | 'otherL' | 'jointRestrictionR' | 'tendernessR' | 'tautMuscleR' | 'otherR';

export type NoteAction =
  | { type: 'SET_TAB'; tab: NoteState['activeTab'] }
  | { type: 'TOGGLE_FINDING'; segmentId: string; field: FindingField }
  | { type: 'SET_OTHER_TEXT'; segmentId: string; side: 'L' | 'R'; text: string }
  | { type: 'SET_ROM'; region: string; grade: string }
  | { type: 'SET_ORTHO_TEST'; index: number; result: OrthoTestResult }
  | { type: 'SET_BODY_IMAGE'; data: string | null }
  | { type: 'SET_SUBJECTIVE'; field: keyof SubjectiveData; value: unknown }
  | { type: 'SET_OBJECTIVE'; field: keyof ObjectiveData; value: unknown }
  | { type: 'SET_PROCEDURE'; region: string; entry: ProcedureEntry }
  | { type: 'REMOVE_PROCEDURE'; region: string }
  | { type: 'SET_RESPONSE'; field: keyof ResponseData; value: unknown }
  | { type: 'SET_PLAN'; field: keyof PlanData; value: unknown }
  | { type: 'RESET_ALL' };
