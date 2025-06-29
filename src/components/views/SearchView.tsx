import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SongCard from '../common/SongCard';
import AlbumCard from '../common/AlbumCard';
import PlaylistCard from '../common/PlaylistCard';
import { genres } from '../../data/mockData';
import { motion } from 'framer-motion';

const SearchView: React.FC = () => {
  const { searchQuery, searchResults, songs } = useSelector((state: RootState) => state.music);

  const hasResults = searchResults.songs.length > 0 || searchResults.albums.length > 0 || searchResults.playlists.length > 0;

  if (!searchQuery) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 pb-32">
          <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {genres.map((genre, index) => {
              const colors = [
                'from-red-500 to-red-700',
                'from-blue-500 to-blue-700',
                'from-green-500 to-green-700',
                'from-purple-500 to-purple-700',
                'from-yellow-500 to-yellow-700',
                'from-pink-500 to-pink-700',
                'from-indigo-500 to-indigo-700',
                'from-teal-500 to-teal-700',
                'from-orange-500 to-orange-700',
                'from-cyan-500 to-cyan-700',
                'from-emerald-500 to-emerald-700',
                'from-violet-500 to-violet-700',
              ];
              
              return (
                <motion.div
                  key={genre}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br ${colors[index % colors.length]} rounded-lg p-4 aspect-square flex items-end cursor-pointer hover:scale-105 transition-transform`}
                >
                  <h3 className="text-white font-bold text-lg">{genre}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!hasResults) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            No results found for "{searchQuery}"
          </h1>
          <p className="text-gray-400">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-8 pb-32">
        <h1 className="text-2xl font-bold text-white">
          Search results for "{searchQuery}"
        </h1>

        {/* Top Result */}
        {searchResults.songs.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Top result</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-sm"
            >
              <img
                src={searchResults.songs[0].coverUrl}
                alt={searchResults.songs[0].title}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-white text-2xl font-bold mb-1">
                {searchResults.songs[0].title}
              </h3>
              <p className="text-gray-400 mb-4">
                Song • {searchResults.songs[0].artist}
              </p>
            </motion.div>
          </section>
        )}

        {/* Songs */}
        {searchResults.songs.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Songs</h2>
            <div className="space-y-1">
              {searchResults.songs.slice(0, 10).map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard
                    song={song}
                    songs={searchResults.songs}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Albums */}
        {searchResults.albums.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Albums</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
                {searchResults.albums.map((album, index) => (
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
        )}

        {/* Playlists */}
        {searchResults.playlists.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Playlists</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
                {searchResults.playlists.map((playlist, index) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchView;