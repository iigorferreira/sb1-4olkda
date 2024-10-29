import React from 'react';
import { Music, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import type { Song } from '../types';

interface NowPlayingProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
}

export function NowPlaying({ currentSong, isPlaying, onPlayPause, onSkip }: NowPlayingProps) {
  if (!currentSong) return null;

  return (
    <div className="text-center">
      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg mb-6 flex items-center justify-center">
        <Music size={64} className="text-white/80" />
      </div>
      <h3 className="text-xl font-medium">{currentSong.title}</h3>
      <p className="text-purple-300 mb-6">{currentSong.artist}</p>
      <div className="flex items-center justify-center gap-4">
        <button 
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={onSkip}
        >
          <SkipForward size={24} />
        </button>
        <button 
          className="p-4 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Volume2 size={24} />
        </button>
      </div>
    </div>
  );
}