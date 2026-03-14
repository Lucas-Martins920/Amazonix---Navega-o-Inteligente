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

  // Verifica se já logou antes
  useEffect(() => {
    const user = localStorage.getItem('amazonix_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('amazonix_user', 'true'); // Salva para não pedir toda hora
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('amazonix_user');
    setIsAuthenticated(false);
  };

  // Se não estiver autenticado, renderiza SÓ o Login, sem nada em volta
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    // Removi o 'max-w-md' para o app ocupar a tela toda do notebook e parecer um sistema real
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col overflow-hidden">
      
      {/* Área Principal de Conteúdo */}
      <main className="flex-1 relative">
        {activeTab === 'map' && <MapPage />}
        {activeTab === 'risks' && <RisksPage onSelectRisk={() => setActiveTab('map')} />}
        {activeTab === 'routes' && <RoutesPage />}
        {activeTab === 'sos' && <SOSPage />}
        {activeTab === 'future' && <FuturePage />}
      </main>

      {/* Menu Inferior Estilizado */}
      <nav className="border-t border-cyan-900/50 bg-[#121212] pb-safe">
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </nav>

      {/* Botão de Logout para testes no notebook */}
      <button 
        onClick={handleLogout}
        className="fixed top-4 right-4 z-[2000] text-[8px] text-gray-600 hover:text-red-500 uppercase font-mono"
      >
        [ Reset Session ]
      </button>
    </div>
  );
}

export default App;