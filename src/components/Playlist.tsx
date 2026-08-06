import React, { useState } from 'react';
import { Page, Playlist as PlaylistType, Track } from '../types';
import { MOODS, MOCK_PLAYLISTS } from '../mockData';
import {
  Play,
  Pause,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  Clock,
  Music,
  Sparkles,
  Info,
  ThumbsDown,
  ChevronRight,
  ListFilter
} from 'lucide-react';

interface PlaylistProps {
  selectedPlaylist: PlaylistType | null;
  onSelectPlaylist: (playlist: PlaylistType) => void;
  onPlayPlaylist: (playlist: PlaylistType) => void;
  onPlayTrack: (track: Track, playlist: PlaylistType) => void;
  currentTrackId?: string;
  isPlaying?: boolean;
  onToggleLikeTrack: (trackId: string) => void;
  onToggleDislikeTrack: (trackId: string) => void;
  onToggleSavePlaylist: (playlistId: string) => void;
}

export const Playlist: React.FC<PlaylistProps> = ({
  selectedPlaylist,
  onSelectPlaylist,
  onPlayPlaylist,
  onPlayTrack,
  currentTrackId,
  isPlaying,
  onToggleLikeTrack,
  onToggleDislikeTrack,
  onToggleSavePlaylist,
}) => {
  const activePlaylist = selectedPlaylist || MOCK_PLAYLISTS[0];
  const moodObj = MOODS.find((m) => m.id === activePlaylist.mood);

  return (
    <div className="p-4 lg:p-8 space-y-8 pb-32 max-w-7xl mx-auto">
      {/* Playlist Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MOCK_PLAYLISTS.map((pl) => {
          const isSelected = pl.id === activePlaylist.id;
          return (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylist(pl)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-900/30'
                  : 'glass-card border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <img src={pl.coverUrl} alt="" className="w-5 h-5 rounded-md object-cover" />
              <span>{pl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Playlist Hero Section */}
      <div className="relative rounded-3xl p-6 lg:p-8 glass-card border border-purple-500/20 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 lg:gap-8">
          {/* Album Cover */}
          <div className="relative group flex-shrink-0">
            <img
              src={activePlaylist.coverUrl}
              alt={activePlaylist.title}
              className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl object-cover shadow-2xl ring-1 ring-white/20"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => onPlayPlaylist(activePlaylist)}
                className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
              >
                <Play className="w-7 h-7 fill-white ml-1" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                {activePlaylist.mood} Vibe
              </span>
              <span className="text-xs text-zinc-400">Created by {activePlaylist.curator}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-white tracking-tight leading-tight">
              {activePlaylist.title}
            </h1>

            <p className="text-xs lg:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              {activePlaylist.description}
            </p>

            <div className="text-xs text-zinc-400 font-medium flex items-center justify-center md:justify-start gap-3">
              <span>{activePlaylist.trackCount} Songs</span>
              <span>•</span>
              <span>{activePlaylist.totalDuration}</span>
              <span>•</span>
              <span className="text-purple-300 font-semibold">{activePlaylist.likesCount} Likes</span>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => onPlayPlaylist(activePlaylist)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-xs lg:text-sm shadow-lg shadow-purple-600/40 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Playlist</span>
              </button>

              <button
                onClick={() => onToggleSavePlaylist(activePlaylist.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full border text-xs font-semibold transition-all ${
                  activePlaylist.isSaved
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {activePlaylist.isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-purple-400" />
                    <span>Saved in Library</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Playlist</span>
                  </>
                )}
              </button>

              <button
                onClick={() => alert('Playlist link copied to clipboard!')}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                title="Share Playlist"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation Accordion Card */}
      <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-2">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Why MoodMuse AI Chose This Playlist</span>
        </div>
        <p className="text-xs lg:text-sm text-zinc-300 leading-relaxed italic">
          "{activePlaylist.aiExplanation}"
        </p>
      </div>

      {/* Track Listing Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400 px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-4">
            <span className="w-6 text-center">#</span>
            <span>Title & Artist</span>
          </div>
          <div className="hidden md:flex items-center gap-12">
            <span>Album</span>
            <span>Genre</span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Actions</span>
          </div>
        </div>

        <div className="space-y-1.5">
          {activePlaylist.tracks.map((track, index) => {
            const isCurrent = currentTrackId === track.id;
            return (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track, activePlaylist)}
                className={`group flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-purple-600/25 border-purple-500/40 text-white shadow-md'
                    : 'glass-card border-transparent hover:border-white/10 hover:bg-white/5 text-zinc-300'
                }`}
              >
                {/* Index / Play Status */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 text-center text-xs font-mono text-zinc-500 group-hover:hidden">
                    {index + 1}
                  </span>
                  <button className="w-6 hidden group-hover:flex items-center justify-center text-purple-400">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-white/10"
                  />

                  <div className="truncate">
                    <p className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">{track.artist}</p>
                  </div>
                </div>

                {/* Album & Genre */}
                <div className="hidden md:flex items-center gap-12 text-xs text-zinc-400">
                  <span className="w-32 truncate">{track.album}</span>
                  <span className="w-24 text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-center">
                    {track.genre}
                  </span>
                </div>

                {/* Duration & Likes */}
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span>{track.duration}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLikeTrack(track.id);
                    }}
                    className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                      track.liked ? 'text-pink-500 fill-pink-500' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${track.liked ? 'fill-pink-500' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleDislikeTrack(track.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
