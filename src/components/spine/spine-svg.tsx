'use client';

import { VERTEBRAE } from '@/data/spine-regions';
import { haptic } from '@/hooks/use-haptic';
import type { VertebraFinding } from '@/lib/types';

interface SpineSvgProps {
  findings: Record<string, VertebraFinding[]>;
  selectedVertebra: string | null;
  onSelect: (id: string) => void;
}

// Gold brand colors
const GOLD = '#c9a84c';
const GOLD_DARK = '#91702a';
const GOLD_DIM = 'rgba(201, 168, 76, 0.15)';
const GOLD_GLOW = 'rgba(201, 168, 76, 0.4)';

// Natural S-curve offsets (cervical lordosis, thoracic kyphosis, lumbar lordosis)
function getCurveOffset(id: string): number {
  const curveMap: Record<string, number> = {
    'occiput': 0,
    'C1': 2, 'C2': 3, 'C3': 4, 'C4': 4.5, 'C5': 4, 'C6': 3, 'C7': 1.5,
    'T1': 0, 'T2': -1.5, 'T3': -3, 'T4': -4, 'T5': -4.5, 'T6': -5,
    'T7': -5, 'T8': -4.5, 'T9': -4, 'T10': -3, 'T11': -2, 'T12': -1,
    'L1': 0, 'L2': 2, 'L3': 3.5, 'L4': 4, 'L5': 3,
    'sacrum': 0, 'coccyx': -2,
  };
  return curveMap[id] || 0;
}

