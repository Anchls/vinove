import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

const MapComponent = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([37.7749, -122.4194], 13); // Example coordinates (San Francisco)

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom marker icon with profile picture
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-container">
          <div class="marker-image">
            <img src="profile.jpg" alt="Profile" />
            <div class="status-dot"></div>
          </div>
          <div class="marker-time">5 min ago</div>
        </div>
      `,
      iconSize: [50, 50],
      popupAnchor: [0, -20],
    });

    // Add the custom marker to the map
    L.marker([37.7749, -122.4194], { icon: customIcon }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
