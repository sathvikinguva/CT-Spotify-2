import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Shuffle, Users, MapPin, ExternalLink } from 'lucide-react';
import { RootState } from '../../store';
import { usePlayer } from '../../hooks/usePlayer';
import SongCard from '../common/SongCard';
import AlbumCard from '../common/AlbumCard';
import { motion } from 'framer-motion';

const ArtistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { songs, albums } = useSelector((state: RootState) => state.music);
  const { player, playSong, playPause } = usePlayer();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock artist data - in a real app, this would come from the store
  const artist = {
    id: id || '1',
    name: 'The Weeknd',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    monthlyListeners: 85000000,
    verified: true,
    bio: 'Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer.',
    genres: ['Pop', 'R&B', 'Alternative R&B'],
    location: 'Toronto, Canada'
  };

  const artistSongs = songs.filter(song => song.artist === artist.name).slice(0, 5);
  const artistAlbums = albums.filter(album => album.artist === artist.name);

  const handlePlayClick = () => {
    if (artistSongs.length > 0) {
      playSong(artistSongs[0], artistSongs);
    }
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="pb-32">
        {/* Header */}
        <div className="relative">
          <div className="h-96 bg-gradient-to-b from-purple-600 via-purple-800 to-gray-900">
            <div className="absolute inset-0 bg-black bg-opacity-30" />
            <div className="relative h-full flex items-end p-6">
              <div className="flex items-end space-x-6">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-60 h-60 rounded-full shadow-2xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {artist.verified && (
                      <div className="bg-blue-500 rounded-full p-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <p className="text-sm font-medium text-white uppercase tracking-wider">
                      Verified Artist
                    </p>
                  </div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-8xl font-bold text-white mb-4"
                  >
                    {artist.name}
                  </motion.h1>
                  <div className="flex items-center space-x-2 text-lg text-gray-300">
                    <Users className="w-5 h-5" />
                    <span>{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-b from-gray-900 to-black p-6">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayClick}
              className="bg-green-500 hover:bg-green-400 text-black rounded-full p-4 transition-colors shadow-lg"
            >
              <Play className="w-8 h-8 ml-1" />
            </motion.button>

            <button
              onClick={handleFollowClick}
              className={`px-6 py-2 rounded-full border-2 font-semibold transition-colors ${
                isFollowing
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-gray-400 text-gray-400 hover:border-white hover:text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>

            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Popular Songs */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
            <div className="space-y-1">
              {artistSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard
                    song={song}
                    songs={artistSongs}
                    index={index}
                    showArtist={false}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Albums */}
          {artistAlbums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4" style={{ minWidth: 'max-content' }}>
                  {artistAlbums.map((album, index) => (
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

          {/* About */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">About</h2>
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-32 h-32 rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-gray-300 mb-4">{artist.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {artist.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArtistView;