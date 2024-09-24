// LocationMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const LocationMap = ({ lat, lng, name, id, avatar }) => {
  return (
    <div className="map-container">
      <div className="header">
        <div className="back-button">◀</div>
        <h2>TRACK LIVE LOCATION</h2>
        <div className="change-link">Change</div>
      </div>
      <div className="user-info">
        <img src={avatar} alt={name} className="user-avatar" />
        <h3>{name} ({id})</h3>
      </div>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>
            {name} is here. <br /> {new Date().toLocaleTimeString()}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
