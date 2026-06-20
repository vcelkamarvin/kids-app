import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, radii } from '../tokens';

// Build screens NOW with this. Swap for a real <Image>/<Svg> later — keep the
// same size/position so layout doesn't shift. This is how you avoid blocking
// the whole build on illustration assets.
export function IllustrationPlaceholder({
  color = colors.green,
  height = 280,
  label = 'illustration',
}: {
  color?: string;
  height?: number;
  label?: string;
}) {
  return (
    <View style={[styles.box, { backgroundColor: color, height }]}>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: '100%', borderRadius: radii.card, alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.paper, opacity: 0.85 },
});
