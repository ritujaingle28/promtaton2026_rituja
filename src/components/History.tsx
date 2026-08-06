import React, { useState } from 'react';
import { Page, Playlist, HistoryItem, MoodType } from '../types';
import { MOODS, MOCK_HISTORY } from '../mockData';
import {
  History as HistoryIcon,
  Clock,
  Play,
  Sparkles,
  Calendar,
  Compass,
  BarChart2,
  ListMusic,
  Filter
} from 'lucide-react';

interface HistoryProps {
  setCurrentPage: (page: Page) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const History: React.FC<HistoryProps> = ({
  setCurrentPage,
  onSelectPlaylist,
  onPlayPlaylist,
}) => {
  const [filterMood, setFilterMood] = useState<string>('all');

  const filteredHistory = filterMood === 'all'
    ? MOCK_HISTORY
    : MOCK_HISTORY.filter((h) => h.mood === filterMood);

  return (
    <div className="p-4 lg:p-8 space-y-8 pb-32 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-white tracking-tight flex items-center gap-3">
            <HistoryIcon className="w-7 h-7 text-purple-400" />
            <span>Listening & Mood History</span>
          </h1>
          <p className="text-xs lg:text-sm text-zinc-400 mt-1">
            Track your emotional listening journey and revisit previously AI-recommended audio sessions.
          </p>
        </div>

        {/* Filter dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-400" />
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all" className="bg-[#0b0813]">All Moods</option>
            {MOODS.map((m) => (
              <option key={m.id} value={m.id} className="bg-[#0b0813]">
                {m.emoji} {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mood Distribution Bar */}
      <div className="p-6 rounded-3xl glass-card border border-purple-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Mood Frequency Breakdown</h3>
          </div>
          <span className="text-xs text-purple-300 font-semibold">19 Days Active Streak ⚡</span>
        </div>

        <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
          <div className="h-full bg-cyan-400" style={{ width: '40%' }} title="Focused (40%)" />
          <div className="h-full bg-fuchsia-500" style={{ width: '25%' }} title="Excited (25%)" />
          <div className="h-full bg-emerald-400" style={{ width: '20%' }} title="Relaxed (20%)" />
          <div className="h-full bg-amber-400" style={{ width: '15%' }} title="Happy (15%)" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 font-medium pt-1">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Focused (40%)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500" /> Excited (25%)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Relaxed (20%)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Happy (15%)</div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span>Timeline Logs</span>
        </h3>

        <div className="relative border-l-2 border-purple-900/40 ml-4 space-y-6 pl-6">
          {filteredHistory.map((item) => {
            const moodObj = MOODS.find((m) => m.id === item.mood);

            return (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-4 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#0b0813] shadow-md group-hover:scale-125 transition-transform" />

                {/* Timeline Card */}
                <div className="p-5 rounded-2xl glass-card border border-white/10 hover:border-purple-500/30 transition-all space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{moodObj?.emoji}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 capitalize border border-purple-500/30">
                        {item.mood}
                      </span>
                      <span className="text-xs text-zinc-400">{item.date} • {item.time}</span>
                    </div>

                    <div className="text-xs text-zinc-400 font-mono">
                      <span>{item.tracksListened} tracks</span> • <span>{item.sessionDuration}</span>
                    </div>
                  </div>

                  {/* User Prompt */}
                  {item.userPrompt && (
                    <p className="text-xs text-zinc-300 italic bg-white/5 p-2.5 rounded-xl border border-white/5">
                      Prompt: "{item.userPrompt}"
                    </p>
                  )}

                  {/* Recommended Playlist Thumbnail Box */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.playlistRecommended.coverUrl}
                        alt={item.playlistRecommended.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.playlistRecommended.title}</h4>
                        <p className="text-[10px] text-zinc-400">{item.playlistRecommended.trackCount} Tracks</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPlayPlaylist(item.playlistRecommended)}
                        className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all"
                        title="Replay Session"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </button>
                      <button
                        onClick={() => onSelectPlaylist(item.playlistRecommended)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs border border-white/10 transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
