import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Map } from 'leaflet';
import axios from 'axios';

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<any>(null);

  const containerMap = useRef<any>(null);


  // useEffect(() => {
  //   const newMap = L.map('map').setView([21.030664, 105.852302], 15);
  //   setMap(newMap);

  //   if (L.mapboxGL) {
  //     L.mapboxGL({
  //       style: '/json/capxa/style.json'
  //     }).addTo(newMap);
  //   } else {
  //     console.error("mapboxGL không được nhận diện!");
  //   }

  //   axios.get('/json/duongTranHungDao.json')
  //     .then(response => {
  //       const geoJsonLayer = L.geoJSON(response.data);
  //       geoJsonLayer.addTo(newMap);
  //       console.log("GeoJSON loaded:", response.data);
  //     })
  //     .catch(error => console.error("Error loading GeoJSON:", error));

  //   return () => {
  //     newMap.remove();
  //   };
  // }, []);

  useEffect(() => {
    if (containerMap && !map)
      setMap(
        new Map(containerMap.current, {
          width: '100%',
          height: '100%',
          minZoom: 5,
          maxZoom: 18,
          zoom: 16,
          center: [20.98658965854389, 105.8422110164009],
          zoomControl: false,
          wheelPxPerZoomLevel: 300,
        }),
      );
  }, [containerMap]);


  useEffect(() => {
    if (map) {
      L.mapboxGL({
        style: `/json/capxa/style.json`
      }).addTo(map);
    }
  }, [map]);


  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
      ref={containerMap}
    />
  )

};

export default MapComponent;
