import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space } from '../tokens';
import { Card } from '../primitives/Card';
import { Text } from '../primitives/Text';
import { NumberedHeading } from '../primitives/NumberedHeading';
import { IllustrationPlaceholder } from '../primitives/IllustrationPlaceholder';
import { Button } from '../primitives/Button';

// Reference layout (hellosunrise): white card on indigo, brand row, editorial
// numbered heading with inline emoji, full-bleed flat illustration, CTA.
export function ExampleCardScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.brandRow}>
            <View style={styles.mark} />
            <Text variant="label">storyapp</Text>
          </View>

          <NumberedHeading index={1}>Constantly sleepy 😴? Big yawns 🥱? It might all be about bedtime.</NumberedHeading>

          <View style={styles.illu}>
            <IllustrationPlaceholder color={colors.green} height={300} label="hero illustration" />
          </View>

          <Button title="Start the story" color={colors.indigo} pill style={styles.cta} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.indigo },
  content: { padding: space(5), paddingTop: space(8) },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: space(2), marginBottom: space(5) },
  mark: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: colors.ink },
  illu: { marginTop: space(6) },
  cta: { marginTop: space(6), alignSelf: 'flex-start' },
});
