import { useState, useEffect } from 'react';
import Login from './components/Login';
import BottomNav from './components/BottomNav';
import MapPage from './pages/MapPage';
import RisksPage from './pages/RisksPage';
import RoutesPage from './pages/RoutesPage';
import SOSPage from './pages/SOSPage';
import FuturePage from './pages/FuturePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    const user = localStorage.getItem('amazonix_user');
    if (user) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) return <Login onLogin={() => setIsAuthenticated(true)} />;

  return (
    <div className="h-screen w-full flex flex-col bg-black overflow-hidden font-sans">
      {/* HEADER ÚNICO: Fixado no topo */}
      <header className="h-14 border-b border-cyan-900/40 flex justify-between items-center px-6 bg-black z-[2000] shrink-0">
        <div>
          <h1 className="text-cyan-500 font-black text-xl tracking-tighter">AMAZONIX</h1>
          <p className="text-[7px] text-cyan-800 font-mono uppercase tracking-[0.3em] -mt-1">Tactical Nav</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-cyan-500 animate-pulse block">● SISTEMA ONLINE</span>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO: Onde a mágica acontece */}
      <main className="flex-1 relative bg-[#050505]">
        {activeTab === 'map' && <MapPage onNavigate={setActiveTab} />}
        {activeTab === 'risks' && <RisksPage onSelectRisk={() => setActiveTab('map')} />}
        {activeTab === 'routes' && <RoutesPage />}
        {activeTab === 'sos' && <SOSPage />}
        {activeTab === 'future' && <FuturePage />}
      </main>

      {/* FOOTER ÚNICO: Controla as abas do App todo */}
      <nav className="shrink-0 bg-black border-t border-cyan-900/30">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </nav>
    </div>
  );
}

export default App;