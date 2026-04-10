'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { haptic } from '@/hooks/use-haptic';
import type { ConfigOption } from '@/lib/config-schema';

interface OptionListEditorProps {
  title: string;
  options: ConfigOption[];
  hasExpandedLabel?: boolean;
  hasNoteText?: boolean;
  onChange: (options: ConfigOption[]) => void;
}

export function OptionListEditor({ title, options, hasExpandedLabel, hasNoteText, onChange }: OptionListEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newExpanded, setNewExpanded] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  function handleAdd() {
    if (!newLabel.trim()) return;
    haptic('success');
    const value = newLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newOpt: ConfigOption = { value, label: newLabel.trim() };
    if (hasExpandedLabel) newOpt.expandedLabel = newExpanded.trim() || newLabel.trim().toLowerCase();
    if (hasNoteText) newOpt.noteText = newNoteText.trim() || newLabel.trim();
    onChange([...options, newOpt]);
    setNewLabel('');
    setNewExpanded('');
    setNewNoteText('');
    setAdding(false);
  }

  function handleRemove(value: string) {
    haptic('light');
    onChange(options.filter(o => o.value !== value));
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    haptic('light');
    const newOpts = [...options];
    [newOpts[index - 1], newOpts[index]] = [newOpts[index], newOpts[index - 1]];
    onChange(newOpts);
  }

  return (
    <Card className="border-[#c9a84c]/10 overflow-hidden">
      <CardHeader
        className="py-3 px-4 cursor-pointer select-none"
        onClick={() => { haptic('light'); setIsOpen(!isOpen); }}
      >
        <CardTitle className="flex items-center justify-between text-xs uppercase tracking-wider">
          <span>{title}</span>
          <span className="flex items-center gap-2">
            <span className="text-[#c9a84c]/60 normal-case tracking-normal">{options.length} items</span>
            <svg
              className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent className="px-4 pb-4 pt-0 space-y-2">
          {options.map((opt, i) => (
            <div key={opt.value} className="flex items-center gap-2 p-2 rounded-md bg-muted/30 text-sm">
              <button
                onClick={() => handleMoveUp(i)}
                className="text-muted-foreground hover:text-foreground w-5 h-5 flex items-center justify-center"
                disabled={i === 0}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6" /></svg>
              </button>
              <div className="flex-1 min-w-0">
                <span className="font-medium">{opt.label}</span>
                {hasExpandedLabel && opt.expandedLabel && (
                  <span className="text-xs text-muted-foreground ml-2">→ {opt.expandedLabel}</span>
                )}
                {hasNoteText && opt.noteText && (
                  <span className="text-xs text-muted-foreground ml-2">→ &quot;{opt.noteText}&quot;</span>
                )}
              </div>
              <button
                onClick={() => handleRemove(opt.value)}
                className="text-destructive hover:text-destructive/80 w-5 h-5 flex items-center justify-center shrink-0"
              >
                &times;
              </button>
            </div>
          ))}

          {adding ? (
            <div className="space-y-2 p-2 rounded-md border border-[#c9a84c]/20 bg-[#c9a84c]/5">
              <input
                type="text"
                placeholder="Label (displayed in dropdown)"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
                autoFocus
              />
              {hasExpandedLabel && (
                <input
                  type="text"
                  placeholder="Expanded label (used in note text)"
                  value={newExpanded}
                  onChange={(e) => setNewExpanded(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
                />
              )}
              {hasNoteText && (
                <input
                  type="text"
                  placeholder="Note text (sentence fragment)"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
                />
              )}
              <div className="flex gap-2">
                <Button onClick={handleAdd} disabled={!newLabel.trim()} className="flex-1 h-9 bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 text-xs font-semibold">
                  Add
                </Button>
                <Button onClick={() => setAdding(false)} variant="ghost" className="h-9 text-xs">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setAdding(true)}
              variant="outline"
              className="w-full h-9 border-dashed border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c]/10 text-xs font-semibold"
            >
              + Add Option
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
