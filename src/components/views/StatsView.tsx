import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BarChart3, Clock, Calendar, TrendingUp, Music, Headphones, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsView: React.FC = () => {
  const { songs } = useSelector((state: RootState) => state.music);
  const { likedSongs } = useSelector((state: RootState) => state.user);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock data - in a real app, this would come from analytics
  const stats = {
    totalListeningTime: 12450, // minutes
    songsPlayed: 1247,
    artistsDiscovered: 89,
    genresExplored: 12,
    streakDays: 23,
    topGenres: [
      { name: 'Pop', percentage: 35, color: 'bg-pink-500' },
      { name: 'Rock', percentage: 28, color: 'bg-red-500' },
      { name: 'Hip-Hop', percentage: 20, color: 'bg-purple-500' },
      { name: 'Electronic', percentage: 12, color: 'bg-blue-500' },
      { name: 'Jazz', percentage: 5, color: 'bg-yellow-500' }
    ],
    topArtists: [
      { name: 'The Weeknd', plays: 156, image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Ed Sheeran', plays: 134, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Adele', plays: 98, image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Queen', plays: 87, image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Michael Jackson', plays: 76, image: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=100' }
    ],
    topSongs: songs.slice(0, 5).map((song, index) => ({
      ...song,
      plays: 200 - index * 30
    })),
    listeningHours: [
      { hour: '6AM', plays: 12 },
      { hour: '9AM', plays: 45 },
      { hour: '12PM', plays: 67 },
      { hour: '3PM', plays: 89 },
      { hour: '6PM', plays: 134 },
      { hour: '9PM', plays: 156 },
      { hour: '12AM', plays: 78 }
    ]
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const achievements = [
    { id: 1, title: 'Music Explorer', description: 'Discovered 50+ new artists', icon: Target, unlocked: true },
    { id: 2, title: 'Night Owl', description: 'Listened to music after midnight 10 times', icon: Clock, unlocked: true },
    { id: 3, title: 'Genre Master', description: 'Explored 10+ different genres', icon: Music, unlocked: true },
    { id: 4, title: 'Streak Master', description: 'Listened to music for 30 consecutive days', icon: Award, unlocked: false },
  ];

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-white">Your Stats</h1>
        </div>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                timeRange === range
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Listening Time', value: formatTime(stats.totalListeningTime), icon: Clock, color: 'from-blue-500 to-cyan-500' },
          { title: 'Songs Played', value: stats.songsPlayed.toLocaleString(), icon: Music, color: 'from-green-500 to-teal-500' },
          { title: 'Artists Discovered', value: stats.artistsDiscovered, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
          { title: 'Current Streak', value: `${stats.streakDays} days`, icon: Award, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm opacity-80">{stat.title}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-white opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Genres */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Top Genres</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="space-y-4">
            {stats.topGenres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <span className="text-white font-medium w-20">{genre.name}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${genre.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                    className={`h-full ${genre.color} rounded-full`}
                  />
                </div>
                <span className="text-gray-400 text-sm w-12">{genre.percentage}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Top Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.topArtists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 text-center transition-colors"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-white font-semibold mb-1">{artist.name}</h3>
              <p className="text-gray-400 text-sm">{artist.plays} plays</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Listening Hours */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Listening Patterns</h2>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-end space-x-2 h-40">
            {stats.listeningHours.map((hour, index) => (
              <motion.div
                key={hour.hour}
                initial={{ height: 0 }}
                animate={{ height: `${(hour.plays / 156) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="flex-1 bg-green-500 rounded-t flex flex-col justify-end items-center"
              >
                <span className="text-white text-xs font-medium mb-2">{hour.plays}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {stats.listeningHours.map((hour) => (
              <span key={hour.hour} className="text-gray-400 text-xs">{hour.hour}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg p-6 text-center ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                  : 'bg-gray-900 opacity-60'
              }`}
            >
              <achievement.icon className={`w-12 h-12 mx-auto mb-3 ${
                achievement.unlocked ? 'text-white' : 'text-gray-500'
              }`} />
              <h3 className={`font-bold mb-2 ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm ${
                achievement.unlocked ? 'text-white opacity-80' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StatsView;