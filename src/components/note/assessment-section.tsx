'use client';

import { useConfig } from '@/hooks/use-config';

export function AssessmentSection() {
  const { config } = useConfig();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs text-[#c9a84c]/60">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="uppercase tracking-widest font-semibold">Locked — Standard Language</span>
      </div>
      <div className="p-3 rounded-lg bg-[#c9a84c]/5 border border-[#c9a84c]/10 text-sm text-muted-foreground leading-relaxed">
        {config.templates.assessmentText}
      </div>
      <p className="text-xs text-muted-foreground italic">Edit this text in Config → Templates.</p>
    </div>
  );
}
