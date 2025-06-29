import { Song, Album, Playlist, Artist } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    genre: 'Pop',
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '2020-03-20',
    playCount: 2500000000
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    duration: 233,
    genre: 'Pop',
    coverUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '2017-01-06',
    playCount: 3000000000
  },
  {
    id: '3',
    title: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    duration: 285,
    genre: 'Soul',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '2011-01-24',
    playCount: 1800000000
  },
  {
    id: '4',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 355,
    genre: 'Rock',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '1975-10-31',
    playCount: 1600000000
  },
  {
    id: '5',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: 294,
    genre: 'Pop',
    coverUrl: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '1983-01-02',
    playCount: 1400000000
  },
  {
    id: '6',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 391,
    genre: 'Rock',
    coverUrl: 'https://images.pexels.com/photos/1540258/pexels-photo-1540258.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    releaseDate: '1976-12-08',
    playCount: 1200000000
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2020-03-20',
    genre: 'Pop',
    songs: [mockSongs[0]],
    duration: 3360
  },
  {
    id: '2',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    coverUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2017-03-03',
    genre: 'Pop',
    songs: [mockSongs[1]],
    duration: 2520
  },
  {
    id: '3',
    title: '21',
    artist: 'Adele',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
    releaseDate: '2011-01-24',
    genre: 'Soul',
    songs: [mockSongs[2]],
    duration: 2880
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    description: 'All my favorite songs in one place',
    coverUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: [mockSongs[0], mockSongs[1], mockSongs[2]],
    createdAt: '2024-01-15',
    isPublic: false,
    creator: 'You'
  },
  {
    id: '2',
    name: 'Rock Classics',
    description: 'The greatest rock songs of all time',
    coverUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: [mockSongs[3], mockSongs[5]],
    createdAt: '2024-01-10',
    isPublic: true,
    creator: 'You'
  },
  {
    id: '3',
    name: 'Pop Hits',
    description: 'Latest and greatest pop music',
    coverUrl: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400',
    songs: [mockSongs[0], mockSongs[1], mockSongs[4]],
    createdAt: '2024-01-20',
    isPublic: true,
    creator: 'You'
  }
];

export const genres = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 
  'Country', 'R&B', 'Soul', 'Reggae', 'Blues', 'Folk'
];