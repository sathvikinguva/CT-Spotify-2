import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart, Music, Download, Settings, Compass, Users, Mic, BarChart3 } from 'lucide-react';
import { RootState } from '../../store';
import { setShowCreatePlaylistModal, setShowSettingsModal } from '../../store/slices/uiSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { playlists } = useSelector((state: RootState) => state.music);

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Users, label: 'Social', path: '/social' },
    { icon: Mic, label: 'Podcasts', path: '/podcasts' },
    { icon: BarChart3, label: 'Your Stats', path: '/stats' },
  ];

  const handleCreatePlaylist = () => {
    dispatch(setShowCreatePlaylistModal(true));
  };

  const handleSettings = () => {
    dispatch(setShowSettingsModal(true));
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={clsx(
        'bg-black text-white h-full flex flex-col transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center">
          <Music className="w-8 h-8 text-green-500" />
          {!sidebarCollapsed && (
            <span className="ml-2 text-xl font-bold">Spotify 2.0</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 flex-shrink-0">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={clsx(
                'flex items-center w-full p-3 rounded-lg transition-colors',
                isActive(item.path)
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              )}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="ml-4 font-medium truncate">{item.label}</span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Library Section */}
      {!sidebarCollapsed && (
        <div className="flex-1 px-6 pb-6 overflow-hidden flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 mt-6 flex-shrink-0">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
              Playlists
            </h3>
            <button
              onClick={handleCreatePlaylist}
              className="p-1 text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="space-y-1 pr-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/library')}
                className="flex items-center w-full p-2 text-gray-400 hover:text-white transition-colors rounded"
              >
                <Heart className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                <span className="truncate">Liked Songs</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center w-full p-2 text-gray-400 hover:text-white transition-colors rounded"
              >
                <Download className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="truncate">Downloaded</span>
              </motion.button>

              {/* Playlists with proper scrolling */}
              {playlists.map((playlist) => (
                <motion.button
                  key={playlist.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className={clsx(
                    'flex items-center w-full p-2 transition-colors rounded group',
                    location.pathname === `/playlist/${playlist.id}`
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  )}
                >
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-5 h-5 mr-3 rounded flex-shrink-0"
                  />
                  <span className="truncate text-left">{playlist.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Settings - Fixed at bottom */}
          <div className="pt-4 border-t border-gray-800 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleSettings}
              className="flex items-center w-full p-2 text-gray-400 hover:text-white transition-colors rounded"
            >
              <Settings className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* Collapsed state tooltips */}
      {sidebarCollapsed && (
        <div className="flex-1 px-2 pb-6 overflow-y-auto">
          <div className="space-y-2 mt-6">
            <div className="relative group">
              <button
                onClick={() => navigate('/library')}
                className="w-full p-3 text-gray-400 hover:text-white transition-colors rounded-lg flex justify-center"
              >
                <Heart className="w-6 h-6 text-green-500" />
              </button>
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Liked Songs
              </div>
            </div>

            <div className="relative group">
              <button className="w-full p-3 text-gray-400 hover:text-white transition-colors rounded-lg flex justify-center">
                <Download className="w-6 h-6 text-blue-500" />
              </button>
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Downloaded
              </div>
            </div>

            {playlists.slice(0, 8).map((playlist) => (
              <div key={playlist.id} className="relative group">
                <button
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className={clsx(
                    'w-full p-3 transition-colors rounded-lg flex justify-center',
                    location.pathname === `/playlist/${playlist.id}`
                      ? 'text-white bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  )}
                >
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-6 h-6 rounded"
                  />
                </button>
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {playlist.name}
                </div>
              </div>
            ))}

            <div className="relative group mt-4 pt-4 border-t border-gray-800">
              <button
                onClick={handleSettings}
                className="w-full p-3 text-gray-400 hover:text-white transition-colors rounded-lg flex justify-center"
              >
                <Settings className="w-6 h-6" />
              </button>
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Settings
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;