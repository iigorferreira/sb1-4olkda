import React from 'react';
import type { Song } from '../types';

interface PlaylistItemProps {
  song: Song;
  onVote: (id: number) => void;
}

export function PlaylistItem({ song, onVote }: PlaylistItemProps) {
  return (
    <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium">{song.title}</h3>
        <div className="flex items-center gap-2 text-sm text-purple-300">
          <span>{song.artist}</span>
          {song.addedBy && (
            <>
              <span>•</span>
              <span>Adicionado por {song.addedBy}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm text-purple-300">{song.duration}</span>
        <div className="flex items-center gap-2">
          <span className="text-purple-300">{song.votes}</span>
          <button
            onClick={() => onVote(song.id)}
            className="bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-full text-sm transition-colors"
          >
            Votar
          </button>
        </div>
      </div>
    </div>
  );
}