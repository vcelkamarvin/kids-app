import { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { colors, fonts, space, radii } from '../tokens';
import { Text } from '../primitives/Text';
import { WORLDS, CAST, LENGTHS } from '../data/worlds';
import type { WorldId, CharacterId, StoryLength } from '../data/worlds';

const { width: SCREEN_W } = Dimensions.get('window');

type Step = 'world' | 'narrator' | 'length';
const STEPS: Step[] = ['world', 'narrator', 'length'];
const STEP_LABELS = ['01. World', '02. Narrator', '03. Length'];

export default function CreateScreen() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('world');
  const [worldId, setWorldId] = useState<WorldId | null>(null);
  const [characterId, setCharacterId] = useState<CharacterId | null>(null);
  const [length, setLength] = useState<StoryLength | null>(null);

  const stepIdx = STEPS.indexOf(step);

  const tap = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  function next() {
    tap();
    if (step === 'world') setStep('narrator');
    else if (step === 'narrator') setStep('length');
  }

  function back() {
    tap();
    if (step === 'narrator') setStep('world');
    else if (step === 'length') setStep('narrator');
    else router.back();
  }

  function start() {
    tap();
    router.push('/reader');
  }

  const canProgress =
    (step === 'world' && worldId != null) ||
    (step === 'narrator' && characterId != null) ||
    (step === 'length' && length != null);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={back}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>

        {/* Step dots */}
        <View style={styles.stepDots}>
          {STEPS.map((s, i) => (
            <View
              key={s}
              style={[styles.dot, i === stepIdx && styles.dotActive, i < stepIdx && styles.dotDone]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Step heading */}
        <Text style={styles.stepLabel}>{STEP_LABELS[stepIdx]}</Text>

        {/* Step: World */}
        {step === 'world' && (
          <>
            <Text style={styles.stepQuestion}>Where does the story happen?</Text>
            <View style={styles.worldGrid}>
              {WORLDS.map(world => {
                const selected = worldId === world.id;
                return (
                  <Pressable
                    key={world.id}
                    style={[styles.worldCard, selected && styles.worldCardSelected]}
                    onPress={() => { tap(); setWorldId(world.id); }}
                  >
                    <View style={[styles.worldThumb, { backgroundColor: world.color }]}>
                      <Text style={styles.worldEmoji}>{world.emoji}</Text>
                    </View>
                    <Text style={styles.worldName}>{world.name}</Text>
                    <Text style={styles.worldTheme}>{world.theme}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {/* Step: Narrator */}
        {step === 'narrator' && (
          <>
            <Text style={styles.stepQuestion}>Who tells the story?</Text>
            <View style={styles.narratorList}>
              {CAST.map(char => {
                const selected = characterId === char.id;
                return (
                  <Pressable
                    key={char.id}
                    style={[styles.narratorCard, selected && styles.narratorCardSelected]}
                    onPress={() => { tap(); setCharacterId(char.id); }}
                  >
                    <View style={[styles.narratorAvatar, { backgroundColor: char.color }]}>
                      <Text style={styles.narratorEmoji}>{char.emoji}</Text>
                    </View>
                    <View style={styles.narratorInfo}>
                      <Text style={styles.narratorName}>{char.name}</Text>
                      <Text style={styles.narratorVoice}>{char.voicePersona}</Text>
                    </View>
                    {selected && <View style={styles.checkMark}><Text style={styles.checkText}>✓</Text></View>}
                  </Pressable>
                );
              })}

              {/* Own voice option */}
              <Pressable style={styles.ownVoiceCard} onPress={() => router.push('/voice')}>
                <View style={styles.narratorAvatar}>
                  <Text style={styles.narratorEmoji}>🎙</Text>
                </View>
                <View style={styles.narratorInfo}>
                  <Text style={styles.narratorName}>Your own voice</Text>
                  <Text style={styles.narratorVoice}>Record once, use every night</Text>
                </View>
                <Text style={styles.arrowText}>→</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* Step: Length */}
        {step === 'length' && (
          <>
            <Text style={styles.stepQuestion}>How long tonight?</Text>
            <View style={styles.lengthList}>
              {LENGTHS.map(l => {
                const selected = length === l.id;
                return (
                  <Pressable
                    key={l.id}
                    style={[styles.lengthCard, selected && styles.lengthCardSelected]}
                    onPress={() => { tap(); setLength(l.id); }}
                  >
                    <Text style={[styles.lengthLabel, selected && styles.lengthLabelSelected]}>
                      {l.label}
                    </Text>
                    <Text style={[styles.lengthMins, selected && styles.lengthMinsSelected]}>
                      {l.minutes}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        <View style={{ height: space(16) }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.ctaRow}>
        {step === 'length' ? (
          <Pressable
            style={[styles.cta, !canProgress && styles.ctaDisabled]}
            disabled={!canProgress}
            onPress={start}
          >
            <Text style={styles.ctaText}>Start the story →</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.cta, !canProgress && styles.ctaDisabled]}
            disabled={!canProgress}
            onPress={next}
          >
            <Text style={styles.ctaText}>Next →</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.indigo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space(5),
    paddingTop: space(2),
    paddingBottom: space(3),
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.paper,
    lineHeight: 38,
  },
  stepDots: {
    flexDirection: 'row',
    gap: space(2),
    marginLeft: 'auto',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.paper,
    opacity: 0.25,
  },
  dotActive: {
    opacity: 1,
    width: 20,
    borderRadius: 4,
  },
  dotDone: {
    opacity: 0.5,
  },
  content: {
    paddingHorizontal: space(5),
    paddingTop: space(2),
  },
  stepLabel: {
    fontFamily: fonts.display,
    fontSize: 13,
    color: colors.paper,
    opacity: 0.5,
    letterSpacing: 0.3,
    marginBottom: space(2),
  },
  stepQuestion: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    color: colors.paper,
    marginBottom: space(6),
  },
  // World grid
  worldGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space(3),
  },
  worldCard: {
    width: (SCREEN_W - space(10) - space(3)) / 2,
    backgroundColor: colors.paper,
    borderRadius: radii.card,
    overflow: 'hidden',
  },
  worldCardSelected: {
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  worldThumb: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  worldEmoji: {
    fontFamily: fonts.body,
    fontSize: 44,
  },
  worldName: {
    fontFamily: fonts.display,
    fontSize: 15,
    color: colors.ink,
    paddingHorizontal: space(3),
    paddingTop: space(3),
    lineHeight: 20,
  },
  worldTheme: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkMuted,
    paddingHorizontal: space(3),
    paddingBottom: space(3),
    marginTop: 2,
  },
  // Narrator list
  narratorList: {
    gap: space(2),
  },
  narratorCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.card,
    padding: space(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(3),
  },
  narratorCardSelected: {
    borderWidth: 3,
    borderColor: colors.yellow,
  },
  narratorAvatar: {
    width: 52,
    height: 52,
    borderRadius: radii.card,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  narratorEmoji: {
    fontFamily: fonts.body,
    fontSize: 26,
  },
  narratorInfo: {
    flex: 1,
  },
  narratorName: {
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.ink,
    lineHeight: 21,
  },
  narratorVoice: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkMuted,
    marginTop: 2,
  },
  checkMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.paper,
  },
  arrowText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 18,
    color: colors.inkMuted,
  },
  ownVoiceCard: {
    backgroundColor: 'transparent',
    borderRadius: radii.card,
    borderWidth: 1.5,
    borderColor: colors.paper,
    borderStyle: 'dashed',
    padding: space(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(3),
    opacity: 0.7,
  },
  // Length
  lengthList: {
    gap: space(3),
  },
  lengthCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.card,
    paddingVertical: space(6),
    paddingHorizontal: space(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lengthCardSelected: {
    backgroundColor: colors.yellow,
  },
  lengthLabel: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.ink,
  },
  lengthLabelSelected: {
    color: colors.ink,
  },
  lengthMins: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkMuted,
  },
  lengthMinsSelected: {
    color: colors.ink,
    opacity: 0.7,
  },
  // CTA
  ctaRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: space(5),
    paddingBottom: space(8),
    backgroundColor: colors.indigo,
  },
  cta: {
    backgroundColor: colors.paper,
    borderRadius: radii.pill,
    paddingVertical: space(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 0,
    shadowOffset: { width: 2, height: 4 },
  },
  ctaDisabled: {
    opacity: 0.35,
  },
  ctaText: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    lineHeight: 24,
  },
});
