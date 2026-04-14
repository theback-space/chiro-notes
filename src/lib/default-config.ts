import type { AppConfig, Specialty } from './config-schema';
import { getPreset } from '@/data/presets';

// Default is chiropractic, but changes based on specialty selection
export function getDefaultConfig(specialty: Specialty = 'chiropractic'): AppConfig {
  return getPreset(specialty);
}

export const DEFAULT_CONFIG: AppConfig = getPreset('chiropractic');
