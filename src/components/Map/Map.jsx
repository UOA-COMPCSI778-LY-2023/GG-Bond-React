import React, { useState } from 'react';
import L from 'leaflet';
import { MapContainer, LayersControl, useMapEvents, ScaleControl, useMap } from 'react-leaflet';
import { BasemapLayer } from "react-esri-leaflet";
import 'leaflet/dist/leaflet.css';

import MenuOptions from '../MenuOptions/MenuOptions';
import ShipMarker from '../ShipMarker/ShipMarker';
import ShipInfo from '../ShipInfo/ShipInfo';
import MockData1000 from '../../MockData/MockData1000new.json';

const center = [-36.842, 174.760];
const bounds = L.latLngBounds(L.latLng(-90, -240), L.latLng(90, 240));

function GetMapDetail({ setMousePosition }) {
  const map = useMap();
  useMapEvents({
    mousemove: (e) => {
      setMousePosition(e.latlng);
    },
    zoomend: () => {
      console.log("Current map zoom level：", map.getZoom());
    },
    dragend: () => {
      console.log("Current centre latitude and longitude：", map.getCenter());
      console.log("Bound", map.getBounds());
    },
  });
  return null;
}

function Map() {
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);

  return (
    <div className="Map">
      <MapContainer center={center} zoom={2} scrollWheelZoom={true} maxBoundsViscosity={1.0} maxBounds={bounds} minZoom={2}>
        <GetMapDetail setMousePosition={setMousePosition} />
        <ScaleControl position={"bottomleft"} />
        <LayersControl position="bottomleft" collapsed={true}>
          <LayersControl.BaseLayer name="Light map" checked>
            <BasemapLayer name="Gray" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Dark map">
            <BasemapLayer name="DarkGray" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <BasemapLayer name="Imagery" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Oceans">
            <BasemapLayer name="Oceans" maxZoom={13} />
          </LayersControl.BaseLayer>
        </LayersControl>
        <MenuOptions />
        {MockData1000.map((boatData, index) => (
          <ShipMarker key={index} boatData={boatData} setSelectedBoat={setSelectedBoat} />
        ))}
        {selectedBoat && <ShipInfo ship={selectedBoat} setSelectedBoat={setSelectedBoat} />}
      </MapContainer>
      {mousePosition && (
        <div style={{ 
          position: 'absolute', 
          bottom: '10px', 
          right: '10px', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: '8px 10px',
          zIndex: 1000, 
          borderRadius: '8px',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center'
        }}>
          Lat: {mousePosition.lat.toFixed(4)}<br/>
          Lng: {mousePosition.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}

export default Map;
