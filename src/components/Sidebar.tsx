import React from 'react';
import { Page, MoodType } from '../types';
import { MOODS } from '../mockData';
import { 
  Home, 
  MessageSquare, 
  Music, 
  History, 
  User, 
  Sparkles, 
  Compass, 
  X,
  Volume2,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedMood: MoodType | null;
  onSelectMood: (moodId: MoodType) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  activePlaylistTitle?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  selectedMood,
  onSelectMood,
  isMobileOpen,
  setIsMobileOpen,
  activePlaylistTitle,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare, badge: 'AI' },
    { id: 'playlist', label: 'Playlists', icon: Music },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setIsMobileOpen(false);
  };

  const handleMoodClick = (moodId: MoodType) => {
    onSelectMood(moodId);
    setCurrentPage('home');
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0d0a18]/90 backdrop-blur-2xl border-r border-purple-900/20 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Logo */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-0.5 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                <div className="w-full h-full bg-[#0d0a18] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold font-['Outfit'] tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
                  MoodMuse<span className="text-purple-400 font-extrabold ml-1">AI</span>
                </h1>
                <p className="text-[10px] text-purple-300/60 uppercase tracking-widest font-semibold">Sonic Emotion Engine</p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Pages Navigation */}
          <div>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-purple-300/40 mb-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as Page)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/10 text-white border border-purple-500/30 shadow-lg shadow-purple-900/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? 'text-purple-400' : 'text-zinc-400 group-hover:text-purple-300'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Mood Shortcuts */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/40">
                Instant Moods
              </p>
              <Compass className="w-3.5 h-3.5 text-purple-400/50" />
            </div>

            <div className="space-y-1">
              {MOODS.map((m) => {
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => handleMoodClick(m.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-white/10 text-white border border-purple-400/30 shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{m.emoji}</span>
                      <span className="capitalize">{m.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 group-hover:text-purple-300">
                      {m.energyLevel}% Vibe
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Mood Companion Widget Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-900/30 to-indigo-950/40 border border-purple-500/20 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all" />
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-purple-200 uppercase tracking-wider">
                  AI Music Engine
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                Need a custom vibe playlist right now?
              </p>
              <button
                onClick={() => handleNavClick('chat')}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95"
              >
                <span>Chat with MoodMuse</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer User Mini-Bar */}
        <div className="p-4 border-t border-purple-900/20 bg-[#090712]/50">
          <div
            onClick={() => handleNavClick('profile')}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                  alt="Alex Vance"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/40"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0d0a18]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">Alex Vance</p>
                <p className="text-[10px] text-purple-300/70 font-medium">Master Alchemist</p>
              </div>
            </div>
            <Volume2 className="w-4 h-4 text-purple-400/60" />
          </div>
        </div>
      </aside>
    </>
  );
};
