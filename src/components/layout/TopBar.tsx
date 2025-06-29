import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, User, Menu, Bell, Settings } from 'lucide-react';
import { RootState } from '../../store';
import { toggleSidebar, setShowSettingsModal } from '../../store/slices/uiSlice';
import { setSearchQuery } from '../../store/slices/musicSlice';
import { motion } from 'framer-motion';

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { searchQuery } = useSelector((state: RootState) => state.music);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    if (e.target.value && location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleSettings = () => {
    dispatch(setShowSettingsModal(true));
  };

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm border-b border-gray-800 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-black bg-opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleForward}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full bg-black bg-opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-white bg-opacity-10 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-full w-96 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-full transition-colors"
          >
            Upgrade
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleSettings}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-1 transition-colors cursor-pointer"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full"
              />
            ) : (
              <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
            <span className="text-white text-sm font-medium pr-2">
              {currentUser?.name || 'User'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;