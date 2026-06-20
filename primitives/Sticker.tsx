import { View, ViewProps, StyleSheet } from 'react-native';
import { tilt } from '../tokens';

// Wrap illustrations / badges to give the sticker feel: deterministic tilt +
// a HARD offset shadow (no blur). Pass a stable `seed` per element.
export function Sticker({
  seed = 1,
  style,
  children,
  ...props
}: ViewProps & { seed?: number }) {
  return (
    <View style={[styles.shadow, tilt(seed), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 0, // hard edge — sticker, not soft material blur
    shadowOffset: { width: 4, height: 6 },
    elevation: 6,
  },
});
