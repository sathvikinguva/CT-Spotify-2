import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart, Mic2, List, PictureInPicture2, Settings, Clock } from 'lucide-react';
import { usePlayer } from '../../hooks/usePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleLikeSong } from '../../store/slices/userSlice';
import { setShowQueue, setShowLyricsModal, setShowEqualizerModal, setShowSleepTimerModal } from '../../store/slices/uiSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Player: React.FC = () => {
  const dispatch = useDispatch();
  const { player, playPause, skipNext, skipPrevious, seek, changeVolume, shuffleToggle, repeatToggle, formatTime } = usePlayer();
  const { likedSongs } = useSelector((state: RootState) => state.user);
  const { showQueue } = useSelector((state: RootState) => state.ui);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const isLiked = player.currentSong ? likedSongs.includes(player.currentSong.id) : false;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && player.duration > 0) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const clickTime = (clickX / width) * player.duration;
      seek(clickTime);
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newVolume = Math.max(0, Math.min(1, clickX / width));
      changeVolume(newVolume);
    }
  };

  const handleLikeToggle = () => {
    if (player.currentSong) {
      dispatch(toggleLikeSong(player.currentSong.id));
    }
  };

  const handleShowLyrics = () => {
    dispatch(setShowLyricsModal(true));
  };

  const handleToggleQueue = () => {
    dispatch(setShowQueue(!showQueue));
  };

  const handleShowEqualizer = () => {
    dispatch(setShowEqualizerModal(true));
  };

  const handleShowSleepTimer = () => {
    dispatch(setShowSleepTimerModal(true));
  };

  if (!player.currentSong) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-gray-900 border-t border-gray-800 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        {/* Current Song Info */}
        <div className="flex items-center space-x-4 w-1/4 min-w-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={player.currentSong.coverUrl}
            alt={player.currentSong.title}
            className="w-14 h-14 rounded-md cursor-pointer"
            onClick={handleShowLyrics}
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-white text-sm font-medium truncate hover:underline cursor-pointer">
              {player.currentSong.title}
            </h4>
            <p className="text-gray-400 text-xs truncate hover:underline cursor-pointer">
              {player.currentSong.artist}
            </p>
          </div>
          <button
            onClick={handleLikeToggle}
            className={clsx(
              'p-2 transition-colors',
              isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
            )}
          >
            <Heart className={clsx('w-4 h-4', isLiked && 'fill-current')} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <PictureInPicture2 className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/2 max-w-2xl">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={shuffleToggle}
              className={clsx(
                'p-2 transition-colors',
                player.shuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'
              )}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={skipPrevious}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playPause}
              className="bg-white hover:bg-gray-200 text-black rounded-full p-2 transition-colors"
            >
              {player.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={skipNext}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>

            <button
              onClick={repeatToggle}
              className={clsx(
                'p-2 transition-colors relative',
                player.repeat !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              )}
            >
              <Repeat className="w-4 h-4" />
              {player.repeat === 'track' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(player.currentTime)}
            </span>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer group"
            >
              <div
                className="bg-white rounded-full h-1 relative group-hover:bg-green-500 transition-colors"
                style={{
                  width: `${player.duration > 0 ? (player.currentTime / player.duration) * 100 : 0}%`
                }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(player.duration)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button
            onClick={handleShowLyrics}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Mic2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleToggleQueue}
            className={clsx(
              'p-2 transition-colors',
              showQueue ? 'text-green-500' : 'text-gray-400 hover:text-white'
            )}
          >
            <List className="w-4 h-4" />
          </button>

          <button
            onClick={handleShowEqualizer}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={handleShowSleepTimer}
            className={clsx(
              'p-2 transition-colors',
              player.sleepTimer > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'
            )}
          >
            <Clock className="w-4 h-4" />
          </button>

          <Volume2 className="w-4 h-4 text-gray-400" />
          <div
            ref={volumeRef}
            onClick={handleVolumeClick}
            className="w-20 bg-gray-600 rounded-full h-1 cursor-pointer group"
          >
            <div
              className="bg-white rounded-full h-1 relative group-hover:bg-green-500 transition-colors"
              style={{ width: `${player.volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;