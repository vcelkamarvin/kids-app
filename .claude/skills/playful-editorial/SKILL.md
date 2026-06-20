---
name: playful-editorial
description: >
  Design DNA for a playful editorial flat-illustration style (the "hellosunrise"
  look): serif display type, bold solid full-fill colors, editorial section
  numbering, inline emoji, controlled imperfection. USE THIS whenever building,
  styling, or reviewing ANY UI screen, component, layout, color, or typography
  in this project. Apply the tokens and rules exactly — never substitute framework
  defaults (no default sans on headings, no Tailwind blue-500, no soft 8-12px radius,
  no blurry shadows).
---

# Playful Editorial — Design DNA

This style is **editorial + flat + playful, but precise**. Bold serif type and
solid full-color illustration on white cards over a saturated background.
Hand-made character, not random chaos. Every "imperfection" is intentional.

Reference images live in `./references/`. Open them before styling a new screen
and match their **density, rhythm, and restraint** — not their literal content.

## Hard rules (this is where work stops looking AI-generated)

1. **Type.** Display = Fraunces (SemiBold/Bold). Body/UI = Inter.
   Headings are NEVER a default sans and NEVER Inter. Big, confident, tight leading.
2. **Color.** One surface = ONE solid color OR white. Never gradients, never
   shading inside illustrations. Use only the palette in `tokens.ts`.
3. **Editorial numbering.** Section/question titles get a small "01." prefix,
   smaller than the title, set in the display serif. (See reference 3.)
4. **Inline emoji.** Emoji go INSIDE the heading text as punctuation/rhythm,
   not as decoration floating beside it.
5. **Controlled imperfection.** Stickers/illustrations may tilt -4°..+4° (use the
   `tilt(seed)` helper so it's deterministic, never random per render). Headings
   may overflow or be cropped by the card edge. Elements may slightly overlap.
6. **Radius.** Sharp 0px OR generous 24px+ (cards use 28). Never the "safe" 8-12px.
7. **Shadow.** Hard offset sticker shadow (offset, ~0 blur) OR no shadow. Never soft blur.
8. **Whitespace.** Generous. Bold serif type needs air around it.

## ILLUSTRATION SPEC (paste into every image-gen prompt for consistency)

> Flat vector illustration, bold solid fill colors only, no gradients, no shading,
> no texture. Simple geometric shapes with clean confident outlines and slight
> hand-made imperfection. Limited palette: green #1F9E4D, yellow #F4B400,
> red #E5342B, sky blue #74C7E8, navy #1B1B6E on white. Children's-editorial
> style, friendly, calm. Centered subject, white background, generous margins.

Pipeline: generate in batches with the SAME prompt skeleton + the same style
reference each time, curate, export transparent PNG (or SVG). Drop into `assets/`.
Until real art exists, build with `<IllustrationPlaceholder />` — DO NOT block
screen layout on illustrations.

## Setup (Expo / React Native)

```bash
npx expo install @expo-google-fonts/fraunces @expo-google-fonts/inter \
  expo-font expo-haptics react-native-reanimated
```

Load fonts at the app root before rendering anything:

```tsx
import { useFonts, Fraunces_400Regular, Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

const [loaded] = useFonts({
  Fraunces_400Regular, Fraunces_600SemiBold,
  Inter_400Regular, Inter_600SemiBold, Inter_700Bold,
});
if (!loaded) return null;
```

Then use the primitives in `./primitives/` for everything. They encode the rules
above so you can't accidentally drift back to defaults.

## Consistency check (run before shipping any screen)

Scan the screen and flag any violation of the Hard rules: default font on a
heading, gradient, off-palette color, 8-12px radius, blurry shadow, emoji used as
side decoration, missing "01." on a numbered section, or a perfectly upright grid
where a sticker tilt was intended. Report each with file + line.
