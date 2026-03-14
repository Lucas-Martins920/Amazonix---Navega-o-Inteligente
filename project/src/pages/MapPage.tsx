import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapView from "../components/MapView"
export default function MapPage(){
  return <MapView/>
}

interface Risk {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  risk_level: string;
}

function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  const userIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMzk1MmZmIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjgiLz48L3N2Zz4=',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}

export default function MapPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [season, setSeason] = useState<'flood' | 'dry'>('flood');
  const [userLocation] = useState<[number, number]>([-3.1190, -60.0217]);

  useEffect(() => {
    fetch('/data/risks.json')
      .then((res) => res.json())
      .then((data) => setRisks(data))
      .catch((err) => console.error('Error loading risks:', err));
  }, []);

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'sandbank':
        return '#FCD34D';
      case 'dangerous_curve':
        return '#EF4444';
      case 'shallow_water':
        return '#F97316';
      case 'slow_navigation':
        return '#3B82F6';
      case 'community':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const createMarkerIcon = (type: string) => {
    const color = getMarkerColor(type);
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="${color}" stroke="white" stroke-width="2"/>
        </svg>
      `)}`,
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40],
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
  };

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      sandbank: 'Banco de Areia',
      dangerous_curve: 'Curva Perigosa',
      shallow_water: 'Água Rasa',
      slow_navigation: 'Navegação Lenta',
      community: 'Comunidade',
    };
    return labels[type] || type;
  };

  const filteredRisks = risks.filter((risk) => {
    if (season === 'dry' && risk.type === 'sandbank') return true;
    if (season === 'flood' && risk.type === 'sandbank') return false;
    return true;
  });

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Mapa de Navegação</h2>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Modo do Rio:</label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as 'flood' | 'dry')}
            className="bg-white text-gray-800 rounded-lg px-3 py-1 text-sm font-medium"
          >
            <option value="flood">Época de Cheia</option>
            <option value="dry">Época de Seca</option>
          </select>
        </div>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[-3.1190, -60.0217]}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {filteredRisks.map((risk, index) => (
            <Marker
              key={index}
              position={[risk.latitude, risk.longitude]}
              icon={createMarkerIcon(risk.type)}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-base mb-1">{risk.name}</h3>
                  <p className="text-gray-600">
                    <strong>Tipo:</strong> {getTypeLabel(risk.type)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Nível:</strong>{' '}
                    <span className="capitalize">{risk.risk_level}</span>
                  </p>
                  <p className="text-gray-600">
                    <strong>Distância:</strong>{' '}
                    {calculateDistance(
                      userLocation[0],
                      userLocation[1],
                      risk.latitude,
                      risk.longitude
                    )}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="bg-white p-2 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
            <span>Banco de Areia</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
            <span>Curva Perigosa</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
            <span>Água Rasa</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
            <span>Nav. Lenta</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
            <span>Comunidade</span>
          </div>
        </div>
      </div>
    </div>
  );
}
