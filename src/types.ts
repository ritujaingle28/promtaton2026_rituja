export type Page = 'home' | 'chat' | 'playlist' | 'history' | 'profile';

export type MoodType = 'happy' | 'sad' | 'relaxed' | 'excited' | 'stressed' | 'focused' | 'nostalgic';

export interface Mood {
  id: MoodType;
  name: string;
  emoji: string;
  description: string;
  color: string; // Tailwind gradient or hex
  bgGlow: string;
  tagline: string;
  energyLevel: number; // 1-100
  valenceLevel: number; // 1-100
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string; // e.g., "3:42"
  durationSeconds: number;
  coverUrl: string;
  mood: MoodType;
  liked?: boolean;
  disliked?: boolean;
  genre: string;
  year?: string;
  bpm?: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  mood: MoodType;
  coverUrl: string;
  trackCount: number;
  totalDuration: string;
  aiExplanation: string;
  curator: string;
  likesCount: number;
  tags: string[];
  isSaved?: boolean;
  tracks: Track[];
  createdDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  detectedMood?: MoodType;
  recommendedPlaylist?: Playlist;
  suggestedPrompts?: string[];
}

export interface HistoryItem {
  id: string;
  date: string;
  time: string;
  mood: MoodType;
  userPrompt?: string;
  playlistRecommended: Playlist;
  tracksListened: number;
  sessionDuration: string;
}

export interface FavoriteGenre {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

export interface FavoriteArtist {
  id: string;
  name: string;
  imageUrl: string;
  genre: string;
  followers: string;
  topTrack: string;
}

export interface UserProfile {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  memberSince: string;
  listenerLevel: string;
  preferredLanguage: string;
  favoriteGenres: FavoriteGenre[];
  favoriteArtists: FavoriteArtist[];
  stats: {
    playlistsGenerated: number;
    hoursListened: number;
    moodStreakDays: number;
    topMoodThisWeek: MoodType;
  };
}
