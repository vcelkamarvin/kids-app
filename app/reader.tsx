import { useRef, useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Text } from '../primitives/Text';
import { colors, fonts, space } from '../tokens';
import { SAMPLE_STORY, WordTiming } from '../data/sample-story';

const WARM_PAPER = colors.warmPaper;
const { height: SCREEN_H } = Dimensions.get('window');
const ILLUS_H = Math.round(SCREEN_H * 0.44);
const TICK_MS = 50;

type Sentence = { words: WordTiming[]; startIdx: number };

// Split word list into sentences at punctuation boundaries.
function toSentences(words: WordTiming[]): Sentence[] {
  const out: Sentence[] = [];
  let batch: WordTiming[] = [];
  let start = 0;
  words.forEach((w, i) => {
    batch.push(w);
    if (/[.!?,]$/.test(w.word.replace(/['"]/g, '')) || i === words.length - 1) {
      out.push({ words: [...batch], startIdx: start });
      start = i + 1;
      batch = [];
    }
  });
  return out;
}

export default function ReaderScreen() {
  const router = useRouter();
  const { words, title } = SAMPLE_STORY;
  const totalDuration = (words.at(-1)?.end ?? 60) + 1;
  const sentences = useMemo(() => toSentences(words), [words]);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const scrollRef = useRef<ScrollView>(null);
  const sentenceYs = useRef<number[]>([]);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const currentWordIdx = words.findIndex(
    w => currentTime >= w.start && currentTime < w.end,
  );

  const currentSentenceIdx = sentences.findIndex(s => {
    const last = s.startIdx + s.words.length - 1;
    return currentWordIdx >= s.startIdx && currentWordIdx <= last;
  });

  // Breathing illustration — slow sine inhale/exhale
  const breathScale = useSharedValue(1);
  useEffect(() => {
    breathScale.value = withRepeat(
      withSequence(
        withTiming(1.028, { duration: 3800, easing: Easing.inOut(Easing.sine) }),
        withTiming(1.0, { duration: 3800, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      false,
    );
  }, []);
  const breathStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathScale.value }],
  }));

  // Playback timer — 50ms tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(t => {
          const next = t + TICK_MS / 1000;
          if (next >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, TICK_MS);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, totalDuration]);

  // Auto-scroll when sentence changes
  useEffect(() => {
    const y = sentenceYs.current[currentSentenceIdx];
    if (currentSentenceIdx >= 0 && y != null) {
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 60), animated: true });
    }
  }, [currentSentenceIdx]);

  // Auto-hide controls after 3s while playing
  useEffect(() => {
    clearTimeout(hideTimer.current);
    if (isPlaying && controlsVisible) {
      hideTimer.current = setTimeout(() => setControlsVisible(false), 3000);
    }
    return () => clearTimeout(hideTimer.current);
  }, [isPlaying, controlsVisible]);

  const handleScreenTap = () => {
    setControlsVisible(v => !v);
    clearTimeout(hideTimer.current);
  };

  const togglePlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPlaying(p => !p);
  };

  return (
    <View style={styles.screen}>
      {/* Illustration — breathes slowly */}
      <Animated.View style={breathStyle}>
        <View style={[styles.illu, { height: ILLUS_H }]}>
          {/* Swap for <Image source={...}/> when real art arrives */}
          <Text style={styles.illuLabel}>story illustration</Text>
        </View>
      </Animated.View>

      {/* Text area — tapping toggles controls */}
      <Pressable style={styles.textArea} onPress={handleScreenTap}>
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.storyTitle}>{title}</Text>

          {sentences.map((sentence, si) => (
            <View
              key={si}
              style={styles.sentence}
              onLayout={e => {
                sentenceYs.current[si] = e.nativeEvent.layout.y;
              }}
            >
              {sentence.words.map((wt, wi) => {
                const globalIdx = sentence.startIdx + wi;
                const isCurrent = globalIdx === currentWordIdx;
                const isPast = globalIdx < currentWordIdx;

                return (
                  <Pressable
                    key={globalIdx}
                    onPress={() => setCurrentTime(wt.start)}
                  >
                    {isCurrent ? (
                      <View style={styles.chip}>
                        <Text style={styles.chipText}>{wt.word}</Text>
                      </View>
                    ) : (
                      <Text
                        style={[
                          styles.word,
                          isPast ? styles.wordPast : styles.wordFuture,
                        ]}
                      >
                        {wt.word}
                      </Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ))}

          <View style={styles.bottomPad} />
        </ScrollView>
      </Pressable>

      {/* Controls overlay — fade in/out on tap */}
      {controlsVisible && (
        <SafeAreaView
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}
        >
          {/* Back chevron */}
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>

          {/* Play / pause */}
          <View style={styles.playRow}>
            <Pressable style={styles.playBtn} onPress={togglePlay}>
              <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: WARM_PAPER,
  },
  illu: {
    width: '100%',
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illuLabel: {
    color: colors.paper,
    fontFamily: fonts.body,
    fontSize: 13,
    opacity: 0.6,
  },
  textArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space(6),
    paddingTop: space(5),
  },
  storyTitle: {
    fontFamily: fonts.display,
    fontSize: 17,
    lineHeight: 22,
    color: colors.inkMuted,
    marginBottom: space(5),
    letterSpacing: -0.2,
  },
  sentence: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: space(4),
    gap: 6,
  },
  word: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 44,
  },
  wordPast: {
    color: colors.ink,
  },
  wordFuture: {
    color: colors.inkMuted,
  },
  chip: {
    backgroundColor: colors.ink,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 44,
    color: WARM_PAPER,
  },
  bottomPad: {
    height: 160,
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: space(4),
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    fontFamily: fonts.display,
    fontSize: 40,
    color: colors.ink,
    lineHeight: 44,
  },
  playRow: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 0,
    shadowOffset: { width: 4, height: 6 },
    elevation: 6,
  },
  playIcon: {
    fontFamily: fonts.body,
    fontSize: 24,
    color: colors.paper,
    lineHeight: 28,
  },
});
