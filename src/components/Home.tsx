import React, { useState } from 'react';
import { Page, MoodType, Playlist, Track } from '../types';
import { MOODS, MOCK_PLAYLISTS } from '../mockData';
import { Sparkles, Play, Heart, Compass, Flame, Clock, ArrowRight, Music2, Wand2 } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  selectedMood: MoodType | null;
  onSelectMood: (moodId: MoodType) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
  savedPlaylists: Playlist[];
}

export const Home: React.FC<HomeProps> = ({
  setCurrentPage,
  selectedMood,
  onSelectMood,
  onSelectPlaylist,
  onPlayPlaylist,
  savedPlaylists,
}) => {
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      setCurrentPage('chat');
    }
  };

  const trendingPlaylists = MOCK_PLAYLISTS.slice(0, 4);
  const recentPlaylists = savedPlaylists.length > 0 ? savedPlaylists : MOCK_PLAYLISTS.slice(2, 6);

  return (
    <div className="p-4 lg:p-8 space-y-10 pb-32 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative rounded-3xl p-6 lg:p-10 overflow-hidden border border-purple-500/20 glass-card">
        {/* Glowing Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Emotion-to-Audio Generator</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] tracking-tight text-white leading-tight">
              How are you feeling <span className="gradient-text">today?</span>
            </h1>
            <p className="text-zinc-300 text-sm lg:text-base leading-relaxed font-normal">
              MoodMuse AI crafts personalized playlists tuned to your precise emotional state, cognitive goals, or current environment.
            </p>
          </div>

          {/* Interactive AI Prompt Box */}
          <form onSubmit={handleHeroSubmit} className="relative max-w-xl group">
            <div className="relative flex items-center">
              <input
                type="text"
                value={heroPrompt}
                onChange={(e) => setHeroPrompt(e.target.value)}
                placeholder="e.g. 'Late night rain, coding in TypeScript, need chill synth...'"
                className="w-full pl-5 pr-36 py-3.5 rounded-2xl bg-white/10 border border-white/20 focus:border-purple-400 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all shadow-xl backdrop-blur-md"
              />
              <button
                type="submit"
                className="absolute right-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Generate Vibe</span>
              </button>
            </div>
          </form>

          {/* Quick Preset Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-zinc-400 font-medium mr-1">Quick prompts:</span>
            {[
              "Workout Motivation ⚡",
              "Cozy Rainy Day 🌧️",
              "Coding Flow State 🎧",
              "Chill Evening Wine 🍷",
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setHeroPrompt(preset);
                  setCurrentPage('chat');
                }}
                className="text-xs px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-purple-300 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Selector Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-['Outfit'] text-white tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <span>Select Your Current Mood</span>
            </h2>
            <p className="text-xs text-zinc-400">Filter music, tempos, and frequencies by your vibe</p>
          </div>
          {selectedMood && (
            <button
              onClick={() => onSelectMood(selectedMood)}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.id;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMood(m.id)}
                className={`relative group cursor-pointer rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 border ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-600/40 to-indigo-900/60 border-purple-400 shadow-xl shadow-purple-900/30 scale-105'
                    : 'glass-card border-white/10 hover:border-purple-500/40 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{m.emoji}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 text-purple-300 border border-white/10">
                    {m.energyLevel}%
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white capitalize">{m.name}</h3>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">{m.tagline}</p>
                </div>

                {/* Energy Bar Indicator */}
                <div className="mt-3 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${m.color}`}
                    style={{ width: `${m.energyLevel}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Playlists */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-fuchsia-400 animate-pulse" />
            <h2 className="text-xl font-bold font-['Outfit'] text-white tracking-tight">
              Trending AI Playlists
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('playlist')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trendingPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onSelectPlaylist(pl)}
              className="group cursor-pointer rounded-2xl p-3.5 glass-card glass-card-hover border border-white/10 flex flex-col justify-between"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                <img
                  src={pl.coverUrl}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayPlaylist(pl);
                    }}
                    className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/50 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>
                </div>
                <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-purple-300 border border-white/10 uppercase">
                  {pl.mood}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                  {pl.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {pl.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <span>{pl.trackCount} Tracks • {pl.totalDuration}</span>
                <span className="flex items-center gap-1 text-purple-300 font-medium">
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                  {pl.likesCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity / Playlists */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold font-['Outfit'] text-white tracking-tight">
            Recently Recommmended
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onSelectPlaylist(pl)}
              className="flex items-center gap-3.5 p-3 rounded-2xl glass-card hover:bg-white/10 transition-colors cursor-pointer group border border-white/10"
            >
              <img
                src={pl.coverUrl}
                alt={pl.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {pl.title}
                </h4>
                <p className="text-[11px] text-zinc-400 truncate mt-0.5">{pl.curator}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-purple-300">
                  <span className="capitalize px-2 py-0.5 rounded bg-purple-500/20 font-medium">{pl.mood}</span>
                  <span>{pl.trackCount} songs</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPlaylist(pl);
                }}
                className="p-2.5 rounded-full bg-white/5 hover:bg-purple-600 text-zinc-300 hover:text-white transition-all mr-1"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
