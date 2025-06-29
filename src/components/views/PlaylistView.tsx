import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Download, Share, Clock, Calendar, Users } from 'lucide-react';
import { RootState } from '../../store';
import { usePlayer } from '../../hooks/usePlayer';
import SongCard from '../common/SongCard';
import { toggleLikeSong } from '../../store/slices/userSlice';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PlaylistView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playlists } = useSelector((state: RootState) => state.music);
  const { likedSongs } = useSelector((state: RootState) => state.user);
  const { player, playSong, playPause } = usePlayer();
  const [showMore, setShowMore] = useState(false);

  const playlist = playlists.find(p => p.id === id);

  if (!playlist) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Playlist not found</h1>
          <button
            onClick={() => navigate('/library')}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
          >
            Go to Library
          </button>
        </div>
      </div>
    );
  }

  const isCurrentPlaylist = playlist.songs.some(song => song.id === player.currentSong?.id);
  const isPlaying = isCurrentPlaylist && player.isPlaying;
  const totalDuration = playlist.songs.reduce((acc, song) => acc + song.duration, 0);

  const handlePlayClick = () => {
    if (playlist.songs.length > 0) {
      if (isCurrentPlaylist) {
        playPause();
      } else {
        playSong(playlist.songs[0], playlist.songs);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Playlist link copied to clipboard!');
  };

  const handleDownload = () => {
    toast.success('Playlist download started!');
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
        <div className="bg-gradient-to-b from-purple-800 to-gray-900 p-6">
          <div className="flex items-end space-x-6">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-60 h-60 rounded-lg shadow-2xl flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white uppercase tracking-wider">Playlist</p>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-bold text-white mb-4 truncate"
              >
                {playlist.name}
              </motion.h1>
              {playlist.description && (
                <p className="text-gray-300 mb-4 max-w-2xl">{playlist.description}</p>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span className="font-medium">{playlist.creator}</span>
                <span>•</span>
                <span>{playlist.songs.length} songs</span>
                <span>•</span>
                <span>{formatDuration(totalDuration)}</span>
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

            <button
              onClick={handleShare}
              className="p-3 text-gray-400 hover:text-white transition-colors"
            >
              <Share className="w-6 h-6" />
            </button>

            <button
              onClick={handleDownload}
              className="p-3 text-gray-400 hover:text-white transition-colors"
            >
              <Download className="w-6 h-6" />
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
            <div className="col-span-5">Title</div>
            <div className="col-span-3 hidden md:block">Album</div>
            <div className="col-span-2 hidden md:block">Date added</div>
            <div className="col-span-1 text-center">
              <Clock className="w-4 h-4 mx-auto" />
            </div>
          </div>

          {/* Songs */}
          <div className="space-y-1">
            {playlist.songs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SongCard
                  song={song}
                  songs={playlist.songs}
                  index={index}
                  showAlbum={true}
                  showArtist={true}
                />
              </motion.div>
            ))}
          </div>

          {playlist.songs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No songs in this playlist</h3>
              <p className="text-gray-400 mb-6">Add some songs to get started</p>
              <button
                onClick={() => navigate('/search')}
                className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
              >
                Find Songs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;