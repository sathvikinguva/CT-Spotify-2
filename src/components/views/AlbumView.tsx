import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Clock, Calendar } from 'lucide-react';
import { RootState } from '../../store';
import { usePlayer } from '../../hooks/usePlayer';
import SongCard from '../common/SongCard';
import { motion } from 'framer-motion';

const AlbumView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { albums } = useSelector((state: RootState) => state.music);
  const { player, playSong, playPause } = usePlayer();

  const album = albums.find(a => a.id === id);

  if (!album) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Album not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isCurrentAlbum = album.songs.some(song => song.id === player.currentSong?.id);
  const isPlaying = isCurrentAlbum && player.isPlaying;

  const handlePlayClick = () => {
    if (album.songs.length > 0) {
      if (isCurrentAlbum) {
        playPause();
      } else {
        playSong(album.songs[0], album.songs);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="pb-32">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-800 to-gray-900 p-6">
          <div className="flex items-end space-x-6">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={album.coverUrl}
              alt={album.title}
              className="w-60 h-60 rounded-lg shadow-2xl flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white uppercase tracking-wider">Album</p>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-bold text-white mb-4 truncate"
              >
                {album.title}
              </motion.h1>
              <div className="flex items-center space-x-2 text-lg text-gray-300 mb-4">
                <span className="font-medium hover:underline cursor-pointer">{album.artist}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{new Date(album.releaseDate).getFullYear()}</span>
                <span>•</span>
                <span>{album.songs.length} songs</span>
                <span>•</span>
                <span>{formatDuration(album.duration)}</span>
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
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </motion.button>

            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <Heart className="w-6 h-6" />
            </button>

            <button className="p-3 text-gray-400 hover:text-white transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Song List */}
        <div className="p-6">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-4">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-8">Title</div>
            <div className="col-span-2 hidden md:block">Plays</div>
            <div className="col-span-1 text-center">
              <Clock className="w-4 h-4 mx-auto" />
            </div>
          </div>

          {/* Songs */}
          <div className="space-y-1">
            {album.songs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SongCard
                  song={song}
                  songs={album.songs}
                  index={index}
                  showAlbum={false}
                  showArtist={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumView;