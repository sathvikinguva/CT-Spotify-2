import React from 'react';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayer } from '../../hooks/usePlayer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleLikeSong } from '../../store/slices/userSlice';
import clsx from 'clsx';

interface SongCardProps {
  song: Song;
  songs?: Song[];
  showArtist?: boolean;
  showAlbum?: boolean;
  index?: number;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  songs = [], 
  showArtist = true, 
  showAlbum = true,
  index 
}) => {
  const dispatch = useDispatch();
  const { player, playSong, playPause, formatTime } = usePlayer();
  const { likedSongs } = useSelector((state: RootState) => state.user);

  const isCurrentSong = player.currentSong?.id === song.id;
  const isPlaying = isCurrentSong && player.isPlaying;
  const isLiked = likedSongs.includes(song.id);

  const handlePlayClick = () => {
    if (isCurrentSong) {
      playPause();
    } else {
      playSong(song, songs.length > 0 ? songs : [song]);
    }
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLikeSong(song.id));
  };

  return (
    <div className="group flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors">
      {index !== undefined && (
        <div className="w-4 text-center mr-4">
          {!isPlaying ? (
            <span className="text-gray-400 text-sm group-hover:hidden">
              {index + 1}
            </span>
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          )}
          <button
            onClick={handlePlayClick}
            className="hidden group-hover:block text-white hover:text-green-500 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      <div className="flex items-center flex-1 min-w-0">
        {!index && (
          <div className="relative mr-4">
            <img
              src={song.coverUrl}
              alt={song.title}
              className="w-10 h-10 rounded"
            />
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h4 className={clsx(
            'text-sm font-medium truncate',
            isCurrentSong ? 'text-green-500' : 'text-white'
          )}>
            {song.title}
          </h4>
          {showArtist && (
            <p className="text-xs text-gray-400 truncate">
              {song.artist}
            </p>
          )}
        </div>

        {showAlbum && (
          <div className="hidden md:block flex-1 min-w-0 mx-4">
            <p className="text-sm text-gray-400 truncate">
              {song.album}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <button
            onClick={handleLikeToggle}
            className={clsx(
              'p-1 transition-colors opacity-0 group-hover:opacity-100',
              isLiked ? 'text-green-500 opacity-100' : 'text-gray-400 hover:text-white'
            )}
          >
            <Heart className={clsx('w-4 h-4', isLiked && 'fill-current')} />
          </button>

          <span className="text-sm text-gray-400 w-12 text-right">
            {formatTime(song.duration)}
          </span>

          <button className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;