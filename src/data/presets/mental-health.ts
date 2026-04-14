import type { AppConfig } from '@/lib/config-schema';
import { CONFIG_VERSION } from '@/lib/config-schema';

export const MENTAL_HEALTH_PRESET: AppConfig = {
  version: CONFIG_VERSION,
  specialty: 'mental-health',
  noteFormat: 'dap',

  branding: { studioName: 'My Practice', headerText: 'THERAPY NOTES', appName: 'TherapyNotes' },

  matrix: {
    enabled: false, // Mental health doesn't use a body/palpation matrix
    label: '',
    bilateral: false,
    findingTypes: [],
    regions: [],
  },

  symptomChecklists: {
    label: 'Clinical Presentation',
    categories: [
      { name: 'Mood', options: ['Depressed', 'Anxious', 'Irritable', 'Flat', 'Elevated', 'Labile', 'Appropriate', 'Euthymic'], multiSelect: true },
      { name: 'Affect', options: ['Congruent', 'Incongruent', 'Restricted', 'Blunted', 'Bright', 'Tearful', 'Flat'], multiSelect: true },
      { name: 'Thought Process', options: ['Logical', 'Tangential', 'Circumstantial', 'Racing', 'Perseverative', 'Goal-directed', 'Disorganized'], multiSelect: true },
      { name: 'Appearance', options: ['Well-groomed', 'Disheveled', 'Appropriate', 'Fatigued', 'Agitated', 'Calm', 'Cooperative'], multiSelect: true },
      { name: 'Risk Assessment', options: ['SI: None', 'SI: Passive', 'SI: Active with plan', 'HI: None', 'HI: Passive', 'HI: Active', 'SH: None', 'SH: Current'], multiSelect: true },
      { name: 'Functioning', options: ['Sleep impaired', 'Appetite changes', 'Low energy', 'Poor concentration', 'Social withdrawal', 'Occupational difficulty', 'Functioning adequate', 'Functioning improved'], multiSelect: true },
    ],
  },

  sections: [
    { key: 'data', letter: 'D', title: 'Data' },
    { key: 'assessment', letter: 'A', title: 'Assessment' },
    { key: 'plan', letter: 'P', title: 'Plan' },
  ],

  templates: {
    assessmentText: 'Client presents with symptoms consistent with reported concerns. Clinical presentation is consistent with previous session.',
    consentLine: 'Informed consent for counseling services on file.',
    planOngoing: 'Continue weekly sessions to address identified treatment goals.',
    planNew: 'Recommend weekly sessions to establish therapeutic rapport and address presenting concerns.',
    openingPhrases: {
      ongoing: ['Client presents for scheduled counseling session.', 'Client returns for ongoing therapy session.', 'Client is here for regular counseling appointment.'],
      new: ['Client presents for initial counseling session.', 'New client presents for intake and initial session.'],
      reactivation: ['Client returns for counseling after a break in services.', 'Client resumes therapy sessions.'],
    },
    adverseDenialPhrases: ['Client denies any adverse effects since last session.', 'No adverse events reported since last session.'],
    noNewSensationsPhrases: ['No new safety concerns reported.', 'Client reports stability since last session.'],
    tolerancePhrases: {
      well: ['Client engaged appropriately in session.', 'Session was productive and well-tolerated.'],
      withoutIncident: ['Session completed without incident.', 'Client participated in session without adverse response.'],
    },
    objectiveIntros: ['Clinical presentation includes', 'Mental status examination reveals', 'Client presents with'],
    vbiStatement: '',
  },

  options: {
    regions: [
      { value: 'mood', label: 'Mood/Affect' }, { value: 'anxiety', label: 'Anxiety' },
      { value: 'trauma', label: 'Trauma' }, { value: 'relationships', label: 'Relationships' },
      { value: 'self-esteem', label: 'Self-esteem' }, { value: 'grief', label: 'Grief/Loss' },
      { value: 'stress', label: 'Stress Management' }, { value: 'coping', label: 'Coping Skills' },
    ],
    concerns: [
      { value: 'depression', label: 'Depression', expandedLabel: 'depressive symptoms' },
      { value: 'anxiety', label: 'Anxiety', expandedLabel: 'anxiety symptoms' },
      { value: 'stress', label: 'Stress', expandedLabel: 'stress and overwhelm' },
      { value: 'grief', label: 'Grief', expandedLabel: 'grief and loss' },
      { value: 'trauma', label: 'Trauma', expandedLabel: 'trauma-related symptoms' },
      { value: 'relationships', label: 'Relationship issues', expandedLabel: 'interpersonal difficulties' },
      { value: 'self-esteem', label: 'Self-esteem', expandedLabel: 'low self-esteem' },
      { value: 'sleep', label: 'Sleep issues', expandedLabel: 'sleep disturbance' },
      { value: 'anger', label: 'Anger', expandedLabel: 'anger management' },
      { value: 'life-transitions', label: 'Life transitions', expandedLabel: 'adjustment to life changes' },
    ],
    procedureRegions: [], // Not used in mental health
    techniques: [], // Not used — replaced by interventions
    positions: [],
    interventions: [
      { value: 'cbt', label: 'CBT', noteText: 'Cognitive Behavioral Therapy techniques' },
      { value: 'dbt', label: 'DBT', noteText: 'Dialectical Behavior Therapy skills' },
      { value: 'mi', label: 'Motivational Interviewing', noteText: 'motivational interviewing' },
      { value: 'psychoeducation', label: 'Psychoeducation', noteText: 'psychoeducation' },
      { value: 'supportive', label: 'Supportive Counseling', noteText: 'supportive counseling' },
      { value: 'mindfulness', label: 'Mindfulness', noteText: 'mindfulness-based interventions' },
      { value: 'emdr', label: 'EMDR', noteText: 'EMDR processing' },
      { value: 'solution-focused', label: 'Solution-Focused', noteText: 'solution-focused brief therapy' },
      { value: 'narrative', label: 'Narrative Therapy', noteText: 'narrative therapy techniques' },
      { value: 'art-therapy', label: 'Art/Expressive', noteText: 'expressive arts therapy' },
    ],
    rom: [],
    posture: [],
    palpation: [],
    tolerance: [{ value: 'engaged', label: 'Client engaged appropriately' }, { value: 'productive', label: 'Session was productive' }],
    improvements: [
      { value: 'increased-insight', label: 'Increased insight' }, { value: 'improved-coping', label: 'Improved coping strategies' },
      { value: 'reduced-symptoms', label: 'Reduced symptom intensity' }, { value: 'improved-mood', label: 'Improved mood' },
      { value: 'increased-awareness', label: 'Increased self-awareness' }, { value: 'none-reported', label: 'Progress ongoing' },
    ],
    planAddOns: [
      { value: 'journaling', label: 'Journaling homework assigned' }, { value: 'coping-skills', label: 'Coping skills practice discussed' },
      { value: 'grounding', label: 'Grounding exercises reviewed' }, { value: 'referral', label: 'Referral discussed' },
      { value: 'crisis-plan', label: 'Safety/crisis plan reviewed' }, { value: 'medication', label: 'Medication compliance discussed' },
    ],
    followUp: [{ value: 'weekly', label: 'Continue weekly' }, { value: 'biweekly', label: 'Move to biweekly' }, { value: 'monthly', label: 'Move to monthly' }, { value: 'prn', label: 'As needed' }],
  },

  tests: { enabled: false, label: '', items: [] },
  romAssessment: { enabled: false, regions: [], grades: [] },
};
