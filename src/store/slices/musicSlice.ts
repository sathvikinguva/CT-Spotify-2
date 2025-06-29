import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, Album, Playlist } from '../../types/music';
import { mockSongs, mockAlbums, mockPlaylists } from '../../data/mockData';

interface MusicState {
  songs: Song[];
  albums: Album[];
  playlists: Playlist[];
  searchQuery: string;
  searchResults: {
    songs: Song[];
    albums: Album[];
    playlists: Playlist[];
  };
  selectedGenre: string;
  recentlyPlayed: Song[];
}

const initialState: MusicState = {
  songs: mockSongs,
  albums: mockAlbums,
  playlists: mockPlaylists,
  searchQuery: '',
  searchResults: {
    songs: [],
    albums: [],
    playlists: [],
  },
  selectedGenre: 'All',
  recentlyPlayed: [],
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      
      // Simple search implementation
      const query = action.payload.toLowerCase();
      if (query) {
        state.searchResults.songs = state.songs.filter(
          song => 
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.album.toLowerCase().includes(query)
        );
        state.searchResults.albums = state.albums.filter(
          album => 
            album.title.toLowerCase().includes(query) ||
            album.artist.toLowerCase().includes(query)
        );
        state.searchResults.playlists = state.playlists.filter(
          playlist => playlist.name.toLowerCase().includes(query)
        );
      } else {
        state.searchResults = { songs: [], albums: [], playlists: [] };
      }
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
    },
    addToRecentlyPlayed: (state, action: PayloadAction<Song>) => {
      const existingIndex = state.recentlyPlayed.findIndex(song => song.id === action.payload.id);
      if (existingIndex >= 0) {
        state.recentlyPlayed.splice(existingIndex, 1);
      }
      state.recentlyPlayed.unshift(action.payload);
      state.recentlyPlayed = state.recentlyPlayed.slice(0, 20); // Keep only 20 recent songs
    },
    createPlaylist: (state, action: PayloadAction<Omit<Playlist, 'id' | 'createdAt'>>) => {
      const newPlaylist: Playlist = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.playlists.push(newPlaylist);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.playlists[index] = action.payload;
      }
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
    },
    addSongToPlaylist: (state, action: PayloadAction<{ playlistId: string; song: Song }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist && !playlist.songs.find(s => s.id === action.payload.song.id)) {
        playlist.songs.push(action.payload.song);
      }
    },
    removeSongFromPlaylist: (state, action: PayloadAction<{ playlistId: string; songId: string }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== action.payload.songId);
      }
    },
  },
});

export const {
  setSearchQuery,
  setSelectedGenre,
  addToRecentlyPlayed,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} = musicSlice.actions;

export default musicSlice.reducer;