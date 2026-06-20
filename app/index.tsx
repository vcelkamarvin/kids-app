import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space, fonts } from '../tokens';
import { Card } from '../primitives/Card';
import { Text } from '../primitives/Text';
import { NumberedHeading } from '../primitives/NumberedHeading';
import { IllustrationPlaceholder } from '../primitives/IllustrationPlaceholder';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          {/* Brand row — asterisk mark + app name */}
          <View style={styles.brandRow}>
            <View style={styles.mark}>
              <Text style={styles.markGlyph}>✳</Text>
            </View>
            <Text variant="label">storyapp</Text>
          </View>

          {/* Editorial numbered heading with inline emoji — matches ref exactly */}
          <NumberedHeading index={1}>
            Constantly drowsy 〰? Weight gain? 🕐 Heart condition? It could all be about sleep.
          </NumberedHeading>

          {/* Flat illustration — swap in real SVG/PNG when ready */}
          <View style={styles.illu}>
            <IllustrationPlaceholder color={colors.green} height={320} label="body + brain illustration" />
          </View>

          {/* CTA */}
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Start the story →</Text>
          </Pressable>
        </Card>

        {/* Second teaser card */}
        <Card style={styles.secondCard}>
          <NumberedHeading index={2}>
            What actually happens while you sleep? 🌙
          </NumberedHeading>
          <View style={styles.illu}>
            <IllustrationPlaceholder color={colors.sky} height={200} label="sleep cycle illustration" />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.indigo,
  },
  content: {
    padding: space(5),
    paddingTop: space(8),
    gap: space(4),
    paddingBottom: space(12),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(2),
    marginBottom: space(5),
  },
  mark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markGlyph: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
  },
  illu: {
    marginTop: space(6),
  },
  cta: {
    marginTop: space(6),
    alignSelf: 'flex-start',
    backgroundColor: colors.indigo,
    paddingVertical: space(4),
    paddingHorizontal: space(6),
    borderRadius: 999,
  },
  ctaText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.paper,
    letterSpacing: 0.3,
  },
  secondCard: {
    marginTop: space(2),
  },
});
