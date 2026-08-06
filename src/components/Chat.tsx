import React, { useState, useRef, useEffect } from 'react';
import { Page, ChatMessage, Playlist, Track, MoodType } from '../types';
import { MOODS, MOCK_PLAYLISTS, MOCK_CHAT_MESSAGES } from '../mockData';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Play,
  Heart,
  PlusCircle,
  RefreshCw,
  Compass,
  ListMusic,
  Check
} from 'lucide-react';

interface ChatProps {
  setCurrentPage: (page: Page) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  onPlayPlaylist: (playlist: Playlist) => void;
}

export const Chat: React.FC<ChatProps> = ({
  setCurrentPage,
  onSelectPlaylist,
  onPlayPlaylist,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // Simulate AI response delay & smart playlist matching
    setTimeout(() => {
      // Determine mood based on prompt keywords
      const lower = query.toLowerCase();
      let matchedMood: MoodType = 'relaxed';
      let matchedPlaylist = MOCK_PLAYLISTS[1];

      if (lower.includes('workout') || lower.includes('gym') || lower.includes('energetic') || lower.includes('excited') || lower.includes('party')) {
        matchedMood = 'excited';
        matchedPlaylist = MOCK_PLAYLISTS[0];
      } else if (lower.includes('happy') || lower.includes('sun') || lower.includes('joy') || lower.includes('dance')) {
        matchedMood = 'happy';
        matchedPlaylist = MOCK_PLAYLISTS[2];
      } else if (lower.includes('focus') || lower.includes('code') || lower.includes('study') || lower.includes('work')) {
        matchedMood = 'focused';
        matchedPlaylist = MOCK_PLAYLISTS[3];
      } else if (lower.includes('stress') || lower.includes('anxiety') || lower.includes('calm') || lower.includes('sleep')) {
        matchedMood = 'stressed';
        matchedPlaylist = MOCK_PLAYLISTS[4];
      } else if (lower.includes('retro') || lower.includes('80s') || lower.includes('nostalgic') || lower.includes('drive')) {
        matchedMood = 'nostalgic';
        matchedPlaylist = MOCK_PLAYLISTS[5];
      }

      const moodObj = MOODS.find((m) => m.id === matchedMood);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I've analyzed your prompt and detected a **${moodObj?.name || 'Custom'}** vibe signature (${moodObj?.emoji}). Here is a custom AI-crafted playlist designed with harmonic key matching and specific BPM frequencies for this exact atmosphere!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detectedMood: matchedMood,
        recommendedPlaylist: matchedPlaylist,
        suggestedPrompts: [
          `Add more instrumental ${moodObj?.name} tracks`,
          `Switch to faster tempo`,
          `Explain the audio frequencies used`,
        ],
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 pb-32 max-w-5xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Header Card */}
      <div className="p-4 rounded-2xl glass-panel border border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
            <Bot className="w-5 h-5" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#0d0a18]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <span>MoodMuse AI Companion</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                Active Engine
              </span>
            </h2>
            <p className="text-xs text-zinc-400">Natural language emotional audio synthesis & playlist generation</p>
          </div>
        </div>

        <button
          onClick={() => setMessages(MOCK_CHAT_MESSAGES)}
          className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5"
          title="Reset Chat Session"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Session</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2 my-2">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          const detectedMoodObj = msg.detectedMood ? MOODS.find((m) => m.id === msg.detectedMood) : null;

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isAi ? 'items-start' : 'items-end justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`space-y-3 max-w-2xl ${isAi ? 'text-left' : 'text-right'}`}>
                {/* Bubble Container */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                    isAi
                      ? 'bg-white/5 border border-white/10 text-zinc-200 backdrop-blur-md rounded-tl-sm'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Detected Mood Badge */}
                  {detectedMoodObj && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                      <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">Detected Mood:</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30 flex items-center gap-1">
                        {detectedMoodObj.emoji} {detectedMoodObj.name} ({detectedMoodObj.energyLevel}% Energy)
                      </span>
                    </div>
                  )}

                  <span className="block text-[10px] text-zinc-400/60 mt-1.5 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Embedded Recommended Playlist Card */}
                {msg.recommendedPlaylist && (
                  <div className="p-4 rounded-2xl glass-card border border-purple-500/30 space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <img
                        src={msg.recommendedPlaylist.coverUrl}
                        alt={msg.recommendedPlaylist.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold uppercase">
                            AI Recommendation
                          </span>
                          <span className="text-xs text-zinc-400">{msg.recommendedPlaylist.trackCount} Tracks</span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate mt-1">
                          {msg.recommendedPlaylist.title}
                        </h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">
                          {msg.recommendedPlaylist.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons inside Card */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <button
                        onClick={() => onPlayPlaylist(msg.recommendedPlaylist!)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Play Now</span>
                      </button>
                      <button
                        onClick={() => onSelectPlaylist(msg.recommendedPlaylist!)}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-medium border border-white/10 transition-all"
                      >
                        View Tracks
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Chips */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedPrompts.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(p)}
                        className="text-[11px] px-3 py-1 rounded-full bg-purple-950/40 hover:bg-purple-800/40 border border-purple-500/20 text-purple-300 transition-colors"
                      >
                        "{p}"
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 mb-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Animated Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl glass-card border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-zinc-400 ml-2 font-medium">MoodMuse is synthesizing audio frequencies...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Prompt Box */}
      <div className="space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Describe how you feel, your current task, or desired music style..."
            className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-white/10 border border-white/15 focus:border-purple-400 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all shadow-xl backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="absolute right-2 p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white transition-all shadow-md shadow-purple-600/40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-zinc-500">
          Powered by MoodMuse AI Harmonic Neural Engine • Safe & Ad-free experience
        </p>
      </div>
    </div>
  );
};
