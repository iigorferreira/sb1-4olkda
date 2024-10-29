export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  votes: number;
  addedBy?: string;
}

export interface Room {
  id: string;
  name: string;
  currentSong: Song | null;
  playlist: Song[];
  listeners: number;
  isPlaying: boolean;
}