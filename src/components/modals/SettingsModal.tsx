import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Volume2, Headphones, Smartphone, Laptop, Settings, Bell, Shield, Palette } from 'lucide-react';
import { RootState } from '../../store';
import { setShowSettingsModal } from '../../store/slices/uiSlice';
import { updateSettings } from '../../store/slices/userSlice';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showSettingsModal } = useSelector((state: RootState) => state.ui);
  const { settings } = useSelector((state: RootState) => state.user);
  
  const [activeTab, setActiveTab] = useState('audio');
  const [localSettings, setLocalSettings] = useState(settings);

  const handleClose = () => {
    dispatch(setShowSettingsModal(false));
  };

  const handleSave = () => {
    dispatch(updateSettings(localSettings));
    handleClose();
  };

  const updateSetting = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!showSettingsModal) return null;

  const tabs = [
    { id: 'audio', label: 'Audio Quality', icon: Volume2 },
    { id: 'devices', label: 'Devices', icon: Headphones },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

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
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-black'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'audio' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Audio Quality</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Streaming Quality</label>
                      <select
                        value={localSettings.audioQuality}
                        onChange={(e) => updateSetting('audioQuality', e.target.value)}
                        className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700"
                      >
                        <option value="low">Low (96 kbps)</option>
                        <option value="normal">Normal (160 kbps)</option>
                        <option value="high">High (320 kbps)</option>
                        <option value="very-high">Very High (Lossless)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Download Quality</label>
                      <select
                        value={localSettings.downloadQuality}
                        onChange={(e) => updateSetting('downloadQuality', e.target.value)}
                        className="w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700"
                      >
                        <option value="normal">Normal (160 kbps)</option>
                        <option value="high">High (320 kbps)</option>
                        <option value="very-high">Very High (Lossless)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Normalize Volume</h4>
                        <p className="text-gray-400 text-sm">Set the same volume level for all tracks</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSettings.normalizeVolume}
                          onChange={(e) => updateSetting('normalizeVolume', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'devices' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Devices</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Laptop className="w-8 h-8 text-green-500" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">This Computer</h4>
                          <p className="text-gray-400 text-sm">Currently active</p>
                        </div>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 opacity-60">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-8 h-8 text-gray-400" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">iPhone</h4>
                          <p className="text-gray-400 text-sm">Last seen 2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Notifications</h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'newReleases', label: 'New Releases', desc: 'Get notified about new music from artists you follow' },
                      { key: 'playlistUpdates', label: 'Playlist Updates', desc: 'When someone adds songs to your collaborative playlists' },
                      { key: 'friendActivity', label: 'Friend Activity', desc: 'See what your friends are listening to' },
                      { key: 'recommendations', label: 'Recommendations', desc: 'Personalized music suggestions' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{item.label}</h4>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.notifications?.[item.key] || false}
                            onChange={(e) => updateSetting('notifications', {
                              ...localSettings.notifications,
                              [item.key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Privacy</h3>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'shareActivity', label: 'Share my activity', desc: 'Let others see what you\'re listening to' },
                      { key: 'showInSearch', label: 'Show in search', desc: 'Allow others to find your profile in search' },
                      { key: 'allowFollowers', label: 'Allow followers', desc: 'Let people follow your public playlists' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{item.label}</h4>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.privacy?.[item.key] || false}
                            onChange={(e) => updateSetting('privacy', {
                              ...localSettings.privacy,
                              [item.key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Appearance</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['dark', 'light', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => updateSetting('theme', theme)}
                            className={`p-4 rounded-lg border-2 transition-colors ${
                              localSettings.theme === theme
                                ? 'border-green-500 bg-green-500 bg-opacity-20'
                                : 'border-gray-600 bg-gray-800'
                            }`}
                          >
                            <div className="text-white font-medium capitalize">{theme}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Accent Color</label>
                      <div className="grid grid-cols-6 gap-3">
                        {['green', 'blue', 'purple', 'pink', 'orange', 'red'].map((color) => (
                          <button
                            key={color}
                            onClick={() => updateSetting('accentColor', color)}
                            className={`w-12 h-12 rounded-full border-2 ${
                              localSettings.accentColor === color ? 'border-white' : 'border-gray-600'
                            }`}
                            style={{ backgroundColor: `var(--color-${color}-500)` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;