import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  setCurrentSong,
  togglePlayPause,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setQueue,
  nextSong,
  previousSong,
  toggleShuffle,
  setRepeat,
} from '../store/slices/playerSlice';
import { addToRecentlyPlayed } from '../store/slices/musicSlice';
import { Song } from '../types/music';

export const usePlayer = () => {
  const dispatch = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  const playSong = (song: Song, queue?: Song[]) => {
    dispatch(setCurrentSong(song));
    dispatch(setIsPlaying(true));
    dispatch(addToRecentlyPlayed(song));
    
    if (queue) {
      dispatch(setQueue(queue));
    }
  };

  const playPause = () => {
    dispatch(togglePlayPause());
  };

  const skipNext = () => {
    dispatch(nextSong());
  };

  const skipPrevious = () => {
    dispatch(previousSong());
  };

  const seek = (time: number) => {
    dispatch(setCurrentTime(time));
  };

  const changeVolume = (volume: number) => {
    dispatch(setVolume(volume));
  };

  const shuffleToggle = () => {
    dispatch(toggleShuffle());
  };

  const repeatToggle = () => {
    const modes: Array<'off' | 'track' | 'queue'> = ['off', 'track', 'queue'];
    const currentIndex = modes.indexOf(player.repeat);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    dispatch(setRepeat(nextMode));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    player,
    playSong,
    playPause,
    skipNext,
    skipPrevious,
    seek,
    changeVolume,
    shuffleToggle,
    repeatToggle,
    formatTime,
  };
};