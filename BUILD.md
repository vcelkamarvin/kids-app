# Bedtime story app — build kickoff

## Product
English-first mobile app that generates personalized AI bedtime stories for kids 2–9 and
narrates them aloud. A parent sets up a child profile once; each night a fresh story is
generated and read. THE SIGNATURE EXPERIENCE: story text scrolls in sync with the narration,
one word highlighted at a time (karaoke style, like the Founders podcast app) — this doubles
as early-reading support. Calm, magical, beautiful. We are aiming for an Apple Design Award:
depth and polish over feature count.

## Principles (hard rules)
- NO gamification. No XP, points, streaks, badges, or levels. Deliberately simple.
- Polish and consistency over breadth. Few screens, each one perfect.
- Apply the `playful-editorial` skill in .claude/skills for ALL styling: Fraunces display,
  Inter body, solid palette, editorial "01." numbering, controlled tilt, hard offset shadows,
  generous whitespace. Never framework defaults (no system font on headings, no gradients,
  no soft 8–12px radius, no blurry shadows).
- TypeScript always. Expo Router. Small components. When I say "build X", build it — no
  clarifying questions.

## Core features (v1 scope — nothing beyond this)
- Create story: pick child profile + world/theme + length + narrator (big tappable cards)
- Reader: the signature word-synced narration screen (BUILD THIS FIRST, to award quality)
- Mid-story choice: one decision point, two illustrated buttons; choice continues the story
- Voice: choose a narrator, or "use your own voice" (parent voice clone) — UI now, wiring later
- Library: saved stories, continue where you left off

## Stack
Expo SDK 52 (RN), Expo Router, TypeScript, Supabase (auth/db/storage), Claude API for
generation (JSON: {title, body, scenes[]}), ElevenLabs TTS WITH word/character timestamps,
RevenueCat for subscriptions, Zustand for state, react-native-reanimated for motion,
expo-haptics.

## Aesthetic
Bright editorial throughout, per the skill (light, never dark). ONE bedtime adjustment: in the
Reader use a WARM paper background (#F4EFE3), never pure white, and add an optional auto-dim
toggle so we're not blasting a bright screen at a sleepy kid. Everywhere else: full brightness.

## Illustrations
Flat solid-color illustrations, generated later via Recraft using the ILLUSTRATION SPEC in the
skill. For NOW, build everything with <IllustrationPlaceholder/>. Keep illustration slots a
fixed size so swapping in real art later never shifts the layout.

## THE READER — signature spec (this is the soul of the app)
Full-screen. Warm paper background. A calm full-bleed illustration fills the top ~45%; the
synced text sits below.
- Text in Fraunces, large (~34px / lineHeight ~42), 2–4 lines visible at once.
- Word-level karaoke highlight: the CURRENT word renders in an inverted chip (ink background,
  paper-colored text, 4px radius); already-read words are full ink; upcoming words are dimmed
  (inkMuted).
- Auto-scroll keeps the current line vertically centered; smooth, driven by Reanimated.
- Timing comes from a words array: [{ word, start, end }] in seconds. For NOW, MOCK this with a
  local JSON for one sample story so the screen runs with no API. Wire ElevenLabs timestamps
  later behind the exact same interface.
- Controls: one large play/pause and a back chevron, nothing else (tap the screen to toggle
  controls). No scrubber clutter.
- Tapping a word seeks the audio to that word (nice-to-have).
- One subtle ambient motion (e.g. the illustration breathes slowly). 200ms eases, light haptic
  on play/pause.

## First task — do ONLY this, then stop for review
1. Scaffold the Expo app; wire the Fraunces + Inter fonts and the skill's tokens + primitives.
2. Build the Reader screen to award quality using a mocked sample story + mocked word timings +
   an IllustrationPlaceholder. Use Reanimated for the highlight and auto-scroll. Make it feel
   finished, not a draft.
Stop after the Reader. I will review before we build anything else.
