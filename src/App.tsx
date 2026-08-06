import React, { useState } from 'react';
import { Page, MoodType, Playlist as PlaylistType, Track } from './types';
import { MOCK_PLAYLISTS, MOCK_TRACKS } from './mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { Home } from './components/Home';
import { Chat } from './components/Chat';
import { Playlist } from './components/Playlist';
import { History } from './components/History';
import { Profile } from './components/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType | null>(MOCK_PLAYLISTS[0]);
  
  // Audio Player State
  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistType | null>(MOCK_PLAYLISTS[0]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(MOCK_PLAYLISTS[0].tracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Playlists saved state
  const [playlistsList, setPlaylistsList] = useState<PlaylistType[]>(MOCK_PLAYLISTS);
  
  // Tracks state for likes/dislikes
  const [tracksState, setTracksState] = useState<Track[]>(MOCK_TRACKS);

  // Mobile sidebar drawer
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Select Mood Handler
  const handleSelectMood = (moodId: MoodType) => {
    if (selectedMood === moodId) {
      setSelectedMood(null);
    } else {
      setSelectedMood(moodId);
      // Auto-filter playlist to match mood
      const matched = playlistsList.find((p) => p.mood === moodId);
      if (matched) {
        setSelectedPlaylist(matched);
      }
    }
  };

  // Select Playlist Handler (Navigates to Playlist page)
  const handleSelectPlaylist = (playlist: PlaylistType) => {
    setSelectedPlaylist(playlist);
    setCurrentPage('playlist');
  };

  // Play Playlist directly in bottom bar
  const handlePlayPlaylist = (playlist: PlaylistType) => {
    setCurrentPlaylist(playlist);
    if (playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  // Play Specific Track
  const handlePlayTrack = (track: Track, playlist: PlaylistType) => {
    setCurrentPlaylist(playlist);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Next Track
  const handleNextTrack = () => {
    if (!currentPlaylist || !currentTrack) return;
    const tracks = currentPlaylist.tracks;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
      setCurrentTrack(tracks[currentIndex + 1]);
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[0]); // Loop back to start
    }
  };

  // Prev Track
  const handlePrevTrack = () => {
    if (!currentPlaylist || !currentTrack) return;
    const tracks = currentPlaylist.tracks;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(tracks[currentIndex - 1]);
    } else if (tracks.length > 0) {
      setCurrentTrack(tracks[tracks.length - 1]);
    }
  };

  // Toggle Like Track
  const handleToggleLikeTrack = (trackId: string) => {
    setTracksState((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, liked: !t.liked, disliked: false } : t))
    );
    if (currentTrack && currentTrack.id === trackId) {
      setCurrentTrack((prev) => (prev ? { ...prev, liked: !prev.liked, disliked: false } : null));
    }
  };

  // Toggle Dislike Track
  const handleToggleDislikeTrack = (trackId: string) => {
    setTracksState((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, disliked: !t.disliked, liked: false } : t))
    );
    if (currentTrack && currentTrack.id === trackId) {
      setCurrentTrack((prev) => (prev ? { ...prev, disliked: !prev.disliked, liked: false } : null));
      handleNextTrack(); // Skip track on dislike
    }
  };

  // Toggle Save Playlist
  const handleToggleSavePlaylist = (playlistId: string) => {
    setPlaylistsList((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, isSaved: !p.isSaved } : p))
    );
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  const savedPlaylists = playlistsList.filter((p) => p.isSaved);

  return (
    <div className="min-h-screen bg-[#0b0813] text-zinc-100 flex flex-col lg:flex-row relative selection:bg-purple-500 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedMood={selectedMood}
        onSelectMood={handleSelectMood}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        activePlaylistTitle={currentPlaylist?.title}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header
          setIsMobileOpen={setIsMobileOpen}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedMood={selectedMood}
          onOpenQuickAiPrompt={() => setCurrentPage('chat')}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <Home
              setCurrentPage={setCurrentPage}
              selectedMood={selectedMood}
              onSelectMood={handleSelectMood}
              onSelectPlaylist={handleSelectPlaylist}
              onPlayPlaylist={handlePlayPlaylist}
              savedPlaylists={savedPlaylists}
            />
          )}

          {currentPage === 'chat' && (
            <Chat
              setCurrentPage={setCurrentPage}
              onSelectPlaylist={handleSelectPlaylist}
              onPlayPlaylist={handlePlayPlaylist}
            />
          )}

          {currentPage === 'playlist' && (
            <Playlist
              selectedPlaylist={selectedPlaylist}
              onSelectPlaylist={handleSelectPlaylist}
              onPlayPlaylist={handlePlayPlaylist}
              onPlayTrack={handlePlayTrack}
              currentTrackId={currentTrack?.id}
              isPlaying={isPlaying}
              onToggleLikeTrack={handleToggleLikeTrack}
              onToggleDislikeTrack={handleToggleDislikeTrack}
              onToggleSavePlaylist={handleToggleSavePlaylist}
            />
          )}

          {currentPage === 'history' && (
            <History
              setCurrentPage={setCurrentPage}
              onSelectPlaylist={handleSelectPlaylist}
              onPlayPlaylist={handlePlayPlaylist}
            />
          )}

          {currentPage === 'profile' && (
            <Profile
              setCurrentPage={setCurrentPage}
              onSelectPlaylist={handleSelectPlaylist}
              onPlayPlaylist={handlePlayPlaylist}
              savedPlaylists={savedPlaylists}
            />
          )}
        </main>
      </div>

      {/* Sticky Bottom Spotify-Inspired Music Player */}
      <MusicPlayerBar
        currentTrack={currentTrack}
        currentPlaylist={currentPlaylist}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        onToggleLike={handleToggleLikeTrack}
        onToggleDislike={handleToggleDislikeTrack}
      />
    </div>
  );
}

