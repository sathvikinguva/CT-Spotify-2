export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  genre: string;
  coverUrl: string;
  audioUrl: string;
  releaseDate: string;
  playCount: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  songs: Song[];
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  createdAt: string;
  isPublic: boolean;
  creator: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genres: string[];
  albums: Album[];
  monthlyListeners: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  playlists: string[];
  likedSongs: string[];
  recentlyPlayed: string[];
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  shuffle: boolean;
  repeat: 'off' | 'track' | 'queue';
  sleepTimer: number;
}