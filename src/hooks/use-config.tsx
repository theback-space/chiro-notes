'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AppConfig, ConfigOption, Specialty } from '@/lib/config-schema';
import { CONFIG_STORAGE_KEY } from '@/lib/config-schema';
import { getDefaultConfig, DEFAULT_CONFIG } from '@/lib/default-config';
import { getPreset } from '@/data/presets';

const ConfigContext = createContext<{
  config: AppConfig;
  hasConfig: boolean; // false on first launch (no specialty selected yet)
  updateConfig: (updater: (prev: AppConfig) => AppConfig) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
  switchSpecialty: (specialty: Specialty) => void;
}>({
  config: DEFAULT_CONFIG,
  hasConfig: false,
  updateConfig: () => {},
  resetConfig: () => {},
  exportConfig: () => '',
  importConfig: () => false,
  switchSpecialty: () => {},
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [hasConfig, setHasConfig] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppConfig;
        const preset = getPreset(parsed.specialty || 'chiropractic');
        // Merge stored config with preset defaults (handles new fields)
        setConfig({
          ...preset,
          ...parsed,
          branding: { ...preset.branding, ...parsed.branding },
          matrix: { ...preset.matrix, ...parsed.matrix },
          templates: { ...preset.templates, ...parsed.templates },
          options: { ...preset.options, ...parsed.options },
        });
        setHasConfig(true);
      }
    } catch {
      // Invalid stored config
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (loaded && hasConfig) {
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
      } catch { /* localStorage full */ }
    }
  }, [config, loaded, hasConfig]);

  const updateConfig = useCallback((updater: (prev: AppConfig) => AppConfig) => {
    setConfig(prev => updater(prev));
  }, []);

  const switchSpecialty = useCallback((specialty: Specialty) => {
    const preset = getPreset(specialty);
    setConfig(preset);
    setHasConfig(true);
    try { localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(preset)); } catch {}
  }, []);

  const resetConfig = useCallback(() => {
    const preset = getPreset(config.specialty || 'chiropractic');
    setConfig(preset);
  }, [config.specialty]);

  const exportConfig = useCallback(() => JSON.stringify(config, null, 2), [config]);

  const importConfig = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as AppConfig;
      if (!parsed.version || !parsed.specialty) return false;
      setConfig(parsed);
      setHasConfig(true);
      return true;
    } catch { return false; }
  }, []);

  return (
    <ConfigContext.Provider value={{ config, hasConfig, updateConfig, resetConfig, exportConfig, importConfig, switchSpecialty }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}

export function useConfigOptions(key: keyof AppConfig['options']): ConfigOption[] {
  const { config } = useConfig();
  return config.options[key] || [];
}
