// Design tokens — single source of truth. Import everywhere; never hardcode.

export const colors = {
  indigo: '#2E2BA6', // app background (the hellosunrise deep blue)
  paper: '#FFFFFF',  // cards / surfaces
  warmPaper: '#F4EFE3', // reader background — warm tint, easy on sleepy eyes
  ink: '#141414',    // primary text
  inkMuted: '#6B6B6B',

  // illustration / accent palette — solid fills only, no gradients
  green: '#1F9E4D',
  yellow: '#F4B400',
  red: '#E5342B',
  sky: '#74C7E8',
  navy: '#1B1B6E',
} as const;

export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayRegular: 'Fraunces_400Regular',
  body: 'Inter_400Regular',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const radii = {
  none: 0,
  card: 28, // sharp OR generous — never 8-12
  pill: 999,
} as const;

// 4px spacing base. Use space(6) etc. instead of magic numbers.
export const space = (n: number) => n * 4;

// Deterministic tilt for sticker feel. Same seed = same angle every render.
export const tilt = (seed: number) => ({
  transform: [{ rotate: `${((seed * 37) % 9) - 4}deg` }],
});
