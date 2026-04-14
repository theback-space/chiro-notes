import type { AppConfig } from '@/lib/config-schema';
import { CONFIG_VERSION } from '@/lib/config-schema';

export const PT_PRESET: AppConfig = {
  version: CONFIG_VERSION,
  specialty: 'pt',
  noteFormat: 'soap',

  branding: { studioName: 'My Practice', headerText: 'PT NOTES', appName: 'PTNotes' },

  matrix: {
    enabled: true,
    label: 'Functional Assessment',
    bilateral: true,
    findingTypes: [
      { key: 'pain', label: 'PA', fullLabel: 'Pain', color: '#ef4444' },
      { key: 'weakness', label: 'WK', fullLabel: 'Weakness', color: '#3b82f6' },
      { key: 'tightness', label: 'TT', fullLabel: 'Tightness', color: '#a855f7' },
      { key: 'instability', label: 'IN', fullLabel: 'Instability', color: '#f97316' },
    ],
    regions: [
      { id: 'cervical', label: 'Cervical Spine', group: 'Spine' },
      { id: 'thoracic', label: 'Thoracic Spine', group: 'Spine' },
      { id: 'lumbar', label: 'Lumbar Spine', group: 'Spine' },
      { id: 'sacroiliac', label: 'Sacroiliac Joint', group: 'Spine' },
      { id: 'shoulder', label: 'Shoulder', group: 'Upper Extremity' },
      { id: 'elbow', label: 'Elbow', group: 'Upper Extremity' },
      { id: 'wrist-hand', label: 'Wrist / Hand', group: 'Upper Extremity' },
      { id: 'hip', label: 'Hip', group: 'Lower Extremity' },
      { id: 'knee', label: 'Knee', group: 'Lower Extremity' },
      { id: 'ankle-foot', label: 'Ankle / Foot', group: 'Lower Extremity' },
      { id: 'tmj', label: 'TMJ', group: 'Other' },
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
    assessmentText: 'Functional assessment reveals areas of impairment as noted above. Care today provided to address identified limitations and support the client\'s functional goals.',
    consentLine: 'Informed consent obtained prior to session.',
    planOngoing: 'Continue physical therapy sessions to address identified impairments and support functional improvement.',
    planNew: 'Recommend physical therapy sessions two to three times per week for the initial phase of care.',
    openingPhrases: {
      ongoing: ['Client presents for ongoing physical therapy session for', 'Client returns for continued PT addressing', 'Client is here for scheduled physical therapy for'],
      new: ['Client presents for initial physical therapy evaluation for', 'New client presents for PT evaluation regarding'],
      reactivation: ['Client returns for physical therapy after extended break for', 'Client resumes physical therapy for'],
    },
    adverseDenialPhrases: ['Client denies any adverse response to previous session.', 'No adverse response to previous session reported.'],
    noNewSensationsPhrases: ['No new sensations, injuries, or incidents reported.', 'Client reports no new complaints since last visit.'],
    tolerancePhrases: {
      well: ['Client tolerated session well.', 'Session was well-tolerated.'],
      withoutIncident: ['Client tolerated session without incident.', 'No adverse response during session.'],
    },
    objectiveIntros: ['Functional assessment reveals impairment at', 'Assessment identifies areas of involvement at', 'Clinical findings noted at'],
    vbiStatement: '',
  },

  options: {
    regions: [
      { value: 'cervical', label: 'Cervical' }, { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' }, { value: 'shoulder', label: 'Shoulder' },
      { value: 'knee', label: 'Knee' }, { value: 'hip', label: 'Hip' },
      { value: 'ankle', label: 'Ankle' }, { value: 'wrist', label: 'Wrist' },
    ],
    concerns: [
      { value: 'pain', label: 'Pain', expandedLabel: 'pain' },
      { value: 'weakness', label: 'Weakness', expandedLabel: 'weakness' },
      { value: 'stiffness', label: 'Stiffness', expandedLabel: 'stiffness' },
      { value: 'limited-rom', label: 'Limited ROM', expandedLabel: 'limited range of motion' },
      { value: 'instability', label: 'Instability', expandedLabel: 'joint instability' },
      { value: 'difficulty-walking', label: 'Gait difficulty', expandedLabel: 'difficulty with ambulation' },
      { value: 'balance', label: 'Balance', expandedLabel: 'balance concerns' },
      { value: 'post-surgical', label: 'Post-surgical', expandedLabel: 'post-surgical rehabilitation' },
    ],
    procedureRegions: [
      { value: 'cervical', label: 'Cervical' }, { value: 'thoracic', label: 'Thoracic' },
      { value: 'lumbar', label: 'Lumbar' }, { value: 'shoulder', label: 'Shoulder' },
      { value: 'hip', label: 'Hip' }, { value: 'knee', label: 'Knee' },
      { value: 'ankle', label: 'Ankle/Foot' }, { value: 'full-body', label: 'Full Body' },
    ],
    techniques: [
      { value: 'manual-therapy', label: 'Manual Therapy', noteText: 'manual therapy / joint mobilization' },
      { value: 'therapeutic-exercise', label: 'Therapeutic Exercise', noteText: 'therapeutic exercise' },
      { value: 'neuromuscular', label: 'Neuromuscular Re-ed', noteText: 'neuromuscular re-education' },
      { value: 'gait-training', label: 'Gait Training', noteText: 'gait training' },
      { value: 'stretching', label: 'Stretching', noteText: 'stretching and flexibility exercises' },
      { value: 'modalities', label: 'Modalities', noteText: 'therapeutic modalities' },
      { value: 'dry-needling', label: 'Dry Needling', noteText: 'dry needling' },
      { value: 'taping', label: 'Kinesiology Taping', noteText: 'kinesiology taping' },
    ],
    positions: [
      { value: 'supine', label: 'Supine' }, { value: 'prone', label: 'Prone' },
      { value: 'side-lying', label: 'Side-lying' }, { value: 'seated', label: 'Seated' },
      { value: 'standing', label: 'Standing' },
    ],
    rom: [{ value: 'wnl', label: 'WNL' }, { value: 'mild', label: 'Mild decrease' }, { value: 'moderate', label: 'Moderate decrease' }, { value: 'severe', label: 'Severe decrease' }],
    posture: [{ value: 'forward-head', label: 'Forward head posture' }, { value: 'rounded-shoulders', label: 'Rounded shoulders' }, { value: 'pelvic-tilt', label: 'Pelvic tilt' }, { value: 'gait-deviation', label: 'Gait deviation noted' }],
    palpation: [{ value: 'tenderness', label: 'Tenderness' }, { value: 'guarding', label: 'Muscle guarding' }, { value: 'swelling', label: 'Swelling noted' }, { value: 'warmth', label: 'Warmth noted' }],
    tolerance: [{ value: 'tolerated-well', label: 'Tolerated session well' }, { value: 'without-incident', label: 'Tolerated without incident' }],
    improvements: [
      { value: 'improved-rom', label: 'Improved ROM' }, { value: 'decreased-pain', label: 'Decreased pain' },
      { value: 'improved-strength', label: 'Improved strength' }, { value: 'improved-gait', label: 'Improved gait pattern' },
      { value: 'improved-balance', label: 'Improved balance' }, { value: 'none-reported', label: 'No immediate changes reported' },
    ],
    planAddOns: [
      { value: 'hep', label: 'Home exercise program provided' }, { value: 'ice', label: 'Ice as needed' },
      { value: 'heat', label: 'Heat before exercises' }, { value: 'activity-modification', label: 'Activity modification discussed' },
    ],
    followUp: [{ value: 'as-scheduled', label: 'Next session as scheduled' }, { value: 'twice-weekly', label: '2x/week recommended' }, { value: 'one-week', label: 'Re-evaluate in 1 week' }, { value: 'prn', label: 'As needed' }],
  },

  tests: {
    enabled: true,
    label: 'Special Tests',
    items: [
      { id: 'slr', label: 'Straight Leg Raise', hasSide: true },
      { id: 'lachman', label: 'Lachman\'s Test', hasSide: true },
      { id: 'mcmurray', label: 'McMurray\'s Test', hasSide: true },
      { id: 'neer', label: 'Neer\'s Test', hasSide: true },
      { id: 'hawkins', label: 'Hawkins-Kennedy', hasSide: true },
      { id: 'empty-can', label: 'Empty Can Test', hasSide: true },
      { id: 'anterior-drawer', label: 'Anterior Drawer', hasSide: true },
      { id: 'thomas-test', label: 'Thomas Test', hasSide: true },
      { id: 'ober-test', label: 'Ober\'s Test', hasSide: true },
    ],
  },

  romAssessment: {
    enabled: true,
    regions: [
      { id: 'cervical', label: 'Cervical ROM' }, { id: 'thoracic', label: 'Thoracic ROM' },
      { id: 'lumbar', label: 'Lumbar ROM' }, { id: 'shoulder', label: 'Shoulder ROM' },
      { id: 'hip', label: 'Hip ROM' }, { id: 'knee', label: 'Knee ROM' },
    ],
    grades: [{ value: 'wnl', label: 'WNL' }, { value: 'mild', label: 'Mild decrease' }, { value: 'moderate', label: 'Moderate decrease' }, { value: 'severe', label: 'Severe decrease' }],
  },
};
