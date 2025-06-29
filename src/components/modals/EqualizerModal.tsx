import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, RotateCcw, Save } from 'lucide-react';
import { RootState } from '../../store';
import { setShowEqualizerModal } from '../../store/slices/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

const EqualizerModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showEqualizerModal } = useSelector((state: RootState) => state.ui);
  
  const [frequencies, setFrequencies] = useState({
    '60': 0,
    '170': 0,
    '310': 0,
    '600': 0,
    '1000': 0,
    '3000': 0,
    '6000': 0,
    '12000': 0,
    '14000': 0,
    '16000': 0
  });

  const [selectedPreset, setSelectedPreset] = useState('flat');

  const presets = {
    flat: { '60': 0, '170': 0, '310': 0, '600': 0, '1000': 0, '3000': 0, '6000': 0, '12000': 0, '14000': 0, '16000': 0 },
    rock: { '60': 5, '170': 3, '310': -2, '600': -3, '1000': -1, '3000': 2, '6000': 4, '12000': 6, '14000': 6, '16000': 6 },
    pop: { '60': -1, '170': 2, '310': 4, '600': 4, '1000': 2, '3000': -1, '6000': -2, '12000': -1, '14000': 0, '16000': 0 },
    jazz: { '60': 3, '170': 2, '310': 1, '600': 2, '1000': -1, '3000': -1, '6000': 0, '12000': 1, '14000': 2, '16000': 3 },
    classical: { '60': 4, '170': 3, '310': -1, '600': -1, '1000': -1, '3000': -1, '6000': -2, '12000': 2, '14000': 3, '16000': 4 },
    bass: { '60': 8, '170': 6, '310': 4, '600': 2, '1000': 0, '3000': -1, '6000': -2, '12000': -3, '14000': -3, '16000': -3 },
    treble: { '60': -3, '170': -3, '310': -2, '600': -1, '1000': 0, '3000': 2, '6000': 4, '12000': 6, '14000': 8, '16000': 8 },
    vocal: { '60': -2, '170': -1, '310': 1, '600': 3, '1000': 4, '3000': 4, '6000': 3, '12000': 1, '14000': 0, '16000': -1 }
  };

  const handleClose = () => {
    dispatch(setShowEqualizerModal(false));
  };

  const handleFrequencyChange = (freq: string, value: number) => {
    setFrequencies(prev => ({ ...prev, [freq]: value }));
    setSelectedPreset('custom');
  };

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    setFrequencies(presets[preset as keyof typeof presets]);
  };

  const handleReset = () => {
    setFrequencies(presets.flat);
    setSelectedPreset('flat');
  };

  const handleSave = () => {
    // In a real app, this would save the EQ settings
    handleClose();
  };

  if (!showEqualizerModal) return null;

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
          className="bg-gray-900 rounded-lg w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Equalizer</h2>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Presets */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Presets</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(presets).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetChange(preset)}
                    className={`px-4 py-2 rounded-full capitalize transition-colors ${
                      selectedPreset === preset
                        ? 'bg-green-500 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
                {selectedPreset === 'custom' && (
                  <span className="px-4 py-2 bg-blue-500 text-white rounded-full">
                    Custom
                  </span>
                )}
              </div>
            </div>

            {/* Equalizer Sliders */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Frequency Bands</h3>
              <div className="flex items-end justify-between space-x-2 h-64 bg-gray-800 rounded-lg p-4">
                {Object.entries(frequencies).map(([freq, value]) => (
                  <div key={freq} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="text-xs text-gray-400 font-mono">
                      {value > 0 ? '+' : ''}{value}dB
                    </div>
                    <div className="relative h-48 w-8">
                      <input
                        type="range"
                        min="-12"
                        max="12"
                        step="1"
                        value={value}
                        onChange={(e) => handleFrequencyChange(freq, parseInt(e.target.value))}
                        className="absolute inset-0 w-48 h-8 origin-center rotate-90 transform translate-x-20 -translate-y-20 appearance-none bg-transparent cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #374151 0%, #374151 ${((value + 12) / 24) * 100}%, #10b981 ${((value + 12) / 24) * 100}%, #10b981 100%)`
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-2 bg-green-500 rounded-full transition-all duration-200"
                          style={{ height: `${Math.abs(value) * 8 + 8}px` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {freq === '1000' ? '1K' : freq === '3000' ? '3K' : freq === '6000' ? '6K' : freq === '12000' ? '12K' : freq === '14000' ? '14K' : freq === '16000' ? '16K' : freq}
                      {freq !== '1000' && freq !== '3000' && freq !== '6000' && freq !== '12000' && freq !== '14000' && freq !== '16000' ? 'Hz' : 'Hz'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EqualizerModal;