import type { AppConfig } from './config-schema';
import { CONFIG_VERSION } from './config-schema';
import { VERTEBRAE } from '@/data/spine-regions';

export const DEFAULT_CONFIG: AppConfig = {
  version: CONFIG_VERSION,

  branding: {
    studioName: 'The-Back.Space',
    headerText: 'THE-BACK.SPACE',
  },

  templates: {
    assessmentText: 'Segmental joint dysfunction consistent with vertebral subluxation patterns identified on motion palpation. Care today provided as Maintenance Care with a Preventive/Wellness intent focused on supporting spinal joint mechanics and overall mobility.',
    verbalConsent: 'Verbal consent obtained prior to care.',
    planOngoing: 'Continue maintenance chiropractic care while client demonstrates continued positive response and functional improvement.',
    planNewReactivation: 'Recommend chiropractic care one to two times per week while client demonstrates continued positive response and functional improvement.',
    openingPhrases: {
      ongoing: [
        'Client presents for ongoing chiropractic care for',
        'Client reports for continued chiropractic care addressing',
        'Client is here for ongoing chiropractic care for',
        'Client returns for continued chiropractic care for',
      ],
      new: [
        'Client presents for initial chiropractic evaluation and care for',
        'New client presents for chiropractic evaluation regarding',
        'Client presents for first visit addressing',
      ],
      reactivation: [
        'Client returns for reactivation of chiropractic care for',
        'Client presents for reactivation of care addressing',
        'Client returns to resume chiropractic care for',
      ],
    },
    adverseDenialPhrases: [
      'Client denies any adverse response to previous session.',
      'No adverse response to previous care reported.',
      'Client reports no adverse effects from last session.',
    ],
    noNewSensationsPhrases: [
      'No new sensations, injuries, or incidents reported.',
      'No new complaints, injuries, or incidents since last visit.',
      'Client reports no new sensations or incidents.',
    ],
    tolerancePhrases: {
      well: [
        'Client tolerated procedures well.',
        'Procedures were well-tolerated.',
        'Client tolerated today\'s procedures without incident.',
      ],
      withoutIncident: [
        'Client tolerated procedures without incident.',
        'Procedures were tolerated without incident.',
        'No adverse response during procedures.',
      ],
    },
    motionPalpationIntros: [
      'Motion palpation reveals segmental joint dysfunction in the',
      'On motion palpation, segmental joint dysfunction identified in the',
      'Motion palpation findings indicate segmental dysfunction in the',
    ],
    vbiStatement: 'No VBI or other neurological or orthopedic-related symptoms reported.',
  },

  options: {
    regions: [
      { value: 'cervical', label: 'Cervical' },
      { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' },
      { value: 'pelvic', label: 'Pelvic' },
      { value: 'full-spine', label: 'Full spine' },
      { value: 'ctl', label: 'CTL (cervical/thoracic/lumbar)' },
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
      { value: 'intermittent-tension', label: 'Intermittent tension', expandedLabel: 'intermittent tension and stiffness' },
    ],
    motionFindings: [
      { value: 'restricted', label: 'Restricted', noteText: 'Restricted segmental motion' },
      { value: 'fixated', label: 'Fixated', noteText: 'Fixation noted' },
      { value: 'hypomobile', label: 'Hypomobile', noteText: 'Hypomobility identified' },
      { value: 'hypermobile', label: 'Hypermobile', noteText: 'Hypermobility noted' },
      { value: 'decreased-rom', label: 'Decreased ROM', noteText: 'Decreased range of motion' },
      { value: 'joint-dysfunction', label: 'Joint dysfunction', noteText: 'Segmental joint dysfunction' },
    ],
    directions: [
      { value: 'flexion', label: 'Flexion', noteText: 'in flexion' },
      { value: 'extension', label: 'Extension', noteText: 'in extension' },
      { value: 'lateral-flexion-left', label: 'Lateral flexion (L)', noteText: 'in left lateral flexion' },
      { value: 'lateral-flexion-right', label: 'Lateral flexion (R)', noteText: 'in right lateral flexion' },
      { value: 'rotation-left', label: 'Rotation (L)', noteText: 'with decreased left rotation' },
      { value: 'rotation-right', label: 'Rotation (R)', noteText: 'with decreased right rotation' },
      { value: 'posterior', label: 'Posterior', noteText: 'with posterior involvement' },
      { value: 'anterior', label: 'Anterior', noteText: 'with anterior involvement' },
    ],
    tissueFindings: [
      { value: 'hypertonicity', label: 'Hypertonicity', noteText: 'Associated hypertonicity noted on palpation' },
      { value: 'tenderness', label: 'Tenderness', noteText: 'Tenderness noted on palpation' },
      { value: 'tension', label: 'Tension', noteText: 'Muscular tension noted in the surrounding tissue' },
      { value: 'spasm', label: 'Spasm', noteText: 'Muscle spasm noted on palpation' },
      { value: 'trigger-point', label: 'Trigger point', noteText: 'Trigger point identified on palpation' },
    ],
    rom: [
      { value: 'wnl', label: 'WNL (within normal limits)' },
      { value: 'decreased', label: 'Decreased' },
      { value: 'significantly-decreased', label: 'Significantly decreased' },
      { value: 'not-assessed', label: 'Not assessed' },
    ],
    posture: [
      { value: 'forward-head', label: 'Forward head posture' },
      { value: 'increased-kyphosis', label: 'Increased thoracic kyphosis' },
      { value: 'decreased-lordosis', label: 'Decreased lumbar lordosis' },
      { value: 'increased-lordosis', label: 'Increased lumbar lordosis' },
      { value: 'pelvic-tilt', label: 'Pelvic tilt' },
      { value: 'uneven-shoulders', label: 'Uneven shoulder height' },
      { value: 'lateral-shift', label: 'Lateral shift' },
      { value: 'wnl', label: 'Within normal limits' },
    ],
    palpation: [
      { value: 'cervical-hypertonicity', label: 'Cervical hypertonicity' },
      { value: 'thoracic-hypertonicity', label: 'Thoracic hypertonicity' },
      { value: 'lumbar-hypertonicity', label: 'Lumbar hypertonicity' },
      { value: 'upper-trap-tension', label: 'Upper trapezius tension' },
      { value: 'paraspinal-tension', label: 'Paraspinal tension' },
      { value: 'trigger-points', label: 'Trigger points identified' },
    ],
    procedureRegions: [
      { value: 'cervical', label: 'Cervical' },
      { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' },
      { value: 'lumbopelvic', label: 'Lumbopelvic' },
      { value: 'pelvic', label: 'Pelvic' },
      { value: 'ctl', label: 'Cervical/thoracic/lumbar' },
      { value: 'full-spine', label: 'Full spine' },
    ],
    techniques: [
      { value: 'diversified', label: 'Diversified', noteText: 'diversified adjustment' },
      { value: 'joint-mobilization', label: 'Joint mobilization', noteText: 'joint mobilization' },
      { value: 'instrument-assisted', label: 'SLAT (instrument-assisted)', noteText: 'instrument-assisted adjustment' },
      { value: 'drop-table', label: 'Drop-table', noteText: 'drop-table adjustment' },
      { value: 'flexion-distraction', label: 'Flexion-distraction', noteText: 'flexion-distraction' },
      { value: 'activator', label: 'Activator', noteText: 'Activator method adjustment' },
    ],
    positions: [
      { value: 'prone', label: 'Prone' },
      { value: 'supine', label: 'Supine' },
      { value: 'side-posture', label: 'Side posture' },
      { value: 'anterior-dorsal', label: 'Anterior dorsal' },
      { value: 'seated', label: 'Seated' },
    ],
    tolerance: [
      { value: 'tolerated-well', label: 'Tolerated procedures well' },
      { value: 'without-incident', label: 'Tolerated procedures without incident' },
      { value: 'well-no-complaints', label: 'Tolerated well, no complaints' },
    ],
    improvements: [
      { value: 'improved-mobility', label: 'Improved mobility' },
      { value: 'decreased-tension', label: 'Decreased tension' },
      { value: 'improved-rom', label: 'Improved ROM' },
      { value: 'decreased-stiffness', label: 'Decreased stiffness' },
      { value: 'feels-better', label: 'Feels better' },
      { value: 'none-reported', label: 'No immediate changes reported' },
    ],
    planAddOns: [
      { value: 'ice', label: 'Ice 15 minutes as needed' },
      { value: 'heat', label: 'Heat 15 minutes as needed' },
      { value: 'stretching', label: 'Home stretching discussed' },
      { value: 'ergonomic', label: 'Ergonomic considerations discussed' },
      { value: 'hydration', label: 'Hydration encouraged' },
      { value: 'monitor', label: 'Monitor and report any changes' },
    ],
    followUp: [
      { value: 'as-scheduled', label: 'Next visit as scheduled' },
      { value: 'one-week', label: 'Re-evaluate in 1 week' },
      { value: 'two-weeks', label: 'Re-evaluate in 2 weeks' },
      { value: 'four-weeks', label: 'Re-evaluate in 4 weeks' },
      { value: 'prn', label: 'As needed (PRN)' },
    ],
  },

  spineRegions: VERTEBRAE.map(v => ({
    id: v.id,
    label: v.label,
    shortLabel: v.shortLabel,
    region: v.region,
    clinicalRegion: v.clinicalRegion,
    enabled: true,
  })),
};
