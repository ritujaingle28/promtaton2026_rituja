import React, { useState } from 'react';
import { Page, Playlist, UserProfile } from '../types';
import { MOCK_USER_PROFILE, MOCK_PLAYLISTS } from '../mockData';
import {
  User,
  Sparkles,
  Headphones,
  Clock,
  Flame,
  Globe,
  Heart,
  Music2,
  Award,
  Play,
  CheckCircle2,
  Settings,
  ChevronRight
} from 'lucide-react';

interface ProfileProps {
  setCurrentPage: (page: Page) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  savedPlaylists: Playlist[];
}

export const Profile: React.FC<ProfileProps> = ({
  setCurrentPage,
  onSelectPlaylist,
  onPlayPlaylist,
  savedPlaylists,
}) => {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [preferredLang, setPreferredLang] = useState<string>(profile.preferredLanguage);

  const likedPlaylists = savedPlaylists.length > 0 ? savedPlaylists : MOCK_PLAYLISTS.slice(0, 3);

  return (
    <div className="p-4 lg:p-8 space-y-8 pb-32 max-w-7xl mx-auto">
      {/* Header Profile Hero Card */}
      <div className="relative rounded-3xl p-6 lg:p-8 glass-card border border-purple-500/20 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-28 h-28 lg:w-32 lg:h-32 rounded-3xl object-cover ring-4 ring-purple-500/40 shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-purple-600 text-white shadow-lg">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white uppercase tracking-wider">
                {profile.listenerLevel}
              </span>
              <span className="text-xs text-zinc-400">Member since {profile.memberSince}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-white">
              {profile.name}
            </h1>
            <p className="text-xs text-purple-300/80 font-mono">{profile.username}</p>

            <p className="text-xs lg:text-sm text-zinc-300 max-w-xl leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Listening Statistics Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Headphones className="w-3.5 h-3.5 text-purple-400" />
              Hours Listened
            </p>
            <p className="text-xl font-extrabold text-white font-['Outfit']">{profile.stats.hoursListened}h</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              AI Playlists
            </p>
            <p className="text-xl font-extrabold text-white font-['Outfit']">{profile.stats.playlistsGenerated}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Mood Streak
            </p>
            <p className="text-xl font-extrabold text-white font-['Outfit']">{profile.stats.moodStreakDays} Days</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-center sm:text-left space-y-1">
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Top Vibe
            </p>
            <p className="text-xl font-extrabold text-purple-300 font-['Outfit'] capitalize">{profile.stats.topMoodThisWeek}</p>
          </div>
        </div>
      </div>

      {/* Grid: Preferences & Genres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Favorite Genres Card */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Music2 className="w-4 h-4 text-purple-400" />
              <span>Favorite Genres & Audio Styles</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            {profile.favoriteGenres.map((genre) => (
              <div key={genre.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
                  <span>{genre.name}</span>
                  <span className="text-purple-300 font-mono">{genre.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${genre.color}`}
                    style={{ width: `${genre.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Language & Settings */}
        <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Music Language & Preference Tuning</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Preferred Music Language</label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="English & Instrumentals" className="bg-[#0b0813]">English & Instrumentals</option>
                <option value="Spanish / Latin Vibes" className="bg-[#0b0813]">Spanish / Latin Vibes</option>
                <option value="Japanese / City Pop & LoFi" className="bg-[#0b0813]">Japanese / City Pop & LoFi</option>
                <option value="Korean / K-Pop & R&B" className="bg-[#0b0813]">Korean / K-Pop & R&B</option>
                <option value="Pure Instrumentals (No Vocals)" className="bg-[#0b0813]">Pure Instrumentals (No Vocals)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI Emotion Sync active</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                MoodMuse AI automatically calibrates track acoustic tempos and sub-bass frequencies based on your listener history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Artists */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400" />
          <span>Top Favorite Artists</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {profile.favoriteArtists.map((artist) => (
            <div
              key={artist.id}
              className="p-4 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 flex items-center gap-3.5 transition-all group"
            >
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-14 h-14 rounded-full object-cover border border-white/20 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {artist.name}
                </h4>
                <p className="text-[10px] text-zinc-400">{artist.genre} • {artist.followers}</p>
                <p className="text-[10px] text-purple-300 mt-0.5 truncate">Top: {artist.topTrack}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Liked / Saved Playlists */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Saved & Liked Playlists</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onSelectPlaylist(pl)}
              className="p-3 rounded-2xl glass-card hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-3 border border-white/10 group"
            >
              <img
                src={pl.coverUrl}
                alt={pl.title}
                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {pl.title}
                </h4>
                <p className="text-[10px] text-zinc-400 truncate">{pl.trackCount} Tracks • {pl.mood}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPlaylist(pl);
                }}
                className="p-2 rounded-full bg-purple-600 text-white hover:scale-110 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
