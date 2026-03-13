import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

interface SOSAlert {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export default function SOSPage() {
  const [alerts, setAlerts] = useState<SOSAlert[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const savedAlerts = localStorage.getItem('amazonix_sos_alerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  const handleSOS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newAlert: SOSAlert = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
          };

          const updatedAlerts = [newAlert, ...alerts];
          setAlerts(updatedAlerts);
          localStorage.setItem('amazonix_sos_alerts', JSON.stringify(updatedAlerts));
          setShowConfirmation(true);
          setTimeout(() => setShowConfirmation(false), 3000);
        },
        () => {
          const newAlert: SOSAlert = {
            latitude: -3.1190,
            longitude: -60.0217,
            timestamp: new Date().toISOString(),
          };

          const updatedAlerts = [newAlert, ...alerts];
          setAlerts(updatedAlerts);
          localStorage.setItem('amazonix_sos_alerts', JSON.stringify(updatedAlerts));
          setShowConfirmation(true);
          setTimeout(() => setShowConfirmation(false), 3000);
        }
      );
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-red-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <Phone className="w-6 h-6" />
          <h2 className="text-xl font-bold">Alerta de Emergência</h2>
        </div>
        <p className="text-sm mt-1 text-red-100">
          Use em situações de emergência no rio
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex flex-col items-center">
              <button
                onClick={handleSOS}
                className="w-48 h-48 bg-red-600 hover:bg-red-700 rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-95"
              >
                <Phone className="w-24 h-24 text-white" strokeWidth={2} />
              </button>
              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                Pressione para Enviar SOS
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Sua localização será salva e enviada quando houver conexão com internet
              </p>
            </div>
          </div>

          {showConfirmation && (
            <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-green-800 mb-1">Alerta SOS Salvo!</h4>
                <p className="text-sm text-green-700">
                  Sua localização foi salva localmente. O alerta será sincronizado quando houver internet disponível.
                </p>
              </div>
            </div>
          )}

          {alerts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Últimos Alertas Salvos
              </h3>
              <div className="space-y-3">
                {alerts.slice(0, 5).map((alert, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-3 py-2">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{formatDate(alert.timestamp)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        Lat: {alert.latitude.toFixed(4)}, Lon: {alert.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-2">ℹ️ Informações Importantes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Este é um protótipo para demonstração</li>
              <li>• Em produção, conectaria com autoridades locais</li>
              <li>• Os alertas são salvos localmente no dispositivo</li>
              <li>• Use apenas em situações reais de emergência</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
