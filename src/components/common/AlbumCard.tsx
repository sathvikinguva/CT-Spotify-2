import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import { Album } from '../../types/music';
import { usePlayer } from '../../hooks/usePlayer';
import { motion } from 'framer-motion';

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const navigate = useNavigate();
  const { player, playSong, playPause } = usePlayer();

  const isCurrentAlbum = album.songs.some(song => song.id === player.currentSong?.id);
  const isPlaying = isCurrentAlbum && player.isPlaying;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (album.songs.length > 0) {
      if (isCurrentAlbum) {
        playPause();
      } else {
        playSong(album.songs[0], album.songs);
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/album/${album.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={handleCardClick}
      className="group bg-gray-900 hover:bg-gray-800 p-4 rounded-lg transition-colors cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayClick}
          className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 text-black rounded-full p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </motion.button>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-1 truncate">
          {album.title}
        </h3>
        <p className="text-gray-400 text-sm truncate">
          {album.artist}
        </p>
        <p className="text-gray-500 text-xs">
          {new Date(album.releaseDate).getFullYear()} • {album.songs.length} songs
        </p>
      </div>
    </motion.div>
  );
};

export default AlbumCard;