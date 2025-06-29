import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Mic, Play, Pause, Download, Star, Clock, Calendar, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  coverUrl: string;
  category: string;
  rating: number;
  subscribers: number;
  episodes: Episode[];
}

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: number;
  publishDate: string;
  isPlayed: boolean;
  isDownloaded: boolean;
}

const PodcastView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const categories = [
    'All', 'Technology', 'Business', 'Comedy', 'Education', 'Health', 'News', 'Sports'
  ];

  const podcasts: Podcast[] = [
    {
      id: '1',
      title: 'Tech Talk Daily',
      host: 'Sarah Johnson',
      description: 'Daily insights into the latest technology trends and innovations.',
      coverUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Technology',
      rating: 4.8,
      subscribers: 125000,
      episodes: [
        {
          id: '1',
          title: 'The Future of AI in 2024',
          description: 'Exploring the latest developments in artificial intelligence and machine learning.',
          duration: 2400,
          publishDate: '2024-01-15',
          isPlayed: false,
          isDownloaded: true
        },
        {
          id: '2',
          title: 'Blockchain Revolution',
          description: 'How blockchain technology is transforming industries.',
          duration: 1800,
          publishDate: '2024-01-14',
          isPlayed: true,
          isDownloaded: false
        }
      ]
    },
    {
      id: '2',
      title: 'Business Insights',
      host: 'Michael Chen',
      description: 'Strategic insights for modern entrepreneurs and business leaders.',
      coverUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Business',
      rating: 4.6,
      subscribers: 89000,
      episodes: [
        {
          id: '3',
          title: 'Scaling Your Startup',
          description: 'Essential strategies for growing your business from startup to scale.',
          duration: 2700,
          publishDate: '2024-01-13',
          isPlayed: false,
          isDownloaded: false
        }
      ]
    },
    {
      id: '3',
      title: 'Comedy Central',
      host: 'Emma Wilson',
      description: 'Hilarious conversations and comedy sketches to brighten your day.',
      coverUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Comedy',
      rating: 4.9,
      subscribers: 203000,
      episodes: [
        {
          id: '4',
          title: 'Stand-up Stories',
          description: 'Behind the scenes stories from famous comedians.',
          duration: 3600,
          publishDate: '2024-01-12',
          isPlayed: false,
          isDownloaded: true
        }
      ]
    }
  ];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const handlePlayPause = (episodeId: string) => {
    setIsPlaying(isPlaying === episodeId ? null : episodeId);
  };

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <Mic className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Podcasts</h1>
      </motion.div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.toLowerCase()
                ? 'bg-green-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Podcasts */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">Trending Podcasts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast, index) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-6 transition-colors cursor-pointer"
            >
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={podcast.coverUrl}
                  alt={podcast.title}
                  className="w-20 h-20 rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1 truncate">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">by {podcast.host}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>{podcast.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{podcast.subscribers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {podcast.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                  {podcast.category}
                </span>
                <button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-4 py-2 rounded-full transition-colors">
                  Subscribe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Episodes */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recent Episodes</h2>
        <div className="space-y-4">
          {podcasts.flatMap(podcast => 
            podcast.episodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={podcast.coverUrl}
                      alt={podcast.title}
                      className="w-16 h-16 rounded-lg"
                    />
                    <button
                      onClick={() => handlePlayPause(episode.id)}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {isPlaying === episode.id ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1 truncate">
                      {episode.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                      {episode.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{podcast.title}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(episode.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDuration(episode.duration)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {episode.isPlayed && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        episode.isDownloaded
                          ? 'text-green-500 bg-green-500 bg-opacity-20'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PodcastView;