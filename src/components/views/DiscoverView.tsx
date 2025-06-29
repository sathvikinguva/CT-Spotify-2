import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Compass, TrendingUp, Calendar, Users, Radio, Zap, Globe, Heart, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import SongCard from '../common/SongCard';
import AlbumCard from '../common/AlbumCard';
import PlaylistCard from '../common/PlaylistCard';
import { usePlayer } from '../../hooks/usePlayer';

const DiscoverView: React.FC = () => {
  const { songs, albums, playlists } = useSelector((state: RootState) => state.music);
  const { player, playSong, playPause } = usePlayer();
  const [selectedMood, setSelectedMood] = useState('energetic');

  const moods = [
    { id: 'energetic', name: 'Energetic', color: 'from-red-500 to-orange-500', icon: Zap },
    { id: 'chill', name: 'Chill', color: 'from-blue-500 to-cyan-500', icon: Heart },
    { id: 'focus', name: 'Focus', color: 'from-purple-500 to-pink-500', icon: Compass },
    { id: 'party', name: 'Party', color: 'from-green-500 to-teal-500', icon: Users },
    { id: 'workout', name: 'Workout', color: 'from-yellow-500 to-red-500', icon: TrendingUp },
    { id: 'sleep', name: 'Sleep', color: 'from-indigo-500 to-purple-500', icon: Globe },
  ];

  const trendingSongs = songs.slice(0, 10);
  const newReleases = albums.slice(0, 6);
  const featuredPlaylists = playlists.slice(0, 6);

  const radioStations = [
    { id: '1', name: 'Pop Radio', description: 'The biggest pop hits', listeners: 2500000 },
    { id: '2', name: 'Rock Classics', description: 'Timeless rock anthems', listeners: 1800000 },
    { id: '3', name: 'Hip-Hop Central', description: 'Latest hip-hop bangers', listeners: 3200000 },
    { id: '4', name: 'Indie Vibes', description: 'Discover indie gems', listeners: 950000 },
  ];

  return (
    <div className="p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <Compass className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Discover</h1>
      </motion.div>

      {/* Mood & Activity */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Music for every mood</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMood(mood.id)}
              className={`bg-gradient-to-br ${mood.color} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform ${
                selectedMood === mood.id ? 'ring-2 ring-white' : ''
              }`}
            >
              <mood.icon className="w-8 h-8 text-white mb-3" />
              <h3 className="text-white font-bold">{mood.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Radio Stations */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Radio className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">Radio Stations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {radioStations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <button className="opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-green-400 text-black rounded-full p-2 transition-all">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <h3 className="text-white font-semibold mb-1">{station.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{station.description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1" />
                <span>{station.listeners.toLocaleString()} listeners</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
        </div>
        <div className="space-y-1">
          {trendingSongs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <SongCard
                song={song}
                songs={trendingSongs}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-white">New Releases</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {newReleases.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AlbumCard album={album} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PlaylistCard playlist={playlist} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiscoverView;