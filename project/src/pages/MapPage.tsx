import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, GeoJSON } from 'react-leaflet'; // Removido o TileLayer daqui
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Risk {
  name: string;
  latitude: number;
  longitude: number;
  type: string;
}

export default function MapPage() {
  // 1. CORREÇÃO: Centralizado EXATAMENTE onde estão os seus pontos de risco (Manaus)
  const [userLocation] = useState<[number, number]>([-3.1190, -60.0217]); 
  const [risks, setRisks] = useState<Risk[]>([]);
  const [riverData, setRiverData] = useState<any>(null);

  useEffect(() => {
    fetch('/data/risks.json').then(res => res.json()).then(setRisks).catch(() => {});
    fetch('/data/rio-amazonas.json').then(res => res.json()).then(setRiverData).catch(() => {});
  }, []);

  // ÍCONES COM BRILHO (NEON) PARA DESTAQUE TOTAL
  const riskIcon = (type: string) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <circle cx="20" cy="20" r="12" fill="${type === 'sandbank' ? '#FACC15' : '#FF0000'}" filter="url(#glow)" stroke="white" stroke-width="2"/>
        <text x="20" y="24" font-size="12" text-anchor="middle" fill="black" font-weight="bold">!</text>
      </svg>`)}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  return (
    <div className="h-screen flex flex-col bg-[#050505]">
      {/* HEADER MINIMALISTA */}
      <div className="p-4 bg-black border-b border-cyan-900 flex justify-between items-center z-[1000]">
        <h1 className="text-cyan-500 font-black tracking-widest text-xl">AMAZONIX <span className="text-[10px] text-gray-500 font-mono">V1.0</span></h1>
        <div className="text-right text-[10px] font-mono text-cyan-700">MODO TÁTICO</div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#050505]">
        {/* 2. CORREÇÃO: Removido o filtro de inverter cores e o TileLayer */}
        <MapContainer 
          center={userLocation} 
          zoom={13} 
          style={{ height: '100%', width: '100%', background: '#050505' }}
        >
          {/* O TILELAYER FOI DELETADO. NENHUMA RUA OU TERRA SERÁ DESENHADA. */}
          
          {/* O RIO (DESTAQUE AZUL CIANO) */}
          {riverData && (
            <GeoJSON 
              data={riverData} 
              style={{ 
                color: '#00FFFF', 
                weight: 6, 
                opacity: 0.8, 
                fillColor: '#008888', 
                fillOpacity: 0.2
              }} 
            />
          )}

          {/* OS PONTOS (DESTAQUE VERMELHO/AMARELO) */}
          {risks.map((risk, i) => (
            <Marker key={i} position={[risk.latitude, risk.longitude]} icon={riskIcon(risk.type)}>
              <Popup>
                <div className="text-black font-bold uppercase">{risk.name}</div>
              </Popup>
            </Marker>
          ))}

          {/* MARCADOR DO BARCO (Para você saber onde está o centro) */}
          <Marker position={userLocation} icon={new Icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iNiIgZmlsbD0iIzAwRkZGRiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
            iconSize: [20, 20]
          })} />
        </MapContainer>

        {/* OVERLAY DE ALERTA */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/80 border border-cyan-800 px-4 py-1 rounded-full">
           <span className="text-cyan-500 text-[10px] font-black tracking-widest">SISTEMA ATIVO</span>
        </div>

        {/* BOTÃO SOS GIGANTE */}
        <button className="absolute bottom-8 right-8 z-[1000] bg-red-600 text-white w-20 h-20 rounded-full border-[4px] border-white shadow-[0_0_30px_rgba(255,0,0,0.4)] font-black text-xl active:scale-90 transition-all">
          SOS
        </button>
      </div>
    </div>
  );
}