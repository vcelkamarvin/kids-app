import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { space } from '../tokens';

// Editorial "01." prefix + heading on one block. The number is smaller than the
// title and set in the same serif — the signature hellosunrise detail.
export function NumberedHeading({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const n = String(index).padStart(2, '0');
  return (
    <View style={styles.row}>
      <Text variant="title" style={styles.num}>
        {n}.
      </Text>
      <Text variant="display" style={styles.heading}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  num: { marginRight: space(2), marginTop: space(1) },
  heading: { flex: 1 },
});
