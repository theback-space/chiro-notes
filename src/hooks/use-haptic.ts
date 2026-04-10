// Haptic feedback for mobile devices
// Uses the Vibration API (supported on Android Chrome, some iOS browsers)
// Falls back silently on unsupported devices

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error';

const PATTERNS: Record<HapticStyle, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 40,
  selection: 8,
  success: [15, 50, 15],
  error: [30, 50, 30, 50, 30],
};

export function haptic(style: HapticStyle = 'light') {
  if (typeof navigator === 'undefined') return;
  if (!('vibrate' in navigator)) return;

  try {
    const pattern = PATTERNS[style];
    navigator.vibrate(pattern);
  } catch {
    // Silently fail — vibration not supported
  }
}
