import { View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, space, radii } from '../tokens';
import { Text } from '../primitives/Text';
import { Card } from '../primitives/Card';

// Narrator / Voice screen. Recording flow is stubbed — wired to ElevenLabs voice clone later.
export default function VoiceScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.heading}>
          <Text style={styles.headingNum}>03.</Text>
          <Text style={styles.headingTitle}>Your own voice</Text>
        </View>
        <Text style={styles.sub}>
          Record 3 minutes of yourself reading aloud. We'll use it every night — your child
          hears their parent's voice even when you can't be there.
        </Text>

        {/* Steps */}
        {[
          { n: '01', label: 'Read the sample text aloud', done: false },
          { n: '02', label: 'We process it (takes ~30 sec)', done: false },
          { n: '03', label: 'Your voice is ready forever', done: false },
        ].map(step => (
          <Card key={step.n} style={styles.stepCard}>
            <Text style={styles.stepNum}>{step.n}.</Text>
            <Text style={styles.stepLabel}>{step.label}</Text>
          </Card>
        ))}

        <Pressable style={styles.recordBtn}>
          <Text style={styles.recordIcon}>🎙</Text>
          <Text style={styles.recordText}>Start recording</Text>
        </Pressable>
        <Text style={styles.hint}>Coming soon — we'll notify you when ready.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.indigo },
  content: { flex: 1, paddingHorizontal: space(5), paddingTop: space(4), gap: space(4) },
  header: { marginBottom: space(2) },
  backBtn: { width: 44, height: 44, justifyContent: 'center' },
  backChevron: { fontFamily: fonts.display, fontSize: 34, color: colors.paper, lineHeight: 38 },
  heading: { flexDirection: 'row', alignItems: 'baseline', gap: space(2) },
  headingNum: { fontFamily: fonts.display, fontSize: 14, color: colors.paper, opacity: 0.5 },
  headingTitle: { fontFamily: fonts.display, fontSize: 30, color: colors.paper, lineHeight: 34 },
  sub: { fontFamily: fonts.body, fontSize: 16, color: colors.paper, opacity: 0.75, lineHeight: 24 },
  stepCard: { flexDirection: 'row', alignItems: 'flex-start', gap: space(3), padding: space(4) },
  stepNum: { fontFamily: fonts.display, fontSize: 14, color: colors.inkMuted, marginTop: 2 },
  stepLabel: { fontFamily: fonts.display, fontSize: 17, color: colors.ink, flex: 1, lineHeight: 22 },
  recordBtn: {
    backgroundColor: colors.red,
    borderRadius: radii.pill,
    paddingVertical: space(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space(2),
    marginTop: space(4),
  },
  recordIcon: { fontFamily: fonts.body, fontSize: 22 },
  recordText: { fontFamily: fonts.display, fontSize: 20, color: colors.paper },
  hint: { fontFamily: fonts.body, fontSize: 13, color: colors.paper, opacity: 0.4, textAlign: 'center' },
});
