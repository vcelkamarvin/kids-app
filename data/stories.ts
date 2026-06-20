import type { CharacterId, WorldId, StoryLength } from './worlds';

export type Story = {
  id: string;
  title: string;
  worldId: WorldId;
  characterId: CharacterId;
  length: StoryLength;
  createdAt: string; // ISO date
  progress?: number; // 0–1, undefined = not started
};

// Mock library — replace with Supabase fetch later.
export const MOCK_LIBRARY: Story[] = [
  {
    id: 'milo-001',
    title: 'The Star Who Could Not Sleep',
    worldId: 'space',
    characterId: 'luna',
    length: 'short',
    createdAt: '2026-06-19T21:30:00Z',
    progress: 0.6,
  },
  {
    id: 'otto-forest-002',
    title: 'Otto and the Talking Tree',
    worldId: 'forest',
    characterId: 'otto',
    length: 'normal',
    createdAt: '2026-06-18T20:15:00Z',
    progress: 1,
  },
  {
    id: 'bo-castle-003',
    title: 'Bo Finds the Golden Key',
    worldId: 'castle',
    characterId: 'bo',
    length: 'long',
    createdAt: '2026-06-17T21:00:00Z',
  },
  {
    id: 'pip-meadow-004',
    title: "Pip's Very Silly Day",
    worldId: 'meadow',
    characterId: 'pip',
    length: 'short',
    createdAt: '2026-06-16T20:45:00Z',
    progress: 1,
  },
  {
    id: 'fern-ocean-005',
    title: 'Fern and the Deep Blue Song',
    worldId: 'ocean',
    characterId: 'fern',
    length: 'normal',
    createdAt: '2026-06-15T21:10:00Z',
  },
];

// The most recent story with partial progress = "continue tonight" candidate.
export function getLastUnfinished(): Story | undefined {
  return MOCK_LIBRARY.find(s => s.progress !== undefined && s.progress < 1);
}
