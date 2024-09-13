import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import regionsData from './Regions.json'

const MapComponent = () => {
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
  
        {/* Отображение границ регионов */}
        <GeoJSON data={regionsData} style={regionStyle} />
      </MapContainer>
    );
  };
  
  export default MapComponent;