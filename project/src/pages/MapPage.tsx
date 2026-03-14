import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapPageProps { onNavigate: (tab: string) => void; }

export default function MapPage({ onNavigate }: MapPageProps) {
  const [center] = useState<[number, number]>([-3.1190, -60.0217]); 
  const [risks, setRisks] = useState([]);
  const [riverData, setRiverData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [resRisks, resRio] = await Promise.all([
          fetch('/risks.json').then(r => r.json()).catch(() => []),
          fetch('/rio-amazonas.json').then(r => r.json()).catch(() => null)
        ]);
        setRisks(resRisks);
        setRiverData(resRio);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    }
    loadData();
  }, []);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 z-[5000] bg-black flex items-center justify-center text-cyan-500 font-mono text-[10px] uppercase tracking-[0.4em]">
          Carregando Camadas Táticas...
        </div>
      )}

      <MapContainer center={center} zoom={13} zoomControl={false} className="w-full h-full">
        {riverData && <GeoJSON data={riverData} style={{ color: '#22d3ee', weight: 3, opacity: 0.5, fillColor: '#0891b2', fillOpacity: 0.15 }} />}
        
        {risks.map((risk: any, i: number) => (
          <Marker key={i} position={[risk.latitude, risk.longitude]} icon={new Icon({
            iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><circle cx="15" cy="15" r="8" fill="${risk.type === 'sandbank' ? '#FACC15' : '#FF4444'}" stroke="white" stroke-width="2"/></svg>`)}`,
            iconSize: [24, 24]
          })}>
            <Popup><div className="font-bold text-red-600">{risk.name}</div></Popup>
          </Marker>
        ))}

        <Marker position={center} icon={new Icon({
          iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iIzIyZDNlZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
          iconSize: [20, 20]
        })} />
      </MapContainer>

      {/* UI Flutuante sobre o mapa */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className="bg-black/80 border border-cyan-500/20 p-2 rounded backdrop-blur-md">
          <p className="text-cyan-500 text-[8px] font-bold uppercase tracking-widest">Setor: Porto de Manaus</p>
        </div>
      </div>

      <button 
        onClick={() => onNavigate('sos')}
        className="absolute bottom-6 right-6 z-[1000] bg-red-600 text-white w-14 h-14 rounded-full border-4 border-white shadow-2xl active:scale-90 transition-all font-black text-xs"
      >
        SOS
      </button>
    </div>
  );
}