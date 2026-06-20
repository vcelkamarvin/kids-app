# Illustrations & Characters — production bible

Read this before generating any art or building any illustration component.
Style is governed by the `playful-editorial` skill (flat, solid fills, hellosunrise look).

## Architecture — two fixed layers, no live generation

We do NOT generate story scenes on the fly. Personalized stories = infinite scenes, but
art is finite and COMPOSITIONAL:

1. **Brand cast** — 5 reusable characters (also the narrators).
2. **Scene worlds** — 6 flat backgrounds, one per theme.

A scene = one world background + (optionally) one character placed on it. Looks bespoke,
stays 100% consistent, costs nothing per story. Generate everything ONCE in Recraft.
Later, real per-scene art can be wired via fal.ai/Recraft behind the same illustration slot
interface — no layout change required.

In code: every illustration renders through a registry (`assets/illustrations/registry.ts`)
that returns the real SVG if present, else a colored placeholder. Swapping real art = drop an
SVG into `assets/illustrations/svg/<id>.tsx`. Nothing else changes.

## Character design rules (flat, hellosunrise)

- Solid fill shapes only. NO gradients, NO shading, NO texture.
- Built from simple geometric shapes. Minimal thin-line detail allowed (like the red veins in
  the hellosunrise ref).
- Face: two dot eyes + a small gentle mouth. Friendly, calm, never scary (kids 2–9).
- 2–3 palette colors per character. Centered, full body, plain background, generous margin.
- Consistent proportions across the cast (same head-to-body ratio, same eye style).

## The cast (5)

| id    | name | character            | role / voice persona        | primary color        |
|-------|------|----------------------|-----------------------------|----------------------|
| luna  | Luna | crescent moon, sleepy eyes | app mascot / loading / host | yellow #F4B400 on indigo |
| otto  | Otto | round bear           | Goodnight — warm, calm      | green #1F9E4D        |
| pip   | Pip  | small fox            | Funny — playful, bouncy     | red #E5342B          |
| bo    | Bo   | rabbit astronaut     | Brave / Adventure           | sky #74C7E8          |
| fern  | Fern | owl with glasses     | Learning — clear, teacherly | green #1F9E4D + navy |

## The worlds (6) — theme → background

| id      | world           | theme it serves   | dominant color   |
|---------|-----------------|-------------------|------------------|
| forest  | forest at dusk  | Adventure         | green            |
| ocean   | calm ocean      | Goodnight         | sky              |
| space   | starry space    | Magical           | navy / indigo    |
| castle  | castle on a hill| Brave             | red / yellow     |
| meadow  | sunny meadow    | Funny             | yellow           |
| cozy    | cozy bedroom    | default / bedtime | warm paper       |

## Recraft recipe

1. Create a custom **style** from one reference (upload the hellosunrise ref + the rules above),
   or pick a flat-vector style and lock it. Reuse this style for EVERY asset so the set matches.
2. Generate each asset with the matching skeleton below — change only the bracketed subject.
3. Export as **SVG** (vector, infinite scale). Drop into `assets/illustrations/svg/<id>.tsx`
   via react-native-svg. Generate in batches, curate the best, regenerate misfits.

### Character prompt skeleton (paste, swap the bracket)

> Flat vector illustration of [Otto, a round friendly bear], children's-book style. Bold solid
> fill colors ONLY from this palette: green #1F9E4D, yellow #F4B400, red #E5342B, sky blue
> #74C7E8, navy #1B1B6E. No gradients, no shading, no texture. Simple geometric shapes, minimal
> thin-line detail. Two dot eyes and a small gentle smile. Calm and friendly. Full body,
> centered, plain white background, generous margin.

### World/background prompt skeleton

> Flat vector illustration of [a calm forest at dusk], same flat children's-book style. Bold
> solid fill colors from the palette above. No gradients, no shading. Simple bold shapes, wide
> composition, NO characters — a clean backdrop a character can be placed on top of.

## Asset manifest — generate all of these once

Characters (full body, transparent or white bg):
- [ ] luna  — crescent moon, sleepy half-closed eyes
- [ ] otto  — round bear
- [ ] pip   — small fox
- [ ] bo    — rabbit in a simple space helmet
- [ ] fern  — owl with round glasses

Worlds (wide backdrops, no characters):
- [ ] forest — trees, dusk
- [ ] ocean  — calm water + horizon
- [ ] space  — stars + a planet
- [ ] castle — castle on a hill
- [ ] meadow — hills + sun + flowers
- [ ] cozy   — bedroom with a window + bed

Supporting (small, optional but high polish):
- [ ] app mark — the asterisk/sparkle used in the brand row
- [ ] 2–3 mid-story "choice" objects (e.g. a friendly dragon, a key, a star)
- [ ] empty-state illustration for the Library

Total: ~16 core assets. One Recraft session, one locked style.
