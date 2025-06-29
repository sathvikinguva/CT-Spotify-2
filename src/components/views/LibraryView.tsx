import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import PlaylistCard from '../common/PlaylistCard';
import AlbumCard from '../common/AlbumCard';
import SongCard from '../common/SongCard';
import { Heart, Music, Disc, Download, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const LibraryView: React.FC = () => {
  const navigate = useNavigate();
  const { playlists, albums, songs, recentlyPlayed } = useSelector((state: RootState) => state.music);
  const { likedSongs } = useSelector((state: RootState) => state.user);

  const likedSongsData = songs.filter(song => likedSongs.includes(song.id));

  const quickAccessItems = [
    {
      title: 'Liked Songs',
      subtitle: `${likedSongsData.length} songs`,
      icon: Heart,
      gradient: 'from-purple-700 to-purple-900',
      iconColor: 'text-white fill-current',
      onClick: () => navigate('/library')
    },
    {
      title: 'Recently Played',
      subtitle: 'Your listening history',
      icon: Clock,
      gradient: 'from-green-700 to-green-900',
      iconColor: 'text-white',
      onClick: () => {}
    },
    {
      title: 'Downloaded Music',
      subtitle: 'Available offline',
      icon: Download,
      gradient: 'from-blue-700 to-blue-900',
      iconColor: 'text-white',
      onClick: () => {}
    },
    {
      title: 'Top Charts',
      subtitle: 'What\'s trending',
      icon: TrendingUp,
      gradient: 'from-red-700 to-red-900',
      iconColor: 'text-white',
      onClick: () => {}
    },
    {
      title: 'Made for You',
      subtitle: 'Discover new music',
      icon: Music,
      gradient: 'from-orange-700 to-orange-900',
      iconColor: 'text-white',
      onClick: () => {}
    },
    {
      title: 'Albums',
      subtitle: 'Your collection',
      icon: Disc,
      gradient: 'from-pink-700 to-pink-900',
      iconColor: 'text-white',
      onClick: () => {}
    }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8 pb-32">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            Your Library
          </motion.h1>
        </div>

        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickAccessItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={item.onClick}
                className={`bg-gradient-to-br ${item.gradient} rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform`}
              >
                <item.icon className={`w-12 h-12 mb-4 ${item.iconColor}`} />
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
                <p className="text-gray-200 opacity-80">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recently Created */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recently created</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {[...playlists]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 10)
                .map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-48"
                  >
                    <PlaylistCard playlist={playlist} />
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Your Playlists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Your playlists</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-48"
                >
                  <PlaylistCard playlist={playlist} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Albums */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {albums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-48"
                >
                  <AlbumCard album={album} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Recently played</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
                {recentlyPlayed.slice(0, 10).map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition-colors cursor-pointer flex-shrink-0 w-48"
                  >
                    <div className="relative mb-4">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-1 truncate">{song.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Liked Songs */}
        {likedSongsData.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Liked Songs</h2>
            <div className="space-y-1">
              {likedSongsData.slice(0, 10).map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard
                    song={song}
                    songs={likedSongsData}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LibraryView;