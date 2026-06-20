import { View } from 'react-native';
import { getIllustration } from '../assets/illustrations/registry';
import type { WorldId } from '../data/worlds';

// Full-bleed world backdrop. Fixed height so layout never shifts when real SVG arrives.
export function SceneBackground({
  worldId,
  height = 200,
  width,
}: {
  worldId: WorldId;
  height?: number;
  width?: number | string;
}) {
  const Illus = getIllustration(worldId);
  return (
    <View style={{ height, width: width ?? '100%', overflow: 'hidden' }}>
      <Illus width={typeof width === 'number' ? width : undefined} height={height} />
    </View>
  );
}
