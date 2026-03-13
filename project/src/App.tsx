import { useState, useEffect } from 'react';
import Login from './components/Login';
import BottomNav from './components/BottomNav';
import MapPage from './pages/MapPage';
import RisksPage from './pages/RisksPage';
import RoutesPage from './pages/RoutesPage';
import SOSPage from './pages/SOSPage';
import FuturePage from './pages/FuturePage';

interface Risk {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  risk_level: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    const user = localStorage.getItem('amazonix_user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSelectRisk = (risk: Risk) => {
    setActiveTab('map');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {activeTab === 'map' && <MapPage />}
      {activeTab === 'risks' && <RisksPage onSelectRisk={handleSelectRisk} />}
      {activeTab === 'routes' && <RoutesPage />}
      {activeTab === 'sos' && <SOSPage />}
      {activeTab === 'future' && <FuturePage />}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
