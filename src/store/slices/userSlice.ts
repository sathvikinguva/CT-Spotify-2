import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/music';

interface UserSettings {
  audioQuality: 'low' | 'normal' | 'high' | 'very-high';
  downloadQuality: 'normal' | 'high' | 'very-high';
  normalizeVolume: boolean;
  theme: 'dark' | 'light' | 'auto';
  accentColor: string;
  notifications: {
    newReleases: boolean;
    playlistUpdates: boolean;
    friendActivity: boolean;
    recommendations: boolean;
  };
  privacy: {
    shareActivity: boolean;
    showInSearch: boolean;
    allowFollowers: boolean;
  };
}

interface UserState {
  currentUser: User | null;
  likedSongs: string[];
  followedArtists: string[];
  settings: UserSettings;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'Music Lover',
    email: 'user@spotify.com',
    avatar: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=100',
    playlists: ['1', '2', '3'],
    likedSongs: ['1', '2'],
    recentlyPlayed: []
  },
  likedSongs: ['1', '2'],
  followedArtists: [],
  settings: {
    audioQuality: 'high',
    downloadQuality: 'high',
    normalizeVolume: true,
    theme: 'dark',
    accentColor: 'green',
    notifications: {
      newReleases: true,
      playlistUpdates: true,
      friendActivity: false,
      recommendations: true,
    },
    privacy: {
      shareActivity: true,
      showInSearch: true,
      allowFollowers: true,
    },
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    toggleLikeSong: (state, action: PayloadAction<string>) => {
      const songId = action.payload;
      const index = state.likedSongs.indexOf(songId);
      if (index >= 0) {
        state.likedSongs.splice(index, 1);
      } else {
        state.likedSongs.push(songId);
      }
      
      if (state.currentUser) {
        state.currentUser.likedSongs = [...state.likedSongs];
      }
    },
    followArtist: (state, action: PayloadAction<string>) => {
      const artistId = action.payload;
      if (!state.followedArtists.includes(artistId)) {
        state.followedArtists.push(artistId);
      }
    },
    unfollowArtist: (state, action: PayloadAction<string>) => {
      state.followedArtists = state.followedArtists.filter(id => id !== action.payload);
    },
    updateSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const {
  setCurrentUser,
  toggleLikeSong,
  followArtist,
  unfollowArtist,
  updateSettings,
} = userSlice.actions;

export default userSlice.reducer;