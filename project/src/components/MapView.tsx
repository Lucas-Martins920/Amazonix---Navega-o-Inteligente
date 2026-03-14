import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

export default function MapView() {
  // Criamos uma referência para o marcador do usuário para não duplicar no mapa
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [-60.0217, -3.118], // Manaus
      zoom: 12 // Aumentei um pouco o zoom para os riscos aparecerem melhor
    })

    map.addControl(new maplibregl.NavigationControl())

    map.on("load", () => {
      // Adicionar rios
      map.addSource("rivers", {
        type: "geojson",
        data: "/src/data/rivers.geojson"
      })

      map.addLayer({
        id: "rivers-layer",
        type: "line",
        source: "rivers",
        paint: {
          "line-color": "#1e40af",
          "line-width": 3
        }
      })

      // --- INÍCIO DA MELHORIA: RISCOS NO MAPA ---
      const riscosSimulados = [
        { id: 1, nome: "Banco de Areia Central", tipo: "aviso", coords: [-60.025, -3.115] },
        { id: 2, nome: "Pedral Perigoso", tipo: "perigo", coords: [-60.015, -3.105] },
        { id: 3, nome: "Tronco Submerso", tipo: "aviso", coords: [-60.040, -3.130] },
        { id: 4, nome: "Correnteza Forte", tipo: "perigo", coords: [-60.010, -3.125] }
      ];

      riscosSimulados.forEach(risco => {
        // Criar elemento visual para o marcador de risco
        const el = document.createElement('div');
        el.style.width = '18px';
        el.style.height = '18px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.backgroundColor = risco.tipo === 'perigo' ? '#ff0000' : '#ffa500';
        el.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';

        // Adicionar o marcador ao mapa com um popup
        new maplibregl.Marker({ element: el })
          .setLngLat(risco.coords as [number, number])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(`<b>${risco.nome}</b>`))
          .addTo(map);
      });
      // --- FIM DA MELHORIA ---
    })

    // GPS do usuário (Lógica melhorada para protótipo)
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const lng = pos.coords.longitude
        const lat = pos.coords.latitude

        // Se o marcador já existe, só atualizamos a posição
        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat([lng, lat]);
        } else {
          // Se não existe, criamos o marcador azul (padrão de GPS)
          userMarkerRef.current = new maplibregl.Marker({ color: "#007bff" })
            .setLngLat([lng, lat])
            .addTo(map);
        }
      })
    }

    // Limpar o mapa ao desmontar o componente
    return () => map.remove();
  }, [])

  return (
    <div
      id="map"
      className="w-full h-full" // Usei classes para garantir que ocupe o container pai
      style={{
        height: "100vh"
      }}
    />
  )
}