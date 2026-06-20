import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, space, radii } from '../tokens';
import { Text } from '../primitives/Text';
import { MOCK_LIBRARY } from '../data/stories';
import { getCharacter, getWorld } from '../data/worlds';

export default function LibraryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>
          <View style={styles.heading}>
            <Text style={styles.headingNum}>01.</Text>
            <Text style={styles.headingTitle}>Your stories</Text>
          </View>
        </View>

        {/* Story grid — editorial cards */}
        {MOCK_LIBRARY.map((story, i) => {
          const world = getWorld(story.worldId);
          const char = getCharacter(story.characterId);
          const isFinished = story.progress === 1;
          const hasProgress = story.progress != null && story.progress > 0 && !isFinished;

          return (
            <Pressable
              key={story.id}
              style={styles.storyCard}
              onPress={() => router.push('/reader')}
            >
              {/* Scene cover */}
              <View style={[styles.cover, { backgroundColor: world.color }]}>
                <Text style={styles.coverEmoji}>{world.emoji}</Text>
                <Text style={styles.coverCharEmoji}>{char.emoji}</Text>
              </View>

              {/* Card content */}
              <View style={styles.cardBody}>
                <Text style={styles.cardIndex}>{String(i + 1).padStart(2, '0')}.</Text>
                <Text style={styles.cardTitle}>{story.title}</Text>
                <Text style={styles.cardMeta}>{char.name} · {world.theme}</Text>

                {/* Status */}
                <View style={styles.statusRow}>
                  {isFinished ? (
                    <View style={[styles.badge, { backgroundColor: colors.green }]}>
                      <Text style={styles.badgeText}>Finished</Text>
                    </View>
                  ) : hasProgress ? (
                    <>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${(story.progress ?? 0) * 100}%` as any }]} />
                      </View>
                      <Text style={styles.progressLabel}>{Math.round((story.progress ?? 0) * 100)}%</Text>
                    </>
                  ) : (
                    <View style={[styles.badge, { backgroundColor: '#E8E8E8' }]}>
                      <Text style={[styles.badgeText, { color: colors.inkMuted }]}>Not started</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}

        {MOCK_LIBRARY.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📖</Text>
            <Text style={styles.emptyText}>No stories yet.{'\n'}Start a new one tonight.</Text>
            <Pressable style={styles.emptyBtn} onPress={() => router.push('/create')}>
              <Text style={styles.emptyBtnText}>New story →</Text>
            </Pressable>
          </View>
        )}

        <View style={{ height: space(10) }} />
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
    paddingHorizontal: space(5),
    paddingTop: space(4),
    gap: space(3),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(3),
    marginBottom: space(4),
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
  heading: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space(2),
  },
  headingNum: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.paper,
    opacity: 0.5,
  },
  headingTitle: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.paper,
    lineHeight: 32,
  },
  storyCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.card,
    overflow: 'hidden',
  },
  cover: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: space(5),
    paddingBottom: space(3),
  },
  coverEmoji: {
    fontFamily: fonts.body,
    fontSize: 52,
    lineHeight: 60,
  },
  coverCharEmoji: {
    fontFamily: fonts.body,
    fontSize: 36,
    lineHeight: 44,
    opacity: 0.85,
  },
  cardBody: {
    padding: space(4),
    gap: 4,
  },
  cardIndex: {
    fontFamily: fonts.display,
    fontSize: 12,
    color: colors.inkMuted,
  },
  cardTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    color: colors.ink,
  },
  cardMeta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkMuted,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(2),
    marginTop: space(2),
  },
  badge: {
    borderRadius: radii.pill,
    paddingHorizontal: space(3),
    paddingVertical: space(1),
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.paper,
    letterSpacing: 0.3,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.ink,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkMuted,
  },
  empty: {
    alignItems: 'center',
    paddingTop: space(16),
    gap: space(4),
  },
  emptyEmoji: {
    fontFamily: fonts.body,
    fontSize: 64,
  },
  emptyText: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.paper,
    textAlign: 'center',
    lineHeight: 28,
  },
  emptyBtn: {
    backgroundColor: colors.yellow,
    borderRadius: radii.pill,
    paddingVertical: space(4),
    paddingHorizontal: space(8),
  },
  emptyBtnText: {
    fontFamily: fonts.display,
    fontSize: 18,
    color: colors.ink,
  },
});
