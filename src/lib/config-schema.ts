// ─── NoteSpace Configuration Schema ──────────────────────────────────────────
// White-label clinical documentation engine.
// One codebase, multiple specialties via config presets.

export interface ConfigOption {
  value: string;
  label: string;
  expandedLabel?: string;
  noteText?: string;
}

export interface MatrixRegion {
  id: string;
  label: string;
  group: string; // region divider label
}

export interface FindingType {
  key: string;
  label: string;      // abbreviation: "JR", "TP", etc.
  fullLabel: string;   // full name: "Joint Restriction"
  color: string;       // hex color
}

export type NoteFormat = 'soap' | 'dap';
export type Specialty = 'chiropractic' | 'massage' | 'acupuncture' | 'pt' | 'mental-health';

export interface AppConfig {
  version: number;
  specialty: Specialty;
  noteFormat: NoteFormat;

  // ─── Branding ───────────────────────────────────────────────────────────
  branding: {
    studioName: string;
    headerText: string;
    appName: string;
  };

  // ─── Matrix Configuration ──────────────────────────────────────────────
  matrix: {
    enabled: boolean;        // false for mental health (no body matrix)
    label: string;           // "Chiropractic Palpation Assessment", "Soft Tissue Assessment", etc.
    regions: MatrixRegion[];
    findingTypes: FindingType[];
    bilateral: boolean;      // left/right sides
  };

  // ─── Mental Health Specific (symptom checklists instead of matrix) ─────
  symptomChecklists?: {
    label: string;
    categories: {
      name: string;
      options: string[];
      multiSelect: boolean;
    }[];
  };

  // ─── SOAP/DAP Section Labels ───────────────────────────────────────────
  sections: {
    key: string;
    letter: string;
    title: string;
  }[];

  // ─── Templates ─────────────────────────────────────────────────────────
  templates: {
    assessmentText: string;
    consentLine: string;
    planOngoing: string;
    planNew: string;
    openingPhrases: {
      ongoing: string[];
      new: string[];
      reactivation: string[];
    };
    adverseDenialPhrases: string[];
    noNewSensationsPhrases: string[];
    tolerancePhrases: {
      well: string[];
      withoutIncident: string[];
    };
    objectiveIntros: string[];  // "Motion palpation reveals..." or "Soft tissue assessment reveals..."
    vbiStatement: string;
  };

  // ─── Dropdown Options ──────────────────────────────────────────────────
  options: {
    regions: ConfigOption[];
    concerns: ConfigOption[];
    procedureRegions: ConfigOption[];
    techniques: ConfigOption[];
    positions: ConfigOption[];
    rom: ConfigOption[];
    posture: ConfigOption[];
    palpation: ConfigOption[];
    tolerance: ConfigOption[];
    improvements: ConfigOption[];
    planAddOns: ConfigOption[];
    followUp: ConfigOption[];
    // Mental health specific
    interventions?: ConfigOption[];
  };

  // ─── Tests (shown for new/reactivation visits) ─────────────────────────
  tests: {
    enabled: boolean;
    label: string;
    items: {
      id: string;
      label: string;
      hasSide: boolean;
    }[];
  };

  romAssessment: {
    enabled: boolean;
    regions: { id: string; label: string }[];
    grades: ConfigOption[];
  };
}

export const CONFIG_VERSION = 2;
export const CONFIG_STORAGE_KEY = 'notespace-config';
