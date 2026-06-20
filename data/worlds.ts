// Illustration system data — cast + worlds + theme map.
// See ILLUSTRATIONS.md for the full production bible.

export type CharacterId = 'luna' | 'otto' | 'pip' | 'bo' | 'fern';
export type WorldId = 'forest' | 'ocean' | 'space' | 'castle' | 'meadow' | 'cozy';
export type StoryLength = 'short' | 'normal' | 'long';

export type Character = {
  id: CharacterId;
  name: string;
  emoji: string;
  description: string;
  voicePersona: string;
  color: string;
};

export type World = {
  id: WorldId;
  name: string;
  emoji: string;
  theme: string;
  color: string; // dominant background color for placeholder
};

export const CAST: Character[] = [
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🌙',
    description: 'Crescent moon',
    voicePersona: 'Calm & dreamy',
    color: '#F4B400',
  },
  {
    id: 'otto',
    name: 'Otto',
    emoji: '🐻',
    description: 'Round bear',
    voicePersona: 'Warm & cozy',
    color: '#1F9E4D',
  },
  {
    id: 'pip',
    name: 'Pip',
    emoji: '🦊',
    description: 'Small fox',
    voicePersona: 'Playful & bouncy',
    color: '#E5342B',
  },
  {
    id: 'bo',
    name: 'Bo',
    emoji: '🐰',
    description: 'Rabbit astronaut',
    voicePersona: 'Brave & adventurous',
    color: '#74C7E8',
  },
  {
    id: 'fern',
    name: 'Fern',
    emoji: '🦉',
    description: 'Owl with glasses',
    voicePersona: 'Clear & teacherly',
    color: '#1B1B6E',
  },
];

export const WORLDS: World[] = [
  { id: 'forest', name: 'Enchanted Forest', emoji: '🌲', theme: 'Adventure', color: '#1F9E4D' },
  { id: 'ocean',  name: 'Calm Ocean',       emoji: '🌊', theme: 'Goodnight', color: '#74C7E8' },
  { id: 'space',  name: 'Starry Space',     emoji: '✨', theme: 'Magical',   color: '#1B1B6E' },
  { id: 'castle', name: 'Castle on a Hill', emoji: '🏰', theme: 'Brave',     color: '#E5342B' },
  { id: 'meadow', name: 'Sunny Meadow',     emoji: '🌻', theme: 'Funny',     color: '#F4B400' },
  { id: 'cozy',   name: 'Cozy Bedroom',     emoji: '🛏',  theme: 'Bedtime',   color: '#F4EFE3' },
];

export const LENGTHS: { id: StoryLength; label: string; minutes: string }[] = [
  { id: 'short',  label: 'Short',  minutes: '~3 min' },
  { id: 'normal', label: 'Normal', minutes: '~7 min' },
  { id: 'long',   label: 'Long',   minutes: '~12 min' },
];

export function getCharacter(id: CharacterId): Character {
  return CAST.find(c => c.id === id)!;
}

export function getWorld(id: WorldId): World {
  return WORLDS.find(w => w.id === id)!;
}
