import { useState } from 'react';
import { View } from 'react-native';
import { getIllustration } from '../assets/illustrations/registry';
import type { WorldId } from '../data/worlds';

// Full-bleed world backdrop. Measures its own width so the SVG fills edge-to-edge.
export function SceneBackground({
  worldId,
  height = 200,
}: {
  worldId: WorldId;
  height?: number;
}) {
  const [measuredWidth, setMeasuredWidth] = useState<number>(0);
  const Illus = getIllustration(worldId);

  return (
    <View
      style={{ height, width: '100%', overflow: 'hidden' }}
      onLayout={e => setMeasuredWidth(e.nativeEvent.layout.width)}
    >
      {measuredWidth > 0 && <Illus width={measuredWidth} height={height} />}
    </View>
  );
}
