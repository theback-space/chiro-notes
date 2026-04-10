'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TemplateEditorProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

export function TemplateEditor({ title, value, onChange }: TemplateEditorProps) {
  return (
    <Card className="border-[#c9a84c]/10">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-xs uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-muted/30 border border-input text-sm resize-none leading-relaxed"
          rows={4}
        />
      </CardContent>
    </Card>
  );
}
