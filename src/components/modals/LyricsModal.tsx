import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Music, Maximize2, Minimize2 } from 'lucide-react';
import { RootState } from '../../store';
import { setShowLyricsModal } from '../../store/slices/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

const LyricsModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showLyricsModal } = useSelector((state: RootState) => state.ui);
  const { currentSong, currentTime } = useSelector((state: RootState) => state.player);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock lyrics data - in a real app, this would come from an API
  const mockLyrics = [
    { time: 0, text: "Yeah, I've been feeling so down" },
    { time: 5, text: "It's like I don't even know myself" },
    { time: 10, text: "Sometimes I just want to scream" },
    { time: 15, text: "But I know that won't help" },
    { time: 20, text: "So I keep it all inside" },
    { time: 25, text: "Hoping things will change" },
    { time: 30, text: "But every day feels the same" },
    { time: 35, text: "Like I'm stuck in this cage" },
    { time: 40, text: "But I know I'll find my way" },
    { time: 45, text: "Through the darkness and the pain" },
    { time: 50, text: "I'll keep pushing every day" },
    { time: 55, text: "Until I see the sun again" },
  ];

  const getCurrentLyricIndex = () => {
    for (let i = mockLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= mockLyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const handleClose = () => {
    dispatch(setShowLyricsModal(false));
  };

  if (!showLyricsModal || !currentSong) return null;

  const currentLyricIndex = getCurrentLyricIndex();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden ${
            isFullscreen ? 'w-full h-full' : 'w-full max-w-2xl mx-4 max-h-[80vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{currentSong.title}</h2>
                  <p className="text-gray-400">{currentSong.artist}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
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

          {/* Lyrics */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-4 text-center">
              {mockLyrics.map((lyric, index) => (
                <motion.p
                  key={index}
                  className={`text-lg transition-all duration-300 ${
                    index === currentLyricIndex
                      ? 'text-white font-semibold text-2xl'
                      : index < currentLyricIndex
                      ? 'text-gray-500'
                      : 'text-gray-400'
                  }`}
                  animate={{
                    scale: index === currentLyricIndex ? 1.1 : 1,
                    opacity: index === currentLyricIndex ? 1 : 0.7,
                  }}
                >
                  {lyric.text}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LyricsModal;