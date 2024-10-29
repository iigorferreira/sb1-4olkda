import React from 'react';
import type { Song } from '../types';
import { PlaylistItem } from './PlaylistItem';

interface RecommendedSongsProps {
  songs: Song[];
  onAddToPlaylist: (song: Song) => void;
}

export function RecommendedSongs({ songs, onAddToPlaylist }: RecommendedSongsProps) {
  if (songs.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recomendadas para Você</h2>
      <div className="space-y-4">
        {songs.map((song) => (
          <div key={song.id} className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex-1">
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-purple-300">{song.artist}</p>
            </div>
            <button
              onClick={() => onAddToPlaylist(song)}
              className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-full text-sm transition-colors"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}