import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'mapbox-gl-leaflet';
import axios from 'axios';

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    const newMap = L.map('map').setView([21.030664, 105.852302], 15);
    setMap(newMap);

    if (L.mapboxGL) {
      L.mapboxGL({
        style: '/json/capxa/style.json'
      }).addTo(newMap);
    } else {
      console.error("mapboxGL không được nhận diện!");
    }

    axios.get('/json/duongTranHungDao.json')
      .then(response => {
        const geoJsonLayer = L.geoJSON(response.data);
        geoJsonLayer.addTo(newMap);
        console.log("GeoJSON loaded:", response.data);
      })
      .catch(error => console.error("Error loading GeoJSON:", error));

    return () => {
      newMap.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
