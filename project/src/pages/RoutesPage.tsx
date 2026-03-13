import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Route, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Location {
  name: string;
  coords: [number, number];
}

const locations: Location[] = [
  { name: 'Manaus Centro', coords: [-3.1190, -60.0217] },
  { name: 'Porto de Manaus', coords: [-3.1305, -60.0054] },
  { name: 'Encontro das Águas', coords: [-3.1405, -59.8751] },
  { name: 'Ponta Negra', coords: [-3.0822, -60.1033] },
  { name: 'Tarumã', coords: [-3.0305, -60.2331] },
  { name: 'Rio Negro', coords: [-3.0101, -60.1204] },
];

export default function RoutesPage() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [showRoute, setShowRoute] = useState(false);

  const handleSimulate = () => {
    if (origin && destination && origin !== destination) {
      setShowRoute(true);
    }
  };

  const originLocation = locations.find((loc) => loc.name === origin);
  const destinationLocation = locations.find((loc) => loc.name === destination);

  const createMarkerIcon = (color: string) => {
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="15" cy="15" r="5" fill="white"/>
        </svg>
      `)}`,
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Route className="w-6 h-6" />
          <h2 className="text-xl font-bold">Simulação de Rotas</h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Origem</label>
            <select
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                setShowRoute(false);
              }}
              className="w-full bg-white text-gray-800 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Selecione a origem</option>
              {locations.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Destino</label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowRoute(false);
              }}
              className="w-full bg-white text-gray-800 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Selecione o destino</option>
              {locations.map((loc) => (
                <option key={loc.name} value={loc.name} disabled={loc.name === origin}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSimulate}
            disabled={!origin || !destination || origin === destination}
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Navigation className="w-5 h-5" />
            <span>Simular Rota</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <MapContainer
          center={[-3.1190, -60.0217]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {showRoute && originLocation && destinationLocation && (
            <>
              <Marker position={originLocation.coords} icon={createMarkerIcon('#10B981')}>
                <Popup>
                  <strong>Origem:</strong> {originLocation.name}
                </Popup>
              </Marker>
              <Marker position={destinationLocation.coords} icon={createMarkerIcon('#EF4444')}>
                <Popup>
                  <strong>Destino:</strong> {destinationLocation.name}
                </Popup>
              </Marker>
              <Polyline
                positions={[originLocation.coords, destinationLocation.coords]}
                color="#3B82F6"
                weight={4}
                opacity={0.7}
                dashArray="10, 10"
              />
            </>
          )}
        </MapContainer>

        {showRoute && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
            <h3 className="font-bold text-gray-800 mb-2">Rota Simulada</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span>{origin}</span>
              </div>
              <span>→</span>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                <span>{destination}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Esta é uma simulação visual. Em versão futura, incluirá alertas de risco ao longo do trajeto.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
