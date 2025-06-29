import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarCollapsed: boolean;
  showCreatePlaylistModal: boolean;
  showQueue: boolean;
  showLyricsModal: boolean;
  showSettingsModal: boolean;
  showEqualizerModal: boolean;
  showSleepTimerModal: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UIState = {
  sidebarCollapsed: false,
  showCreatePlaylistModal: false,
  showQueue: false,
  showLyricsModal: false,
  showSettingsModal: false,
  showEqualizerModal: false,
  showSleepTimerModal: false,
  loading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setShowCreatePlaylistModal: (state, action: PayloadAction<boolean>) => {
      state.showCreatePlaylistModal = action.payload;
    },
    setShowQueue: (state, action: PayloadAction<boolean>) => {
      state.showQueue = action.payload;
    },
    setShowLyricsModal: (state, action: PayloadAction<boolean>) => {
      state.showLyricsModal = action.payload;
    },
    setShowSettingsModal: (state, action: PayloadAction<boolean>) => {
      state.showSettingsModal = action.payload;
    },
    setShowEqualizerModal: (state, action: PayloadAction<boolean>) => {
      state.showEqualizerModal = action.payload;
    },
    setShowSleepTimerModal: (state, action: PayloadAction<boolean>) => {
      state.showSleepTimerModal = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setShowCreatePlaylistModal,
  setShowQueue,
  setShowLyricsModal,
  setShowSettingsModal,
  setShowEqualizerModal,
  setShowSleepTimerModal,
  setLoading,
  setError,
} = uiSlice.actions;

export default uiSlice.reducer;