import { useEffect, useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';

interface Risk {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  risk_level: string;
}

interface RisksPageProps {
  onSelectRisk: (risk: Risk) => void;
}

export default function RisksPage({ onSelectRisk }: RisksPageProps) {
  const [risks, setRisks] = useState<Risk[]>([]);

  useEffect(() => {
    fetch('/data/risks.json')
      .then((res) => res.json())
      .then((data) => setRisks(data))
      .catch((err) => console.error('Error loading risks:', err));
  }, []);

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'sandbank':
        return 'bg-yellow-400';
      case 'dangerous_curve':
        return 'bg-red-500';
      case 'shallow_water':
        return 'bg-orange-500';
      case 'slow_navigation':
        return 'bg-blue-500';
      case 'community':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      sandbank: 'Banco de Areia',
      dangerous_curve: 'Curva Perigosa',
      shallow_water: 'Água Rasa',
      slow_navigation: 'Navegação Lenta',
      community: 'Comunidade Ribeirinha',
    };
    return labels[type] || type;
  };

  const getRiskBadgeColor = (level: string): string => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLabel = (level: string): string => {
    const labels: Record<string, string> = {
      high: 'Alto',
      medium: 'Médio',
      low: 'Baixo',
      none: 'Nenhum',
    };
    return labels[level] || level;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-xl font-bold">Lista de Riscos</h2>
        </div>
        <p className="text-sm mt-1 text-green-100">
          {risks.length} pontos de atenção identificados
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-3">
          {risks.map((risk, index) => (
            <button
              key={index}
              onClick={() => onSelectRisk(risk)}
              className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getMarkerColor(risk.type)}`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 mb-1">{risk.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{getTypeLabel(risk.type)}</p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getRiskBadgeColor(
                        risk.risk_level
                      )}`}
                    >
                      Risco: {getRiskLabel(risk.risk_level)}
                    </span>
                    <div className="flex items-center text-blue-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Ver no mapa</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
