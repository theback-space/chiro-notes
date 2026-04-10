// ─── ChiroNotes Configuration Schema ─────────────────────────────────────────
// This is the single source of truth for all customizable app content.
// Stored in localStorage, editable via Settings UI, exportable as JSON.

export interface ConfigOption {
  value: string;
  label: string;
  // Extended fields for specific option types
  expandedLabel?: string;  // For concerns (UBNAS -> "upper back, neck and shoulder tension")
  noteText?: string;       // For techniques (diversified -> "diversified adjustment")
}

export interface SpineRegionConfig {
  id: string;
  label: string;
  shortLabel: string;
  region: 'cervical' | 'thoracic' | 'lumbar' | 'sacral' | 'extra';
  clinicalRegion: string;
  enabled: boolean;
}

export interface AppConfig {
  version: number;

  // ─── Branding ───────────────────────────────────────────────────────────
  branding: {
    studioName: string;
    headerText: string;
  };

  // ─── SOAP Templates (locked text) ──────────────────────────────────────
  templates: {
    assessmentText: string;
    verbalConsent: string;
    planOngoing: string;
    planNewReactivation: string;
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
    motionPalpationIntros: string[];
    vbiStatement: string;
  };

  // ─── Dropdown Options ──────────────────────────────────────────────────
  options: {
    regions: ConfigOption[];
    concerns: ConfigOption[];       // with expandedLabel
    motionFindings: ConfigOption[];
    directions: ConfigOption[];
    tissueFindings: ConfigOption[];
    rom: ConfigOption[];
    posture: ConfigOption[];
    palpation: ConfigOption[];
    procedureRegions: ConfigOption[];
    techniques: ConfigOption[];     // with noteText
    positions: ConfigOption[];
    tolerance: ConfigOption[];
    improvements: ConfigOption[];
    planAddOns: ConfigOption[];
    followUp: ConfigOption[];
  };

  // ─── Spine Vertebrae ───────────────────────────────────────────────────
  spineRegions: SpineRegionConfig[];
}

export const CONFIG_VERSION = 1;
export const CONFIG_STORAGE_KEY = 'chironotes-config';
