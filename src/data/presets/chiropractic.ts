import type { AppConfig } from '@/lib/config-schema';
import { CONFIG_VERSION } from '@/lib/config-schema';

export const CHIROPRACTIC_PRESET: AppConfig = {
  version: CONFIG_VERSION,
  specialty: 'chiropractic',
  noteFormat: 'soap',

  branding: { studioName: 'The-Back.Space', headerText: 'THE-BACK.SPACE', appName: 'ChiroNotes' },

  matrix: {
    enabled: true,
    label: 'Chiropractic Palpation Assessment',
    bilateral: true,
    findingTypes: [
      { key: 'other', label: 'O', fullLabel: 'Other', color: '#22c55e' },
      { key: 'tenderness', label: 'TP', fullLabel: 'Tenderness/Pain', color: '#3b82f6' },
      { key: 'tautMuscle', label: 'TM', fullLabel: 'Taut/Tender Muscle', color: '#a855f7' },
      { key: 'jointRestriction', label: 'JR', fullLabel: 'Joint Restriction', color: '#ef4444' },
    ],
    regions: [
      { id: 'C0', label: 'C0 (Occiput)', group: 'Cervical' },
      { id: 'C1', label: 'C1 (Atlas)', group: 'Cervical' },
      { id: 'C2', label: 'C2 (Axis)', group: 'Cervical' },
      { id: 'C3', label: 'C3', group: 'Cervical' },
      { id: 'C4', label: 'C4', group: 'Cervical' },
      { id: 'C5', label: 'C5', group: 'Cervical' },
      { id: 'C6', label: 'C6', group: 'Cervical' },
      { id: 'C7', label: 'C7', group: 'Cervical' },
      { id: 'T1', label: 'T1', group: 'Thoracic' },
      { id: 'T2', label: 'T2', group: 'Thoracic' },
      { id: 'T3', label: 'T3', group: 'Thoracic' },
      { id: 'T4', label: 'T4', group: 'Thoracic' },
      { id: 'T5', label: 'T5', group: 'Thoracic' },
      { id: 'T6', label: 'T6', group: 'Thoracic' },
      { id: 'T7', label: 'T7', group: 'Thoracic' },
      { id: 'T8', label: 'T8', group: 'Thoracic' },
      { id: 'T9', label: 'T9', group: 'Thoracic' },
      { id: 'T10', label: 'T10', group: 'Thoracic' },
      { id: 'T11', label: 'T11', group: 'Thoracic' },
      { id: 'T12', label: 'T12', group: 'Thoracic' },
      { id: 'L1', label: 'L1', group: 'Lumbar' },
      { id: 'L2', label: 'L2', group: 'Lumbar' },
      { id: 'L3', label: 'L3', group: 'Lumbar' },
      { id: 'L4', label: 'L4', group: 'Lumbar' },
      { id: 'L5', label: 'L5', group: 'Lumbar' },
      { id: 'sacrum', label: 'Sacrum', group: 'Sacral / Pelvic' },
      { id: 'si-left', label: 'SI Joint (L)', group: 'Sacral / Pelvic' },
      { id: 'si-right', label: 'SI Joint (R)', group: 'Sacral / Pelvic' },
      { id: 'coccyx', label: 'Coccyx', group: 'Sacral / Pelvic' },
      { id: 'ribs-left', label: 'Ribs (L)', group: 'Other' },
      { id: 'ribs-right', label: 'Ribs (R)', group: 'Other' },
      { id: 'pelvis', label: 'Pelvis', group: 'Other' },
    ],
  },

  sections: [
    { key: 'subjective', letter: 'S', title: 'Subjective' },
    { key: 'objective', letter: 'O', title: 'Objective' },
    { key: 'assessment', letter: 'A', title: 'Assessment' },
    { key: 'procedures', letter: 'P', title: 'Procedures' },
    { key: 'response', letter: 'R', title: 'Response' },
    { key: 'plan', letter: 'Rx', title: 'Plan' },
  ],

  templates: {
    assessmentText: 'Segmental joint dysfunction consistent with vertebral subluxation patterns identified on motion palpation. Care today provided as Maintenance Care with a Preventive/Wellness intent focused on supporting spinal joint mechanics and overall mobility.',
    consentLine: 'Verbal consent obtained prior to care.',
    planOngoing: 'Continue maintenance chiropractic care while client demonstrates continued positive response and functional improvement.',
    planNew: 'Recommend chiropractic care one to two times per week while client demonstrates continued positive response and functional improvement.',
    openingPhrases: {
      ongoing: ['Client presents for ongoing chiropractic care for', 'Client reports for continued chiropractic care addressing', 'Client is here for ongoing chiropractic care for', 'Client returns for continued chiropractic care for'],
      new: ['Client presents for initial chiropractic evaluation and care for', 'New client presents for chiropractic evaluation regarding', 'Client presents for first visit addressing'],
      reactivation: ['Client returns for reactivation of chiropractic care for', 'Client presents for reactivation of care addressing', 'Client returns to resume chiropractic care for'],
    },
    adverseDenialPhrases: ['Client denies any adverse response to previous session.', 'No adverse response to previous care reported.', 'Client reports no adverse effects from last session.'],
    noNewSensationsPhrases: ['No new sensations, injuries, or incidents reported.', 'No new complaints, injuries, or incidents since last visit.', 'Client reports no new sensations or incidents.'],
    tolerancePhrases: {
      well: ['Client tolerated procedures well.', 'Procedures were well-tolerated.', 'Client tolerated today\'s procedures without incident.'],
      withoutIncident: ['Client tolerated procedures without incident.', 'Procedures were tolerated without incident.', 'No adverse response during procedures.'],
    },
    objectiveIntros: ['Motion palpation reveals segmental joint dysfunction at', 'On motion palpation, segmental joint dysfunction identified at', 'Motion palpation findings indicate segmental dysfunction at'],
    vbiStatement: 'No VBI or other neurological or orthopedic-related symptoms reported.',
  },

  options: {
    regions: [
      { value: 'cervical', label: 'Cervical' }, { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' }, { value: 'pelvic', label: 'Pelvic' },
      { value: 'full-spine', label: 'Full spine' }, { value: 'ctl', label: 'CTL (cervical/thoracic/lumbar)' },
    ],
    concerns: [
      { value: 'ubnas', label: 'UBNAS', expandedLabel: 'upper back, neck and shoulder tension' },
      { value: 'lbp', label: 'LBP', expandedLabel: 'lower back discomfort' },
      { value: 'tension', label: 'Tension', expandedLabel: 'tension' },
      { value: 'stiffness', label: 'Stiffness', expandedLabel: 'stiffness' },
      { value: 'limited-mobility', label: 'Limited mobility', expandedLabel: 'limited mobility' },
      { value: 'general-wellness', label: 'General wellness', expandedLabel: 'general wellness maintenance' },
      { value: 'posture', label: 'Posture', expandedLabel: 'postural concerns' },
      { value: 'headaches', label: 'Headaches', expandedLabel: 'headaches' },
      { value: 'discomfort', label: 'Discomfort', expandedLabel: 'discomfort' },
    ],
    procedureRegions: [
      { value: 'cervical', label: 'Cervical' }, { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' }, { value: 'lumbopelvic', label: 'Lumbopelvic' },
      { value: 'pelvic', label: 'Pelvic' }, { value: 'full-spine', label: 'Full spine' },
    ],
    techniques: [
      { value: 'diversified', label: 'Diversified', noteText: 'diversified adjustment' },
      { value: 'joint-mobilization', label: 'Joint mobilization', noteText: 'joint mobilization' },
      { value: 'instrument-assisted', label: 'SLAT', noteText: 'instrument-assisted adjustment' },
      { value: 'drop-table', label: 'Drop-table', noteText: 'drop-table adjustment' },
      { value: 'flexion-distraction', label: 'Flexion-distraction', noteText: 'flexion-distraction' },
      { value: 'activator', label: 'Activator', noteText: 'Activator method adjustment' },
    ],
    positions: [
      { value: 'prone', label: 'Prone' }, { value: 'supine', label: 'Supine' },
      { value: 'side-posture', label: 'Side posture' }, { value: 'anterior-dorsal', label: 'Anterior dorsal' },
      { value: 'seated', label: 'Seated' },
    ],
    rom: [
      { value: 'wnl', label: 'WNL' }, { value: 'decreased', label: 'Decreased' },
      { value: 'significantly-decreased', label: 'Significantly decreased' },
    ],
    posture: [
      { value: 'forward-head', label: 'Forward head posture' }, { value: 'increased-kyphosis', label: 'Increased thoracic kyphosis' },
      { value: 'pelvic-tilt', label: 'Pelvic tilt' }, { value: 'uneven-shoulders', label: 'Uneven shoulder height' },
    ],
    palpation: [
      { value: 'cervical-hypertonicity', label: 'Cervical hypertonicity' }, { value: 'thoracic-hypertonicity', label: 'Thoracic hypertonicity' },
      { value: 'lumbar-hypertonicity', label: 'Lumbar hypertonicity' }, { value: 'paraspinal-tension', label: 'Paraspinal tension' },
    ],
    tolerance: [
      { value: 'tolerated-well', label: 'Tolerated procedures well' },
      { value: 'without-incident', label: 'Tolerated procedures without incident' },
    ],
    improvements: [
      { value: 'improved-mobility', label: 'Improved mobility' }, { value: 'decreased-tension', label: 'Decreased tension' },
      { value: 'improved-rom', label: 'Improved ROM' }, { value: 'decreased-stiffness', label: 'Decreased stiffness' },
      { value: 'none-reported', label: 'No immediate changes reported' },
    ],
    planAddOns: [
      { value: 'ice', label: 'Ice 15 minutes as needed' }, { value: 'heat', label: 'Heat 15 minutes as needed' },
      { value: 'stretching', label: 'Home stretching discussed' }, { value: 'hydration', label: 'Hydration encouraged' },
    ],
    followUp: [
      { value: 'as-scheduled', label: 'Next visit as scheduled' }, { value: 'one-week', label: 'Re-evaluate in 1 week' },
      { value: 'two-weeks', label: 'Re-evaluate in 2 weeks' }, { value: 'prn', label: 'As needed (PRN)' },
    ],
  },

  tests: {
    enabled: true,
    label: 'Orthopedic / Neurological Tests',
    items: [
      { id: 'kemps', label: "Kemp's Test", hasSide: true },
      { id: 'valsalva', label: 'Valsalva', hasSide: false },
      { id: 'slr', label: 'Straight Leg Raise', hasSide: true },
      { id: 'cervical-compression', label: 'Cervical Compression', hasSide: true },
      { id: 'cervical-distraction', label: 'Cervical Distraction', hasSide: false },
      { id: 'soto-hall', label: 'Soto-Hall', hasSide: false },
      { id: 'shoulder-depression', label: 'Shoulder Depression', hasSide: true },
      { id: 'dermatomal', label: 'Dermatomal Screening', hasSide: false },
    ],
  },

  romAssessment: {
    enabled: true,
    regions: [{ id: 'cervical', label: 'Cervical ROM' }, { id: 'thoracic', label: 'Thoracic ROM' }, { id: 'lumbar', label: 'Lumbar ROM' }],
    grades: [{ value: 'wnl', label: 'WNL' }, { value: 'mild', label: 'Mild decrease' }, { value: 'moderate', label: 'Moderate decrease' }, { value: 'severe', label: 'Severe decrease' }],
  },
};
