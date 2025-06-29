import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, Song } from '../../types/music';

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  queue: [],
  shuffle: false,
  repeat: 'off',
  sleepTimer: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.currentTime = 0;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setQueue: (state, action: PayloadAction<Song[]>) => {
      state.queue = action.payload;
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(song => song.id !== action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    reorderQueue: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.queue);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.queue = result;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action: PayloadAction<'off' | 'track' | 'queue'>) => {
      state.repeat = action.payload;
    },
    setSleepTimer: (state, action: PayloadAction<number>) => {
      state.sleepTimer = action.payload;
    },
    nextSong: (state) => {
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(song => song.id === state.currentSong?.id);
        const nextIndex = (currentIndex + 1) % state.queue.length;
        state.currentSong = state.queue[nextIndex];
        state.currentTime = 0;
      }
    },
    previousSong: (state) => {
      if (state.queue.length > 0) {
        const currentIndex = state.queue.findIndex(song => song.id === state.currentSong?.id);
        const prevIndex = currentIndex === 0 ? state.queue.length - 1 : currentIndex - 1;
        state.currentSong = state.queue[prevIndex];
        state.currentTime = 0;
      }
    },
  },
});

export const {
  setCurrentSong,
  togglePlayPause,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setQueue,
  addToQueue,
  removeFromQueue,
  clearQueue,
  reorderQueue,
  toggleShuffle,
  setRepeat,
  setSleepTimer,
  nextSong,
  previousSong,
} = playerSlice.actions;

export default playerSlice.reducer;