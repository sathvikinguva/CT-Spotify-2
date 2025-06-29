import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import PlaylistCard from '../common/PlaylistCard';
import AlbumCard from '../common/AlbumCard';
import SongCard from '../common/SongCard';
import { motion } from 'framer-motion';

const HomeView: React.FC = () => {
  const { playlists, albums, songs } = useSelector((state: RootState) => state.music);
  const { recentlyPlayed } = useSelector((state: RootState) => state.music);

  const topPlaylists = playlists.slice(0, 6);
  const topAlbums = albums.slice(0, 6);
  const topSongs = songs.slice(0, 6);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            {getGreeting()}
          </h1>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {topPlaylists.slice(0, 6).map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 hover:bg-gray-700 rounded-md flex items-center transition-colors cursor-pointer group"
              >
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-16 h-16 rounded-l-md flex-shrink-0"
                />
                <span className="text-white font-semibold ml-4 truncate">
                  {playlist.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                    transition={{ delay: index * 0.05 }}
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

        {/* Made for You */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Made for you</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {topPlaylists.map((playlist, index) => (
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

        {/* Popular Albums */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Popular albums</h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
              {topAlbums.map((album, index) => (
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

        {/* Popular Songs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Popular songs</h2>
          <div className="space-y-1">
            {topSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SongCard
                  song={song}
                  songs={topSongs}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeView;