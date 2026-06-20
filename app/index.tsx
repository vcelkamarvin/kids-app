import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, fonts, space, radii } from '../tokens';
import { Text } from '../primitives/Text';
import { Card } from '../primitives/Card';
import { SceneBackground } from '../primitives/SceneBackground';
import { Character } from '../primitives/Character';
import { getLastUnfinished, MOCK_LIBRARY } from '../data/stories';
import { getCharacter, getWorld } from '../data/worlds';

export default function HomeScreen() {
  const router = useRouter();
  const tonight = getLastUnfinished();
  const recent = MOCK_LIBRARY.slice(0, 3);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand row */}
        <View style={styles.brandRow}>
          <View style={styles.mark}>
            <Text style={styles.markGlyph}>✳</Text>
          </View>
          <Text style={styles.wordmark}>storyapp</Text>
        </View>

        {/* Tonight card — continue last unfinished story */}
        {tonight && (
          <Pressable onPress={() => router.push('/reader')}>
            <Card style={styles.tonightCard}>
              <SceneBackground worldId={tonight.worldId} height={180} />
              <View style={styles.tonightContent}>
                <View style={styles.tonightMeta}>
                  <Character id={tonight.characterId} size={48} />
                  <View style={styles.tonightText}>
                    <Text style={styles.tonightLabel}>Continue tonight</Text>
                    <Text style={styles.tonightTitle}>{tonight.title}</Text>
                  </View>
                </View>
                {/* Progress bar */}
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${(tonight.progress ?? 0) * 100}%` as any }]} />
                </View>
              </View>
            </Card>
          </Pressable>
        )}

        {/* New story — the primary CTA */}
        <Pressable style={styles.newStoryBtn} onPress={() => router.push('/create')}>
          <Text style={styles.newStoryText}>New story →</Text>
        </Pressable>

        {/* Library peek */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionNum}>02.</Text>
          <Text style={styles.sectionTitle}>Recent stories</Text>
        </View>

        {recent.map((story, i) => {
          const world = getWorld(story.worldId);
          const char = getCharacter(story.characterId);
          return (
            <Pressable key={story.id} onPress={() => router.push('/reader')}>
              <Card style={styles.libraryCard}>
                <View style={styles.libraryRow}>
                  <View style={[styles.libraryThumb, { backgroundColor: world.color }]}>
                    <Character id={story.characterId} size={36} />
                  </View>
                  <View style={styles.libraryInfo}>
                    <Text style={styles.libraryIndex}>{String(i + 1).padStart(2, '0')}.</Text>
                    <Text style={styles.libraryTitle}>{story.title}</Text>
                    <Text style={styles.libraryMeta}>{char.name} · {world.theme}</Text>
                  </View>
                  {story.progress === 1 && (
                    <View style={styles.doneBadge}>
                      <Text style={styles.doneBadgeText}>Done</Text>
                    </View>
                  )}
                </View>
              </Card>
            </Pressable>
          );
        })}

        <Pressable style={styles.libraryLink} onPress={() => router.push('/library')}>
          <Text style={styles.libraryLinkText}>See all stories →</Text>
        </Pressable>

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
    paddingTop: space(6),
    gap: space(3),
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(2),
    marginBottom: space(3),
  },
  mark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markGlyph: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.paper,
  },
  wordmark: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    letterSpacing: 0.5,
    color: colors.paper,
  },
  tonightCard: {
    padding: 0,
    overflow: 'hidden',
  },
  tonightContent: {
    padding: space(4),
    gap: space(3),
  },
  tonightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(3),
  },
  tonightText: {
    flex: 1,
  },
  tonightLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkMuted,
    letterSpacing: 0.5,
    marginBottom: space(1),
  },
  tonightTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    color: colors.ink,
  },
  progressTrack: {
    height: 3,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.ink,
    borderRadius: 2,
  },
  newStoryBtn: {
    backgroundColor: colors.yellow,
    borderRadius: radii.pill,
    paddingVertical: space(5),
    paddingHorizontal: space(8),
    alignItems: 'center',
    // Hard offset shadow — sticker style, per the skill
    shadowColor: colors.paper,
    shadowOpacity: 0.5,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 4 },
  },
  newStoryText: {
    fontFamily: fonts.display,
    fontSize: 22,
    color: colors.ink,
    lineHeight: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space(2),
    marginTop: space(3),
  },
  sectionNum: {
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.paper,
    opacity: 0.5,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.paper,
  },
  libraryCard: {
    padding: space(3),
  },
  libraryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(3),
  },
  libraryThumb: {
    width: 52,
    height: 52,
    borderRadius: radii.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  libraryInfo: {
    flex: 1,
  },
  libraryIndex: {
    fontFamily: fonts.display,
    fontSize: 11,
    color: colors.inkMuted,
    marginBottom: 2,
  },
  libraryTitle: {
    fontFamily: fonts.display,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
  },
  libraryMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkMuted,
    marginTop: 2,
  },
  doneBadge: {
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingHorizontal: space(2),
    paddingVertical: space(1),
  },
  doneBadgeText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: colors.paper,
    letterSpacing: 0.5,
  },
  libraryLink: {
    alignItems: 'center',
    paddingVertical: space(2),
  },
  libraryLinkText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.paper,
    opacity: 0.6,
  },
});
