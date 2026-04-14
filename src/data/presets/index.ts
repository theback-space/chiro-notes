import type { AppConfig, Specialty } from '@/lib/config-schema';
import { CHIROPRACTIC_PRESET } from './chiropractic';
import { MASSAGE_PRESET } from './massage';
import { ACUPUNCTURE_PRESET } from './acupuncture';
import { PT_PRESET } from './physical-therapy';
import { MENTAL_HEALTH_PRESET } from './mental-health';

export const PRESETS: Record<Specialty, AppConfig> = {
  chiropractic: CHIROPRACTIC_PRESET,
  massage: MASSAGE_PRESET,
  acupuncture: ACUPUNCTURE_PRESET,
  pt: PT_PRESET,
  'mental-health': MENTAL_HEALTH_PRESET,
};

export const SPECIALTY_INFO: { key: Specialty; name: string; description: string; icon: string }[] = [
  { key: 'chiropractic', name: 'Chiropractic', description: 'Spine matrix, palpation findings, adjustment techniques', icon: '🦴' },
  { key: 'massage', name: 'Massage Therapy', description: 'Muscle groups, soft tissue findings, massage techniques', icon: '💆' },
  { key: 'acupuncture', name: 'Acupuncture / TCM', description: 'Meridian points, TCM patterns, needling techniques', icon: '📍' },
  { key: 'pt', name: 'Physical Therapy', description: 'Functional regions, impairment findings, exercises', icon: '🏃' },
  { key: 'mental-health', name: 'Mental Health', description: 'DAP notes, symptom checklists, interventions', icon: '🧠' },
];

export function getPreset(specialty: Specialty): AppConfig {
  return PRESETS[specialty] || CHIROPRACTIC_PRESET;
}
