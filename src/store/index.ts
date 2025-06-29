import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import musicReducer from './slices/musicSlice';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    music: musicReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;