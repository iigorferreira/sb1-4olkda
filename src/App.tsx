import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PlaylistItem } from './components/PlaylistItem';
import { NowPlaying } from './components/NowPlaying';
import { RecommendedSongs } from './components/RecommendedSongs';
import type { Song, Room } from './types';

const MOCK_RECOMMENDED_SONGS: Song[] = [
  { id: 4, title: "Anjos", artist: "O Rappa", duration: "4:12", votes: 0 },
  { id: 5, title: "Tempo Perdido", artist: "Legião Urbana", duration: "5:02", votes: 0 },
  { id: 6, title: "Céu Azul", artist: "Charlie Brown Jr.", duration: "3:59", votes: 0 },
];

function App() {
  const [room, setRoom] = useState<Room>({
    id: "sala-1",
    name: "Sala Principal",
    currentSong: null,
    playlist: [
      { id: 1, title: "Evidências", artist: "Chitãozinho & Xororó", duration: "4:39", votes: 5, addedBy: "João" },
      { id: 2, title: "Deixa", artist: "Lagum", duration: "3:45", votes: 3, addedBy: "Maria" },
      { id: 3, title: "Velha Infância", artist: "Tribalistas", duration: "3:52", votes: 2, addedBy: "Pedro" },
    ],
    listeners: 42,
    isPlaying: false,
  });

  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>(MOCK_RECOMMENDED_SONGS);

  useEffect(() => {
    // Simula a atualização da sala em tempo real
    const interval = setInterval(() => {
      setRoom(prev => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 3) - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (songId: number) => {
    setRoom(prev => ({
      ...prev,
      playlist: prev.playlist
        .map(song => song.id === songId ? { ...song, votes: song.votes + 1 } : song)
        .sort((a, b) => b.votes - a.votes)
    }));
  };

  const handlePlayPause = () => {
    setRoom(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSkip = () => {
    setRoom(prev => {
      const newPlaylist = [...prev.playlist];
      const nextSong = newPlaylist.shift();
      
      // Se não houver mais músicas na playlist, pega uma recomendada
      if (newPlaylist.length === 0 && recommendedSongs.length > 0) {
        const recommendedSong = recommendedSongs[0];
        setRecommendedSongs(prev => prev.slice(1));
        newPlaylist.push(recommendedSong);
      }

      return {
        ...prev,
        currentSong: nextSong || null,
        playlist: newPlaylist,
      };
    });
  };

  const handleAddRecommended = (song: Song) => {
    setRoom(prev => ({
      ...prev,
      playlist: [...prev.playlist, { ...song, addedBy: "Você" }]
    }));
    setRecommendedSongs(prev => prev.filter(s => s.id !== song.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header 
          roomName={room.name}
          listeners={room.listeners}
          onAddSong={() => {}} // TODO: Implementar modal de adicionar música
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-6">Fila de Reprodução</h2>
              <div className="space-y-4">
                {room.playlist.map((song) => (
                  <PlaylistItem 
                    key={song.id}
                    song={song}
                    onVote={handleVote}
                  />
                ))}
              </div>

              <RecommendedSongs 
                songs={recommendedSongs}
                onAddToPlaylist={handleAddRecommended}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Tocando Agora</h2>
            <NowPlaying
              currentSong={room.currentSong || room.playlist[0]}
              isPlaying={room.isPlaying}
              onPlayPause={handlePlayPause}
              onSkip={handleSkip}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;