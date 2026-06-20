import { useState } from 'react';
import { View, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, fonts, space, radii } from '../tokens';
import { Text } from '../primitives/Text';

// Mid-story choice screen. Narration pauses here; two illustrated cards slide up.
// The branch logic (continuing the story) is mocked — wired to Claude generation later.

const { width: SCREEN_W } = Dimensions.get('window');

const CHOICES = [
  {
    id: 'a',
    emoji: '🐉',
    label: 'Make friends with the dragon',
    color: colors.green,
  },
  {
    id: 'b',
    emoji: '✈️',
    label: 'Fly on to find the hidden castle',
    color: colors.sky,
  },
];

export default function ChoiceScreen() {
  const router = useRouter();
  const [chosen, setChosen] = useState<string | null>(null);

  function pick(id: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setChosen(id);
    setTimeout(() => router.push('/reader'), 800);
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* Narration pause header */}
      <View style={styles.top}>
        <View style={styles.pauseBadge}>
          <Text style={styles.pauseText}>Story paused</Text>
        </View>
        <Text style={styles.question}>What happens next?</Text>
        <Text style={styles.sub}>Tap a card to continue the story your way.</Text>
      </View>

      {/* Choice cards */}
      <View style={styles.cards}>
        {CHOICES.map(choice => {
          const selected = chosen === choice.id;
          return (
            <Pressable
              key={choice.id}
              style={[
                styles.choiceCard,
                { backgroundColor: choice.color },
                selected && styles.choiceCardSelected,
                chosen && chosen !== choice.id && styles.choiceCardDimmed,
              ]}
              onPress={() => pick(choice.id)}
              disabled={chosen != null}
            >
              <Text style={styles.choiceEmoji}>{choice.emoji}</Text>
              <Text style={styles.choiceLabel}>{choice.label}</Text>
              {selected && <Text style={styles.selectedMark}>✓</Text>}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.warmPaper,
    justifyContent: 'space-between',
    paddingBottom: space(10),
  },
  top: {
    paddingHorizontal: space(6),
    paddingTop: space(8),
    gap: space(3),
  },
  pauseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingHorizontal: space(3),
    paddingVertical: space(1),
    marginBottom: space(2),
  },
  pauseText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.warmPaper,
    letterSpacing: 0.5,
  },
  question: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 40,
    color: colors.ink,
  },
  sub: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkMuted,
    lineHeight: 22,
  },
  cards: {
    paddingHorizontal: space(5),
    gap: space(3),
  },
  choiceCard: {
    borderRadius: radii.card,
    padding: space(6),
    gap: space(3),
    // Hard offset shadow — sticker feel per the skill
    shadowColor: colors.ink,
    shadowOpacity: 0.15,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 6 },
    elevation: 6,
  },
  choiceCardSelected: {
    borderWidth: 3,
    borderColor: colors.ink,
  },
  choiceCardDimmed: {
    opacity: 0.4,
  },
  choiceEmoji: {
    fontFamily: fonts.body,
    fontSize: 52,
    lineHeight: 60,
  },
  choiceLabel: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink,
  },
  selectedMark: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    alignSelf: 'flex-end',
  },
});
