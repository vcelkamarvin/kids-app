// Illustration registry — single source of truth for art assets.
// Drop a real SVG component into ./svg/<id>.tsx and it auto-activates.
// Everything else stays on IllustrationPlaceholder with the correct palette color.
// No layout shift when real art arrives — sizes are fixed at the call site.
//
// Usage:
//   import { getIllustration } from '@/assets/illustrations/registry';
//   const Illus = getIllustration('otto');
//   <Illus width={120} height={140} />

import type { CharacterId, WorldId } from '../../data/worlds';
import { CAST, WORLDS } from '../../data/worlds';
import { IllustrationPlaceholder } from '../../primitives/IllustrationPlaceholder';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../primitives/Text';
import { fonts } from '../../tokens';

export type IllustrationId = CharacterId | WorldId;

type IllusProps = { width?: number; height?: number; style?: object };

// Real SVG components live here. Uncomment and import as you add them.
// const SVGs: Partial<Record<IllustrationId, React.ComponentType<IllusProps>>> = {
//   otto: require('./svg/otto').default,
//   forest: require('./svg/forest').default,
// };

const SVGs: Partial<Record<IllustrationId, React.ComponentType<IllusProps>>> = {};

function colorFor(id: IllustrationId): string {
  const char = CAST.find(c => c.id === id);
  if (char) return char.color;
  const world = WORLDS.find(w => w.id === id);
  if (world) return world.color;
  return '#cccccc';
}

function emojiFor(id: IllustrationId): string {
  const char = CAST.find(c => c.id === id);
  if (char) return char.emoji;
  const world = WORLDS.find(w => w.id === id);
  if (world) return world.emoji;
  return '🎨';
}

// Returns a component sized at the call site. Falls back to emoji placeholder.
export function getIllustration(id: IllustrationId): React.ComponentType<IllusProps> {
  const Real = SVGs[id];
  if (Real) return Real;

  const color = colorFor(id);
  const emoji = emojiFor(id);

  return function Placeholder({ width, height, style }: IllusProps) {
    return (
      <View
        style={[
          { width, height, backgroundColor: color, alignItems: 'center', justifyContent: 'center' },
          style,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  emoji: {
    fontFamily: fonts.body,
    fontSize: 48,
    lineHeight: 56,
  },
});
