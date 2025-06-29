import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Player from './components/layout/Player';
import HomeView from './components/views/HomeView';
import SearchView from './components/views/SearchView';
import LibraryView from './components/views/LibraryView';
import PlaylistView from './components/views/PlaylistView';
import AlbumView from './components/views/AlbumView';
import ArtistView from './components/views/ArtistView';
import DiscoverView from './components/views/DiscoverView';
import SocialView from './components/views/SocialView';
import PodcastView from './components/views/PodcastView';
import StatsView from './components/views/StatsView';
import QueueSidebar from './components/layout/QueueSidebar';
import CreatePlaylistModal from './components/modals/CreatePlaylistModal';
import LyricsModal from './components/modals/LyricsModal';
import SettingsModal from './components/modals/SettingsModal';
import EqualizerModal from './components/modals/EqualizerModal';
import SleepTimerModal from './components/modals/SleepTimerModal';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const AppContent: React.FC = () => {
  const { showQueue } = useSelector((state: RootState) => state.ui);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/search" element={<SearchView />} />
                  <Route path="/library" element={<LibraryView />} />
                  <Route path="/discover" element={<DiscoverView />} />
                  <Route path="/social" element={<SocialView />} />
                  <Route path="/podcasts" element={<PodcastView />} />
                  <Route path="/stats" element={<StatsView />} />
                  <Route path="/playlist/:id" element={<PlaylistView />} />
                  <Route path="/album/:id" element={<AlbumView />} />
                  <Route path="/artist/:id" element={<ArtistView />} />
                </Routes>
              </Suspense>
            </div>
            {showQueue && <QueueSidebar />}
          </div>
        </main>
      </div>
      <Player />
      <CreatePlaylistModal />
      <LyricsModal />
      <SettingsModal />
      <EqualizerModal />
      <SleepTimerModal />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;