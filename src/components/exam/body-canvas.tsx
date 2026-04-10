'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { haptic } from '@/hooks/use-haptic';

type Tool = 'x' | 'o' | 'draw';
type Color = '#ef4444' | '#3b82f6' | '#22c55e' | '#000000';

interface Mark {
  type: Tool;
  x: number;
  y: number;
  color: Color;
  path?: { x: number; y: number }[];
}

const COLORS: { value: Color; label: string }[] = [
  { value: '#ef4444', label: 'Red' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#22c55e', label: 'Green' },
  { value: '#000000', label: 'Black' },
];

export function BodyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const [tool, setTool] = useState<Tool>('x');
  const [color, setColor] = useState<Color>('#ef4444');
  const [marks, setMarks] = useState<Mark[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  // Canvas dimensions
  const CW = 400;
  const CH = 700;

  useEffect(() => {
    const img = new Image();
    img.onload = () => { bgImageRef.current = img; redraw([]); };
    img.src = '/body-outline.svg';
  }, []);

  const redraw = useCallback((currentMarks: Mark[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CW, CH);
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom, zoom);

    // Background
    if (bgImageRef.current) {
      const img = bgImageRef.current;
      const scale = Math.min(CW / img.naturalWidth, CH / img.naturalHeight);
      const imgW = img.naturalWidth * scale;
      const imgH = img.naturalHeight * scale;
      ctx.drawImage(img, (CW - imgW) / 2, (CH - imgH) / 2, imgW, imgH);
    }

    // Marks
    for (const mark of currentMarks) {
      ctx.strokeStyle = mark.color;
      ctx.fillStyle = mark.color;

      if (mark.type === 'x') {
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        const s = 8;
        ctx.beginPath();
        ctx.moveTo(mark.x - s, mark.y - s); ctx.lineTo(mark.x + s, mark.y + s);
        ctx.moveTo(mark.x + s, mark.y - s); ctx.lineTo(mark.x - s, mark.y + s);
        ctx.stroke();
      } else if (mark.type === 'o') {
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(mark.x, mark.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      } else if (mark.type === 'draw' && mark.path && mark.path.length > 1) {
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(mark.path[0].x, mark.path[0].y);
        for (let i = 1; i < mark.path.length; i++) ctx.lineTo(mark.path[i].x, mark.path[i].y);
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [zoom, panOffset]);

  useEffect(() => { redraw(marks); }, [marks, redraw]);

  function canvasPos(e: React.TouchEvent | React.MouseEvent): { x: number; y: number } | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CW / rect.width;
    const scaleY = CH / rect.height;
    let cx: number, cy: number;
    if ('touches' in e) {
      const t = e.touches[0] || e.changedTouches[0];
      cx = t.clientX; cy = t.clientY;
    } else {
      cx = e.clientX; cy = e.clientY;
    }
    // Account for zoom + pan
    const rawX = (cx - rect.left) * scaleX;
    const rawY = (cy - rect.top) * scaleY;
    return { x: (rawX - panOffset.x) / zoom, y: (rawY - panOffset.y) / zoom };
  }

  function handleDown(e: React.TouchEvent | React.MouseEvent) {
    const pos = canvasPos(e);
    if (!pos) return;
    if (tool === 'x' || tool === 'o') {
      haptic('light');
      setMarks(prev => [...prev, { type: tool, x: pos.x, y: pos.y, color }]);
    } else {
      setIsDrawing(true);
      setCurrentPath([pos]);
    }
  }

  function handleMove(e: React.TouchEvent | React.MouseEvent) {
    if (!isDrawing) return;
    const pos = canvasPos(e);
    if (!pos) return;
    const newPath = [...currentPath, pos];
    setCurrentPath(newPath);
    // Live preview
    redraw(marks);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && newPath.length > 1) {
      ctx.save();
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoom, zoom);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(newPath[0].x, newPath[0].y);
      for (const p of newPath) ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  function handleUp() {
    if (isDrawing && currentPath.length > 1) {
      haptic('light');
      setMarks(prev => [...prev, { type: 'draw', x: 0, y: 0, color, path: currentPath }]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  }

  function handleZoom(delta: number) {
    haptic('light');
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  }

  async function handleCopy() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    haptic('success');
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'body-markings.png'; a.click();
        URL.revokeObjectURL(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }, 'image/png');
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body Diagram</p>
        <p className="text-xs text-[#c9a84c]/60">{marks.length} marks · {Math.round(zoom * 100)}%</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1.5">
        {(['x', 'o', 'draw'] as Tool[]).map(t => (
          <button
            key={t}
            onClick={() => { haptic('light'); setTool(t); }}
            className={`flex-1 h-8 rounded-md text-xs font-bold uppercase border transition-all ${
              tool === t ? 'bg-[#c9a84c]/20 border-[#c9a84c] text-[#c9a84c]' : 'border-zinc-700 text-muted-foreground'
            }`}
          >
            {t === 'x' ? '✕' : t === 'o' ? '○' : '✎'}
          </button>
        ))}
        <div className="w-px h-5 bg-zinc-700" />
        {COLORS.map(c => (
          <button
            key={c.value}
            onClick={() => { haptic('light'); setColor(c.value); }}
            className={`w-6 h-6 rounded-full border-2 transition-all ${color === c.value ? 'border-white scale-110' : 'border-transparent'}`}
            style={{ backgroundColor: c.value }}
          />
        ))}
        <div className="w-px h-5 bg-zinc-700" />
        <button onClick={() => handleZoom(-0.25)} className="w-6 h-6 rounded border border-zinc-700 text-xs text-muted-foreground">−</button>
        <button onClick={() => handleZoom(0.25)} className="w-6 h-6 rounded border border-zinc-700 text-xs text-muted-foreground">+</button>
      </div>

      {/* Canvas */}
      <div className="relative bg-zinc-900/50 rounded-lg overflow-hidden border border-[#c9a84c]/10">
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          className="w-full h-auto touch-none"
          onMouseDown={handleDown}
          onMouseMove={handleMove}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
          onTouchStart={handleDown}
          onTouchMove={handleMove}
          onTouchEnd={handleUp}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-1.5">
        <Button onClick={() => { haptic('light'); setMarks(prev => prev.slice(0, -1)); }} variant="outline" className="flex-1 h-8 text-xs border-zinc-700" disabled={marks.length === 0}>
          Undo
        </Button>
        <Button onClick={() => { haptic('medium'); setMarks([]); setZoom(1); setPanOffset({ x: 0, y: 0 }); }} variant="outline" className="flex-1 h-8 text-xs border-zinc-700 text-destructive" disabled={marks.length === 0}>
          Clear
        </Button>
        <Button onClick={handleCopy} className="flex-1 h-8 text-xs bg-[#c9a84c] text-[#09090b] hover:bg-[#c9a84c]/90 font-semibold" disabled={marks.length === 0}>
          {copied ? '✓ Copied' : 'Copy Image'}
        </Button>
      </div>
    </div>
  );
}
