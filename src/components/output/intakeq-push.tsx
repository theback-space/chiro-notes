'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { haptic } from '@/hooks/use-haptic';
import { useNoteState } from '@/hooks/use-note-store';
import { generateNote } from '@/lib/note-generator';

interface IntakeQPushProps {
  className?: string;
}

export function IntakeQPush({ className }: IntakeQPushProps) {
  const state = useNoteState();
  const [status, setStatus] = useState<'idle' | 'pushing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Check if IntakeQ is configured (API key exists server-side)
  // The questionnaireId and clientId would come from the UI or config
  const [clientEmail, setClientEmail] = useState('');
  const [showForm, setShowForm] = useState(false);

  async function handlePush() {
    if (!clientEmail.trim()) {
      setShowForm(true);
      return;
    }

    haptic('medium');
    setStatus('pushing');
    setErrorMsg('');

    try {
      const noteText = generateNote(state);

      // Build IntakeQ questions array
      // Each SOAP section becomes an "OpenQuestion" in IntakeQ
      const sections = noteText.split(/\n\n/).map(section => {
        const [header, ...content] = section.split('\n');
        return {
          Text: header.replace(':', ''),
          Answer: content.join('\n'),
          QuestionType: 'OpenQuestion',
          OfficeUse: true, // Mark as office-use so client doesn't see it in portal
        };
      });

      const response = await fetch('/api/intakeq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionnaireId: process.env.NEXT_PUBLIC_INTAKEQ_QUESTIONNAIRE_ID || '',
          clientEmail: clientEmail.trim(),
          questions: sections,
        }),
      });

      const data = await response.json();

      if (data.success) {
        haptic('success');
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        haptic('error');
        setStatus('error');
        setErrorMsg(data.error || 'Failed to save');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      haptic('error');
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Network error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <div className={className}>
      {showForm && status === 'idle' && (
        <div className="mb-2">
          <input
            type="email"
            placeholder="Client email (for IntakeQ lookup)"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-zinc-900 border border-zinc-700 text-sm mb-2"
          />
          <p className="text-[10px] text-muted-foreground italic mb-2">
            No email will be sent to the client. This is only used to match the IntakeQ record.
          </p>
        </div>
      )}

      <Button
        onClick={handlePush}
        disabled={status === 'pushing'}
        variant="outline"
        className={`w-full h-10 text-sm font-semibold tracking-wide border-[#c9a84c]/20 ${
          status === 'success'
            ? 'text-green-500 border-green-500/30'
            : status === 'error'
              ? 'text-destructive border-destructive/30'
              : 'text-[#c9a84c] hover:bg-[#c9a84c]/10'
        }`}
      >
        {status === 'pushing' && 'Saving to IntakeQ...'}
        {status === 'success' && '✓ Saved to IntakeQ'}
        {status === 'error' && `✗ ${errorMsg}`}
        {status === 'idle' && (
          <>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Save to IntakeQ
          </>
        )}
      </Button>
    </div>
  );
}
