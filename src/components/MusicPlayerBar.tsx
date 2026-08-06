import React, { useState, useEffect, useRef } from 'react';
import { Track, Playlist, MoodType } from '../types';
import { MOODS } from '../mockData';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  ThumbsDown,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Sparkles,
  ListMusic,
  ChevronUp,
  ChevronDown,
  Music2
} from 'lucide-react';

interface MusicPlayerBarProps {
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onToggleLike: (trackId: string) => void;
  onToggleDislike: (trackId: string) => void;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentTrack,
  currentPlaylist,
  isPlaying,
  setIsPlaying,
  onNextTrack,
  onPrevTrack,
  onToggleLike,
  onToggleDislike,
}) => {
  const [progress, setProgress] = useState<number>(24); // percent 0-100
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [showQueue, setShowQueue] = useState<boolean>(false);

  // Simulated playback ticker
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onNextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onNextTrack]);

  if (!currentTrack) {
    return null;
  }

  const trackMood = MOODS.find((m) => m.id === currentTrack.mood);

  // Calculate current elapsed time in seconds
  const currentSeconds = Math.floor((progress / 100) * currentTrack.durationSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Queue Drawer Modal */}
      {showQueue && currentPlaylist && (
        <div className="fixed bottom-24 right-4 lg:right-8 z-40 w-80 lg:w-96 max-h-96 p-4 rounded-3xl glass-panel shadow-2xl border border-purple-500/30 overflow-hidden flex flex-col space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Up Next in Playlist</h4>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-purple-300 font-medium truncate">
            {currentPlaylist.title}
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {currentPlaylist.tracks.map((t, idx) => {
              const isSelected = t.id === currentTrack.id;
              return (
                <div
                  key={t.id}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                    isSelected ? 'bg-purple-600/30 border border-purple-500/40 text-white' : 'hover:bg-white/5 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-[10px] text-zinc-500 font-mono w-4">{idx + 1}</span>
                    <div className="truncate">
                      <p className="font-semibold truncate">{t.title}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{t.artist}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Bottom Sticky Player */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d091a]/95 backdrop-blur-2xl border-t border-purple-900/30 px-4 lg:px-8 py-3 flex items-center justify-between gap-4 shadow-2xl">
        {/* Track Thumbnail & Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
          <div className="relative group flex-shrink-0">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-12 h-12 rounded-xl object-cover shadow-lg border border-white/10 ${
                isPlaying ? 'ring-2 ring-purple-500/50' : ''
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center gap-0.5">
                <span className="w-1 bg-purple-400 rounded-full animate-bar-1" />
                <span className="w-1 bg-fuchsia-400 rounded-full animate-bar-2" />
                <span className="w-1 bg-indigo-400 rounded-full animate-bar-3" />
              </div>
            )}
          </div>

          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs lg:text-sm font-bold text-white truncate">{currentTrack.title}</h4>
              {trackMood && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-medium">
                  {trackMood.emoji}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 truncate">{currentTrack.artist}</p>
          </div>

          {/* Like / Dislike */}
          <div className="hidden sm:flex items-center gap-1 ml-2">
            <button
              onClick={() => onToggleLike(currentTrack.id)}
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                currentTrack.liked ? 'text-pink-500 fill-pink-500' : 'text-zinc-400'
              }`}
              title="Like song"
            >
              <Heart className={`w-4 h-4 ${currentTrack.liked ? 'fill-pink-500' : ''}`} />
            </button>
            <button
              onClick={() => onToggleDislike(currentTrack.id)}
              className={`p-1.5 rounded-full hover:bg-white/10 transition-colors ${
                currentTrack.disliked ? 'text-purple-400' : 'text-zinc-400'
              }`}
              title="Dislike / Skip mood"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Controls & Seek Bar */}
        <div className="flex-1 max-w-xl flex flex-col items-center gap-1.5">
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`p-1.5 text-xs transition-colors ${
                isShuffle ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onPrevTrack}
              className="p-1.5 text-zinc-300 hover:text-white transition-transform active:scale-90"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={onNextTrack}
              className="p-1.5 text-zinc-300 hover:text-white transition-transform active:scale-90"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`p-1.5 text-xs transition-colors ${
                isRepeat ? 'text-purple-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Time & Seekbar */}
          <div className="w-full flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
            <span>{formatTime(currentSeconds)}</span>
            <div className="flex-1 relative h-1.5 bg-white/10 rounded-full cursor-pointer group">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full relative group-hover:bg-purple-400 transition-all"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span>{currentTrack.duration}</span>
          </div>
        </div>

        {/* Right Volume & Queue Toggle */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4 min-w-[180px]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`p-2 rounded-xl transition-colors ${
              showQueue ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40' : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Toggle Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
