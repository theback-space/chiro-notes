'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useConfig } from '@/hooks/use-config';
import { haptic } from '@/hooks/use-haptic';
import { OptionListEditor } from './option-list-editor';
import { PhraseListEditor } from './phrase-list-editor';
import { TemplateEditor } from './template-editor';
import type { AppConfig } from '@/lib/config-schema';

type SettingsTab = 'dropdowns' | 'templates' | 'spine' | 'export';

export function SettingsPanel() {
  const { config, updateConfig, resetConfig, exportConfig, importConfig } = useConfig();
  const [activeTab, setActiveTab] = useState<SettingsTab>('dropdowns');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    haptic('success');
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chironotes-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const success = importConfig(reader.result as string);
      if (success) {
        haptic('success');
        setImportStatus('Config imported successfully!');
      } else {
        haptic('error');
        setImportStatus('Invalid config file.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const DROPDOWN_SECTIONS: { key: keyof AppConfig['options']; title: string; hasExpanded?: boolean; hasNoteText?: boolean }[] = [
    { key: 'regions', title: 'Regions (Subjective)' },
    { key: 'concerns', title: 'Concerns', hasExpanded: true },
    { key: 'motionFindings', title: 'Motion Findings (Spine)', hasNoteText: true },
    { key: 'directions', title: 'Directions (Spine)', hasNoteText: true },
    { key: 'tissueFindings', title: 'Tissue Findings (Spine)', hasNoteText: true },
    { key: 'procedureRegions', title: 'Procedure Regions' },
    { key: 'techniques', title: 'Techniques', hasNoteText: true },
    { key: 'positions', title: 'Positions' },
    { key: 'rom', title: 'ROM Options' },
    { key: 'posture', title: 'Posture Observations' },
    { key: 'palpation', title: 'Palpation Findings' },
    { key: 'tolerance', title: 'Tolerance (Response)' },
    { key: 'improvements', title: 'Improvements (Response)' },
    { key: 'planAddOns', title: 'Plan Add-Ons' },
    { key: 'followUp', title: 'Follow-Up Options' },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Settings sub-tabs */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
        {([
          { key: 'dropdowns' as const, label: 'Options' },
          { key: 'templates' as const, label: 'Templates' },
          { key: 'export' as const, label: 'Import/Export' },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { haptic('light'); setActiveTab(key); }}
            className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors ${
              activeTab === key
                ? 'bg-[#c9a84c] text-[#09090b]'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dropdown Options */}
      {activeTab === 'dropdowns' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Add, remove, or reorder the dropdown options used throughout the app.</p>
          {DROPDOWN_SECTIONS.map(({ key, title, hasExpanded, hasNoteText }) => (
            <OptionListEditor
              key={key}
              title={title}
              options={config.options[key]}
              hasExpandedLabel={hasExpanded}
              hasNoteText={hasNoteText}
              onChange={(newOptions) => {
                updateConfig(prev => ({
                  ...prev,
                  options: { ...prev.options, [key]: newOptions },
                }));
              }}
            />
          ))}
        </div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Edit the locked text and phrase variations used in generated notes.</p>

          <TemplateEditor
            title="Assessment (Locked Text)"
            value={config.templates.assessmentText}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, assessmentText: v } }))}
          />
          <TemplateEditor
            title="Verbal Consent"
            value={config.templates.verbalConsent}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, verbalConsent: v } }))}
          />
          <TemplateEditor
            title="Plan — Ongoing"
            value={config.templates.planOngoing}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, planOngoing: v } }))}
          />
          <TemplateEditor
            title="Plan — New/Reactivation"
            value={config.templates.planNewReactivation}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, planNewReactivation: v } }))}
          />
          <TemplateEditor
            title="VBI Statement"
            value={config.templates.vbiStatement}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, vbiStatement: v } }))}
          />

          <PhraseListEditor
            title="Opening Phrases — Ongoing"
            phrases={config.templates.openingPhrases.ongoing}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, openingPhrases: { ...prev.templates.openingPhrases, ongoing: v } } }))}
          />
          <PhraseListEditor
            title="Opening Phrases — New"
            phrases={config.templates.openingPhrases.new}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, openingPhrases: { ...prev.templates.openingPhrases, new: v } } }))}
          />
          <PhraseListEditor
            title="Adverse Denial Phrases"
            phrases={config.templates.adverseDenialPhrases}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, adverseDenialPhrases: v } }))}
          />
          <PhraseListEditor
            title="No New Sensations Phrases"
            phrases={config.templates.noNewSensationsPhrases}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, noNewSensationsPhrases: v } }))}
          />
          <PhraseListEditor
            title="Motion Palpation Intros"
            phrases={config.templates.motionPalpationIntros}
            onChange={(v) => updateConfig(prev => ({ ...prev, templates: { ...prev.templates, motionPalpationIntros: v } }))}
          />
        </div>
      )}

      {/* Import/Export */}
      {activeTab === 'export' && (
        <div className="space-y-4">
          <Card className="border-[#c9a84c]/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs uppercase tracking-wider">Export Configuration</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-2">
              <p className="text-xs text-muted-foreground">Download your current configuration as a JSON file. Share it across devices or keep as backup.</p>
              <Button onClick={handleExport} className="w-full h-11 bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 font-semibold tracking-wide">
                Export JSON
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#c9a84c]/10">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs uppercase tracking-wider">Import Configuration</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-2">
              <p className="text-xs text-muted-foreground">Load a previously exported JSON config file.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full h-11 border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c]/10 font-semibold tracking-wide"
              >
                Import JSON
              </Button>
              {importStatus && (
                <p className={`text-xs text-center ${importStatus.includes('success') ? 'text-green-500' : 'text-destructive'}`}>
                  {importStatus}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs uppercase tracking-wider text-destructive">Reset to Defaults</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0 space-y-2">
              <p className="text-xs text-muted-foreground">Restore all settings to factory defaults. This cannot be undone.</p>
              <Button
                onClick={() => { haptic('error'); resetConfig(); }}
                variant="destructive"
                className="w-full h-11 font-semibold tracking-wide"
              >
                Reset Everything
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
