import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import geojson from '../russia.geojson'

const MapComponent = () => {
  const [regionsData, setRegionsData] = useState(null);




  useEffect(() => {
    fetch('/russia.geojson') // Замените на путь к вашему GeoJSON файлу
      .then(response => response.json())
      .then(data => setRegionsData(data));
  }, []);

  if (!regionsData) {
    return <div>Загрузка данных...</div>;
  }

    // Стили для границ регионов
    const regionStyle = {
      color: 'blue', // Цвет границы
      weight: 2, // Толщина границы
      opacity: 1, // Прозрачность границы
      fillOpacity: 0, // Прозрачность заливки (0 - без заливки)
    };
  
    return (
      <MapContainer center={[60, 100]} zoom={5} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
  
  {regionsData.features.map((feature, index) => (
          <GeoJSON
            key={index}
            data={feature.geometry.coordinates}
          />
        ))}
        {/* Отображение границ регионов */}
        {/* <GeoJSON data={} style={regionStyle} /> */}
      </MapContainer>
    );
  };
  
  export default MapComponent;