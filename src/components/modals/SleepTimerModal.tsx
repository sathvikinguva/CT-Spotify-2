import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Clock, Play, Pause } from 'lucide-react';
import { RootState } from '../../store';
import { setShowSleepTimerModal } from '../../store/slices/uiSlice';
import { setSleepTimer } from '../../store/slices/playerSlice';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const SleepTimerModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showSleepTimerModal } = useSelector((state: RootState) => state.ui);
  const { sleepTimer } = useSelector((state: RootState) => state.player);
  
  const [selectedTime, setSelectedTime] = useState(30);
  const [customTime, setCustomTime] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const presetTimes = [15, 30, 45, 60, 90, 120];

  const handleClose = () => {
    dispatch(setShowSleepTimerModal(false));
  };

  const handleSetTimer = () => {
    const minutes = isCustom ? parseInt(customTime) : selectedTime;
    if (minutes > 0) {
      dispatch(setSleepTimer(minutes * 60)); // Convert to seconds
      toast.success(`Sleep timer set for ${minutes} minutes`);
      handleClose();
    }
  };

  const handleCancelTimer = () => {
    dispatch(setSleepTimer(0));
    toast.success('Sleep timer cancelled');
    handleClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showSleepTimerModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-lg w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-white">Sleep Timer</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {sleepTimer > 0 ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-green-500 mb-2">
                    {formatTime(sleepTimer)}
                  </div>
                  <p className="text-gray-400">Music will stop automatically</p>
                </div>
                <button
                  onClick={handleCancelTimer}
                  className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Cancel Timer
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Set Timer</h3>
                  
                  {/* Preset Times */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {presetTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => {
                          setSelectedTime(time);
                          setIsCustom(false);
                        }}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          !isCustom && selectedTime === time
                            ? 'border-green-500 bg-green-500 bg-opacity-20 text-green-500'
                            : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {time} min
                      </button>
                    ))}
                  </div>

                  {/* Custom Time */}
                  <div className="mb-6">
                    <label className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        checked={isCustom}
                        onChange={() => setIsCustom(true)}
                        className="text-green-500"
                      />
                      <span className="text-white">Custom time</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={customTime}
                        onChange={(e) => {
                          setCustomTime(e.target.value);
                          setIsCustom(true);
                        }}
                        placeholder="Enter minutes"
                        min="1"
                        max="480"
                        className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 border border-gray-700 focus:border-green-500 focus:outline-none"
                      />
                      <span className="text-gray-400">minutes</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSetTimer}
                    className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-lg transition-colors"
                  >
                    Start Timer
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SleepTimerModal;