import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Music, MoreHorizontal, Trash2 } from 'lucide-react';
import { RootState } from '../../store';
import { setShowQueue } from '../../store/slices/uiSlice';
import { removeFromQueue, clearQueue, reorderQueue } from '../../store/slices/playerSlice';
import { usePlayer } from '../../hooks/usePlayer';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const QueueSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { player, playSong, formatTime } = usePlayer();
  const { queue, currentSong } = player;

  const handleClose = () => {
    dispatch(setShowQueue(false));
  };

  const handleSongClick = (song: any, index: number) => {
    playSong(song, queue);
  };

  const handleRemoveFromQueue = (songId: string) => {
    dispatch(removeFromQueue(songId));
  };

  const handleClearQueue = () => {
    dispatch(clearQueue());
  };

  const currentIndex = queue.findIndex(song => song.id === currentSong?.id);
  const upNext = queue.slice(currentIndex + 1);

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: 300 }}
      className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col h-full"
    >
      {/* Header - Fixed */}
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Queue</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearQueue}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Clear queue"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Now Playing */}
        {currentSong && (
          <div className="p-4 border-b border-gray-800 flex-shrink-0">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Now Playing</h3>
            <div className="flex items-center space-x-3">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-12 h-12 rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{currentSong.title}</h4>
                <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
              </div>
              <div className="flex items-center flex-shrink-0">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Up Next */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Up Next ({upNext.length})
          </h3>
          
          <AnimatePresence>
            {upNext.length === 0 ? (
              <div className="text-center py-8">
                <Music className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No songs in queue</p>
                <p className="text-gray-500 text-sm">Add songs to see them here</p>
              </div>
            ) : (
              <div className="space-y-2 pr-2">
                {upNext.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="group flex items-center space-x-3 p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleSongClick(song, currentIndex + 1 + index)}
                  >
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {song.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs flex-shrink-0">
                      {formatTime(song.duration)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromQueue(song.id);
                      }}
                      className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default QueueSidebar;