'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { haptic } from '@/hooks/use-haptic';

interface PhraseListEditorProps {
  title: string;
  phrases: string[];
  onChange: (phrases: string[]) => void;
}

export function PhraseListEditor({ title, phrases, onChange }: PhraseListEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newPhrase, setNewPhrase] = useState('');

  function handleAdd() {
    if (!newPhrase.trim()) return;
    haptic('success');
    onChange([...phrases, newPhrase.trim()]);
    setNewPhrase('');
    setAdding(false);
  }

  function handleRemove(index: number) {
    haptic('light');
    onChange(phrases.filter((_, i) => i !== index));
  }

  function handleEdit(index: number, value: string) {
    const newPhrases = [...phrases];
    newPhrases[index] = value;
    onChange(newPhrases);
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
            <span className="text-[#c9a84c]/60 normal-case tracking-normal">{phrases.length} variants</span>
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
          <p className="text-xs text-muted-foreground italic">One variant is randomly selected per session day to avoid repetitive notes.</p>
          {phrases.map((phrase, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
              <span className="text-xs text-[#c9a84c]/50 mt-2 shrink-0">{i + 1}.</span>
              <textarea
                value={phrase}
                onChange={(e) => handleEdit(i, e.target.value)}
                className="flex-1 bg-transparent text-sm resize-none min-h-[2.5rem] outline-none"
                rows={2}
              />
              <button
                onClick={() => handleRemove(i)}
                className="text-destructive hover:text-destructive/80 mt-1 shrink-0"
              >
                &times;
              </button>
            </div>
          ))}

          {adding ? (
            <div className="space-y-2 p-2 rounded-md border border-[#c9a84c]/20 bg-[#c9a84c]/5">
              <textarea
                placeholder="New phrase variant..."
                value={newPhrase}
                onChange={(e) => setNewPhrase(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-background border border-input text-sm resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd} disabled={!newPhrase.trim()} className="flex-1 h-9 bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 text-xs font-semibold">
                  Add Variant
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
              + Add Variant
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