export function SpineSvg({ findings, selectedVertebra, onSelect }: SpineSvgProps) {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 220 540"
        className="w-full max-w-[280px] h-auto touch-manipulation select-none"
        role="img"
        aria-label="Interactive spine diagram"
      >
        <defs>
          {/* Gold glow filter for selected vertebrae */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={GOLD} floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Subtle gradient for vertebral bodies */}
          <linearGradient id="vertebraGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.7" />
            <stop offset="100%" stopColor={GOLD_DARK} stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Spinal cord column (subtle center line with S-curve) */}
        <path
          d={`M 110,25 C 114,70 114,100 112,145 C 108,200 105,240 105,280 C 105,320 108,350 110,360 C 114,390 114,420 112,440 L 110,500`}
          fill="none"
          stroke={GOLD_DIM}
          strokeWidth="1.5"
        />

        {/* Region divider lines */}
        <line x1="60" y1="155" x2="160" y2="155" stroke={GOLD_DIM} strokeWidth="0.5" strokeDasharray="2,3" />
        <line x1="55" y1="348" x2="165" y2="348" stroke={GOLD_DIM} strokeWidth="0.5" strokeDasharray="2,3" />
        <line x1="55" y1="445" x2="165" y2="445" stroke={GOLD_DIM} strokeWidth="0.5" strokeDasharray="2,3" />

        {/* Region labels */}
        <text x="18" y="100" fill={GOLD_DARK} fontSize="7" fontWeight="600" letterSpacing="0.1em" opacity="0.6" style={{ fontFamily: 'inherit' }}>CERVICAL</text>
        <text x="18" y="260" fill={GOLD_DARK} fontSize="7" fontWeight="600" letterSpacing="0.1em" opacity="0.6" style={{ fontFamily: 'inherit' }}>THORACIC</text>
        <text x="18" y="400" fill={GOLD_DARK} fontSize="7" fontWeight="600" letterSpacing="0.1em" opacity="0.6" style={{ fontFamily: 'inherit' }}>LUMBAR</text>
        <text x="18" y="470" fill={GOLD_DARK} fontSize="7" fontWeight="600" letterSpacing="0.1em" opacity="0.6" style={{ fontFamily: 'inherit' }}>SACRAL</text>

        {/* Vertebrae */}
        {VERTEBRAE.map((v) => {
          const hasFindings = (findings[v.id]?.length || 0) > 0;
          const isSelected = selectedVertebra === v.id;
          const findingCount = findings[v.id]?.length || 0;
          const curveX = getCurveOffset(v.id);
          const cx = v.svgCenter.x + curveX;
          const cy = v.svgCenter.y;
          const halfW = v.svgSize.width / 2;
          const halfH = v.svgSize.height / 2;

          // Skip extras from main vertebra rendering — they get special shapes
          const isExtra = v.region === 'extra';
          const isSacral = v.id === 'sacrum' || v.id === 'coccyx';

          return (
            <g
              key={v.id}
              onClick={() => { haptic('medium'); onSelect(v.id); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); haptic('medium'); onSelect(v.id); } }}
              role="button"
              tabIndex={0}
              aria-label={`${v.label}${hasFindings ? `, ${findingCount} finding${findingCount > 1 ? 's' : ''}` : ''}`}
              className="cursor-pointer outline-none"
              style={{ outline: 'none' }}
              filter={isSelected ? 'url(#goldGlow)' : undefined}
            >
              {/* Invisible expanded touch target (44px minimum) */}
              <rect
                x={cx - 22}
                y={cy - 11}
                width={44}
                height={22}
                fill="transparent"
                stroke="none"
              />

              {/* Vertebra body — anatomical trapezoid shape */}
              {!isExtra && !isSacral && (
                <>
                  {/* Main body with slight trapezoid shape */}
                  <path
                    d={`M ${cx - halfW + 1},${cy - halfH}
                        L ${cx + halfW - 1},${cy - halfH}
                        L ${cx + halfW},${cy + halfH}
                        L ${cx - halfW},${cy + halfH} Z`}
                    fill={hasFindings ? 'url(#goldGrad)' : 'url(#vertebraGrad)'}
                    stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isSelected ? 1.5 : 0.6}
                    rx={2}
                  />
                  {/* Spinous process (small bump on posterior) */}
                  <line
                    x1={cx}
                    y1={cy - halfH}
                    x2={cx}
                    y2={cy - halfH - 3}
                    stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.08)'}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  {/* Transverse processes */}
                  <line
                    x1={cx - halfW}
                    y1={cy}
                    x2={cx - halfW - 5}
                    y2={cy - 1}
                    stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.08)'}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1={cx + halfW}
                    y1={cy}
                    x2={cx + halfW + 5}
                    y2={cy - 1}
                    stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.08)'}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Sacrum — wider triangular shape */}
              {v.id === 'sacrum' && (
                <path
                  d={`M ${cx - 26},${cy - 12} L ${cx + 26},${cy - 12} L ${cx + 14},${cy + 12} L ${cx - 14},${cy + 12} Z`}
                  fill={hasFindings ? 'url(#goldGrad)' : 'url(#vertebraGrad)'}
                  stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isSelected ? 1.5 : 0.6}
                />
              )}

              {/* Coccyx — small triangle */}
              {v.id === 'coccyx' && (
                <path
                  d={`M ${cx - 8},${cy - 6} L ${cx + 8},${cy - 6} L ${cx},${cy + 8} Z`}
                  fill={hasFindings ? 'url(#goldGrad)' : 'url(#vertebraGrad)'}
                  stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isSelected ? 1.5 : 0.6}
                />
              )}

              {/* Extra regions (SI joints, pelvis, ribs) — circles/ovals */}
              {isExtra && (
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx={v.svgSize.width / 2}
                  ry={v.svgSize.height / 2}
                  fill={hasFindings ? 'url(#goldGrad)' : 'url(#vertebraGrad)'}
                  stroke={hasFindings ? GOLD : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isSelected ? 1.5 : 0.6}
                />
              )}

              {/* Label to the right */}
              <text
                x={cx + halfW + 12}
                y={cy + 3}
                fill={hasFindings ? GOLD : 'rgba(255,255,255,0.35)'}
                fontSize="7"
                fontWeight={hasFindings ? '600' : '400'}
                letterSpacing="0.05em"
                style={{ fontFamily: 'inherit' }}
              >
                {v.shortLabel}
              </text>

              {/* Finding count badge */}
              {hasFindings && (
                <>
                  <circle
                    cx={cx - halfW - 10}
                    cy={cy}
                    r="7"
                    fill={GOLD}
                  />
                  <text
                    x={cx - halfW - 10}
                    y={cy + 3}
                    fill="#09090b"
                    fontSize="8"
                    fontWeight="700"
                    textAnchor="middle"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {findingCount}
                  </text>
                </>
              )}

              {/* Selection pulse */}
              {isSelected && (
                <rect
                  x={cx - halfW - 3}
                  y={cy - halfH - 3}
                  width={v.svgSize.width + 6}
                  height={v.svgSize.height + 6}
                  rx={4}
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="1"
                >
                  <animate
                    attributeName="opacity"
                    values="0.7;0.2;0.7"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </rect>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
