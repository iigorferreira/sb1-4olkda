import React from 'react';
import { Music, Plus, Users } from 'lucide-react';

interface HeaderProps {
  roomName: string;
  listeners: number;
  onAddSong: () => void;
}

export function Header({ roomName, listeners, onAddSong }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-3">
        <Music size={32} className="text-purple-300" />
        <div>
          <h1 className="text-3xl font-bold">JukeBox Today</h1>
          <div className="flex items-center gap-2 text-purple-300">
            <span>{roomName}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{listeners}</span>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={onAddSong}
        className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
      >
        <Plus size={20} />
        <span>Adicionar Música</span>
      </button>
    </header>
  );
}