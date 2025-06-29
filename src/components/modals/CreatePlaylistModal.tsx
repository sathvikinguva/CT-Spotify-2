import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Music } from 'lucide-react';
import { RootState } from '../../store';
import { setShowCreatePlaylistModal } from '../../store/slices/uiSlice';
import { createPlaylist } from '../../store/slices/musicSlice';

const CreatePlaylistModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showCreatePlaylistModal } = useSelector((state: RootState) => state.ui);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleClose = () => {
    dispatch(setShowCreatePlaylistModal(false));
    setName('');
    setDescription('');
    setIsPublic(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createPlaylist({
        name: name.trim(),
        description: description.trim(),
        coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
        songs: [],
        isPublic,
        creator: 'You',
      }));
      handleClose();
    }
  };

  if (!showCreatePlaylistModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Create playlist</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Playlist #1"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add an optional description"
              className="w-full bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:border-green-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2 accent-green-500"
            />
            <label htmlFor="isPublic" className="text-sm text-white">
              Make playlist public
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;