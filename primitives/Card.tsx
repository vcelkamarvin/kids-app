import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radii, space } from '../tokens';

// White editorial card on the saturated background. Generous radius, clips
// overflowing headings/illustrations at the edge (intentional crop).
export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.paper,
    borderRadius: radii.card,
    padding: space(6),
    overflow: 'hidden',
  },
});
