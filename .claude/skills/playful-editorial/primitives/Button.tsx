import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from './Text';
import { colors, radii, space } from '../tokens';

// Solid full-color button. Pill or sharp. Light haptic on press — cheap premium
// signal almost no RN apps bother with.
export function Button({
  title,
  color = colors.ink,
  textColor = colors.paper,
  pill = true,
  onPress,
  ...props
}: PressableProps & {
  title: string;
  color?: string;
  textColor?: string;
  pill?: boolean;
}) {
  return (
    <Pressable
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: color, borderRadius: pill ? radii.pill : radii.none },
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <View>
        <Text variant="label" style={[styles.text, { color: textColor }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: space(4), paddingHorizontal: space(6), alignItems: 'center' },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.95 },
  text: { fontSize: 15, letterSpacing: 0.5 },
});
