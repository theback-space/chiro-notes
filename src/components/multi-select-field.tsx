'use client';

import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { haptic } from '@/hooks/use-haptic';

interface MultiSelectFieldProps {
  label: string;
  selected: string[];
  onChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function MultiSelectField({ label, selected, onChange, options, placeholder = 'Add...' }: MultiSelectFieldProps) {
  const cleanSelected = selected.filter(v => v && v.trim() !== '');
  const available = options.filter(o => !cleanSelected.includes(o.value));

  function handleAdd(value: string) {
    if (!value || value.trim() === '') return;
    haptic('selection');
    onChange([...selected, value]);
  }

  function handleRemove(value: string) {
    haptic('light');
    onChange(selected.filter(v => v !== value));
  }

  function getLabel(value: string) {
    return options.find(o => o.value === value)?.label || value;
  }

  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      {cleanSelected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {cleanSelected.map(v => (
            <Badge key={v} variant="secondary" className="gap-1 text-xs py-0.5">
              {getLabel(v)}
              <button
                onClick={() => handleRemove(v)}
                className="ml-0.5 hover:text-destructive"
                aria-label={`Remove ${getLabel(v)}`}
              >
                &times;
              </button>
            </Badge>
          ))}
        </div>
      )}
      {available.length > 0 && (
        <Select value="" onValueChange={handleAdd}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {available.map(o => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
