import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, fonts } from '../tokens';

type Variant = 'hero' | 'display' | 'title' | 'body' | 'caption' | 'label';

export function Text({
  variant = 'body',
  style,
  ...props
}: TextProps & { variant?: Variant }) {
  return <RNText style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  // Fraunces serif on everything heading-level. Tight leading, confident size.
  hero: { fontFamily: fonts.display, fontSize: 44, lineHeight: 46, color: colors.ink },
  display: { fontFamily: fonts.display, fontSize: 34, lineHeight: 38, color: colors.ink },
  title: { fontFamily: fonts.display, fontSize: 24, lineHeight: 28, color: colors.ink },

  // Inter for body / UI text.
  body: { fontFamily: fonts.body, fontSize: 17, lineHeight: 26, color: colors.ink },
  caption: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18, color: colors.inkMuted },
  label: { fontFamily: fonts.bodySemibold, fontSize: 13, letterSpacing: 0.5, color: colors.ink },
});
