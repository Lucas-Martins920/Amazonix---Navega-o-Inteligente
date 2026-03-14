import { useEffect } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

export default function MapView() {

  useEffect(() => {

    const map = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [-60.0217, -3.118], // Manaus
      zoom: 11
    })

    map.addControl(new maplibregl.NavigationControl())

    // adicionar rios
    map.on("load", () => {

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

    })

    // GPS do usuário
    if (navigator.geolocation) {

      navigator.geolocation.watchPosition((pos) => {

        const lng = pos.coords.longitude
        const lat = pos.coords.latitude

        new maplibregl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(map)

      })

    }

  }, [])

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100vh"
      }}
    />
  )
}