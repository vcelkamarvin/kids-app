// Illustration registry — single source of truth for art assets.
// Characters: square (1:1). Worlds: landscape 16:9 (width × 0.5625).
// Usage:
//   const Illus = getIllustration('otto');
//   <Illus width={120} height={120} />

import type { CharacterId, WorldId } from '../../data/worlds';
import React from 'react';
import { View } from 'react-native';

import { Luna } from './svg/luna';
import { Otto } from './svg/otto';
import { Pip } from './svg/pip';
import { Bo } from './svg/bo';
import { Fern } from './svg/fern';
import { Forest } from './svg/forest';
import { Ocean } from './svg/ocean';
import { Space } from './svg/space';
import { Castle } from './svg/castle';
import { Meadow } from './svg/meadow';
import { Cozy } from './svg/cozy';

export type IllustrationId = CharacterId | WorldId;
type IllusProps = { width?: number; height?: number; style?: object };

// Wrap a character SVG (square, uses size prop) into the { width, height } interface
function charWrapper(Comp: React.ComponentType<{ size?: number }>) {
  return function CharIllus({ width, height, style }: IllusProps) {
    const size = width ?? height ?? 96;
    return (
      <View style={style}>
        <Comp size={size} />
      </View>
    );
  };
}

// Wrap a world SVG (16:9, uses size prop = width) into the { width, height } interface
function worldWrapper(Comp: React.ComponentType<{ size?: number }>) {
  return function WorldIllus({ width, height, style }: IllusProps) {
    // If height is given but not width, derive width from the 16:9 ratio
    const size = width ?? (height ? height / 0.5625 : 320);
    return (
      <View style={style}>
        <Comp size={size} />
      </View>
    );
  };
}

const illustrations: Record<IllustrationId, React.ComponentType<IllusProps>> = {
  luna:   charWrapper(Luna),
  otto:   charWrapper(Otto),
  pip:    charWrapper(Pip),
  bo:     charWrapper(Bo),
  fern:   charWrapper(Fern),
  forest: worldWrapper(Forest),
  ocean:  worldWrapper(Ocean),
  space:  worldWrapper(Space),
  castle: worldWrapper(Castle),
  meadow: worldWrapper(Meadow),
  cozy:   worldWrapper(Cozy),
};

export function getIllustration(id: IllustrationId): React.ComponentType<IllusProps> {
  return illustrations[id];
}
