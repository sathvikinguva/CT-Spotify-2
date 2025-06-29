import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Users, MessageCircle, Share2, Heart, Play, UserPlus, Activity, Music, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../../hooks/usePlayer';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  currentSong?: {
    title: string;
    artist: string;
    coverUrl: string;
  };
  lastActive: string;
}

interface Activity {
  id: string;
  user: Friend;
  type: 'liked' | 'played' | 'shared' | 'followed';
  content: {
    title: string;
    artist?: string;
    coverUrl: string;
  };
  timestamp: string;
}

const SocialView: React.FC = () => {
  const { songs } = useSelector((state: RootState) => state.music);
  const { playSong } = usePlayer();
  const [activeTab, setActiveTab] = useState<'friends' | 'activity' | 'discover'>('friends');

  const friends: Friend[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      isOnline: true,
      currentSong: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      lastActive: 'now'
    },
    {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      isOnline: true,
      currentSong: {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        coverUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      lastActive: 'now'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
      isOnline: false,
      lastActive: '2 hours ago'
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      isOnline: false,
      lastActive: '1 day ago'
    }
  ];

  const activities: Activity[] = [
    {
      id: '1',
      user: friends[0],
      type: 'liked',
      content: {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      user: friends[1],
      type: 'shared',
      content: {
        title: 'My Chill Playlist',
        coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      user: friends[2],
      type: 'played',
      content: {
        title: 'Someone Like You',
        artist: 'Adele',
        coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      timestamp: '1 hour ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'liked': return <Heart className="w-4 h-4 text-red-500" />;
      case 'played': return <Play className="w-4 h-4 text-green-500" />;
      case 'shared': return <Share2 className="w-4 h-4 text-blue-500" />;
      case 'followed': return <UserPlus className="w-4 h-4 text-purple-500" />;
      default: return <Music className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'liked': return `liked "${activity.content.title}"`;
      case 'played': return `played "${activity.content.title}"`;
      case 'shared': return `shared "${activity.content.title}"`;
      case 'followed': return `followed ${activity.content.title}`;
      default: return 'did something';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <Users className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Social</h1>
      </motion.div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {[
          { id: 'friends', label: 'Friends', icon: Users },
          { id: 'activity', label: 'Activity', icon: Activity },
          { id: 'discover', label: 'Discover People', icon: UserPlus }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-green-500 text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Friends ({friends.length})</h2>
          <div className="space-y-3">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                      friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold">{friend.name}</h3>
                    {friend.currentSong ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <img
                          src={friend.currentSong.coverUrl}
                          alt={friend.currentSong.title}
                          className="w-6 h-6 rounded"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-green-500 text-sm truncate">
                            {friend.currentSong.title}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            by {friend.currentSong.artist}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        <Clock className="w-3 h-3" />
                        <span>Last seen {friend.lastActive}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {friend.currentSong && (
                      <button
                        onClick={() => playSong(songs[0], songs)}
                        className="p-2 bg-green-500 hover:bg-green-400 text-black rounded-full transition-colors"
                      >
                        <Play className="w-4 h-4 ml-0.5" />
                      </button>
                    )}
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Friend Activity</h2>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{activity.user.name}</span>
                      {getActivityIcon(activity.type)}
                      <span className="text-gray-400 text-sm">
                        {getActivityText(activity)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{activity.timestamp}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src={activity.content.coverUrl}
                      alt={activity.content.title}
                      className="w-12 h-12 rounded"
                    />
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Discover People Tab */}
      {activeTab === 'discover' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Discover People</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900 rounded-lg p-6 text-center"
              >
                <img
                  src={`https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                  alt={`User ${i}`}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h3 className="text-white font-semibold mb-2">Music Lover {i}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {Math.floor(Math.random() * 50) + 10} mutual friends
                </p>
                <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-full transition-colors">
                  Follow
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialView;