'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { haptic } from '@/hooks/use-haptic';

interface DropdownFieldProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function DropdownField({ label, value, onChange, options, placeholder = 'Select...' }: DropdownFieldProps) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <Select value={value || ''} onValueChange={(v) => { if (!v || v.trim() === '') return; haptic('selection'); onChange(v); }}>
        <SelectTrigger className="h-12">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
