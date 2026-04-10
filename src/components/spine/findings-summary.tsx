'use client';

import { Badge } from '@/components/ui/badge';
import { getVertebraById, REGION_COLORS } from '@/data/spine-regions';
import type { VertebraFinding } from '@/lib/types';

interface FindingsSummaryProps {
  findings: Record<string, VertebraFinding[]>;
  onSelect: (id: string) => void;
}

export function FindingsSummary({ findings, onSelect }: FindingsSummaryProps) {
  const entries = Object.entries(findings).filter(([, f]) => f.length > 0);

  if (entries.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        Tap a vertebra above to add findings
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5 px-2 py-3">
      {entries.map(([id, f]) => {
        const v = getVertebraById(id);
        if (!v) return null;
        return (
          <Badge
            key={id}
            variant="outline"
            className="cursor-pointer hover:bg-accent transition-colors text-xs py-1 px-2"
            style={{ borderColor: '#c9a84c', color: '#c9a84c' }}
            onClick={() => onSelect(id)}
          >
            {v.shortLabel} ({f.length})
          </Badge>
        );
      })}
    </div>
  );
}
