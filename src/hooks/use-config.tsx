'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AppConfig, ConfigOption } from '@/lib/config-schema';
import { CONFIG_STORAGE_KEY } from '@/lib/config-schema';
import { DEFAULT_CONFIG } from '@/lib/default-config';

const ConfigContext = createContext<{
  config: AppConfig;
  updateConfig: (updater: (prev: AppConfig) => AppConfig) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
}>({
  config: DEFAULT_CONFIG,
  updateConfig: () => {},
  resetConfig: () => {},
  exportConfig: () => '',
  importConfig: () => false,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AppConfig;
        // Merge with defaults to handle new fields added in updates
        setConfig({ ...DEFAULT_CONFIG, ...parsed, options: { ...DEFAULT_CONFIG.options, ...parsed.options }, templates: { ...DEFAULT_CONFIG.templates, ...parsed.templates } });
      }
    } catch {
      // Invalid stored config — use defaults
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
      } catch {
        // localStorage full or unavailable
      }
    }
  }, [config, loaded]);

  const updateConfig = useCallback((updater: (prev: AppConfig) => AppConfig) => {
    setConfig(prev => updater(prev));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  }, []);

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfig = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json) as AppConfig;
      if (!parsed.version || !parsed.options || !parsed.templates) {
        return false;
      }
      setConfig({ ...DEFAULT_CONFIG, ...parsed, options: { ...DEFAULT_CONFIG.options, ...parsed.options }, templates: { ...DEFAULT_CONFIG.templates, ...parsed.templates } });
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, exportConfig, importConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}

// ─── Helper: get options from config by key ──────────────────────────────────
export function useConfigOptions(key: keyof AppConfig['options']): ConfigOption[] {
  const { config } = useConfig();
  return config.options[key] || [];
}
