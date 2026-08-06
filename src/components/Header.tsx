import React, { useState } from 'react';
import { Page, MoodType } from '../types';
import { MOODS } from '../mockData';
import { Menu, Search, Sparkles, Bell, SlidersHorizontal, Mic } from 'lucide-react';

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedMood: MoodType | null;
  onSearch?: (query: string) => void;
  onOpenQuickAiPrompt?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  setIsMobileOpen,
  currentPage,
  setCurrentPage,
  selectedMood,
  onSearch,
  onOpenQuickAiPrompt,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const activeMoodObj = MOODS.find((m) => m.id === selectedMood);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Discover Vibes';
      case 'chat':
        return 'AI Mood Studio';
      case 'playlist':
        return 'Curated Playlists';
      case 'history':
        return 'Mood History & Logs';
      case 'profile':
        return 'Your Music Persona';
      default:
        return 'MoodMuse AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0b0813]/80 backdrop-blur-xl border-b border-purple-900/20 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg lg:text-xl font-bold font-['Outfit'] text-white tracking-tight flex items-center gap-2">
            <span>{getPageTitle()}</span>
            {activeMoodObj && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-normal">
                {activeMoodObj.emoji} {activeMoodObj.name}
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Middle: Search Input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300/50 group-focus-within:text-purple-400 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search moods, genres, tracks, or express your vibe..."
            className="w-full pl-10 pr-10 py-2 rounded-full bg-white/5 border border-white/10 focus:border-purple-500/50 text-xs lg:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <button
            type="button"
            onClick={onOpenQuickAiPrompt}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors p-1"
            title="Ask AI for music based on current mood"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Ask AI Button */}
        <button
          onClick={() => setCurrentPage('chat')}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/25 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask AI Vibe</span>
        </button>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 p-4 rounded-2xl glass-panel shadow-2xl border border-purple-500/30 z-50 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AI Studio Insights</h4>
                <span className="text-[10px] text-purple-300">2 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <p className="font-semibold text-purple-200">New Playlist Generated</p>
                  <p className="text-zinc-400 text-[11px] mt-0.5">"Cybernetic Energy Boost" was crafted for your excited evening state.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-semibold text-zinc-200">Listening Milestone</p>
                  <p className="text-zinc-400 text-[11px] mt-0.5">You reached a 19-day Mood Streak! Keep exploring soundscapes.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
