'use client';

import { SPECIALTY_INFO } from '@/data/presets';
import { haptic } from '@/hooks/use-haptic';
import type { Specialty } from '@/lib/config-schema';

interface SpecialtySelectorProps {
  onSelect: (specialty: Specialty) => void;
}

export function SpecialtySelector({ onSelect }: SpecialtySelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 py-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Logo area */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold tracking-[0.3em] uppercase text-[#c9a84c]">NOTESPACE</h1>
          <p className="text-sm text-muted-foreground">Clinical Documentation Engine</p>
        </div>

        {/* Specialty cards */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Choose Your Specialty</p>
          {SPECIALTY_INFO.map(({ key, name, description, icon }) => (
            <button
              key={key}
              onClick={() => { haptic('medium'); onSelect(key); }}
              className="w-full p-4 rounded-xl border border-[#c9a84c]/15 bg-[#18181b] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all text-left active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#c9a84c]">{name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#c9a84c]/40">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-center text-muted-foreground">
          You can change your specialty anytime in Config. All options are fully customizable.
        </p>
      </div>
    </div>
  );
}
