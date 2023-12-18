import React, { useState } from 'react';
import { MapContainer, LayersControl, useMapEvents, ScaleControl } from 'react-leaflet';
import { BasemapLayer } from "react-esri-leaflet";
import L from 'leaflet'; 
import MenuOptions from '../MenuOptions/MenuOptions';
import ShipMarker from '../ShipMarker/ShipMarker';
import ShipInfo from '../ShipInfo/ShipInfo';
import 'leaflet/dist/leaflet.css';
import './MarineTrafficStyle.css'; 
import MockData1000 from '../../MockData/MockData1000new.json';

const center = [-36.842, 174.760];
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function GetMapDetail() {
  const map = useMapEvents({
    zoomend: () => {
      console.log("Current map zoom level:", map.getZoom());
    },
    dragend: () => {
      console.log("Current centre latitude and longitude:", map.getCenter());
      console.log("Bound:", map.getBounds());
    },
  });
  return null;
}

function Map() {
  const [selectedBoat, setSelectedBoat] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoats = MockData1000.filter((boatData) =>
    boatData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Map">
      <div className="marine-traffic-search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="search by id..."
        />
      </div>

     
      <MapContainer id='mapId' center={center} zoom={2} scrollWheelZoom={true} maxBoundsViscosity={1.0} maxBounds={bounds} minZoom={2}>
        <GetMapDetail />
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
        <MenuOptions></MenuOptions>

        {/* 使用过滤后的船只数据 */}
        {filteredBoats.map((boatData, index) => (
          <ShipMarker key={index} boatData={boatData} setSelectedBoat={setSelectedBoat} />
        ))}
        {selectedBoat && <ShipInfo ship={selectedBoat} setSelectedBoat={setSelectedBoat}></ShipInfo>}
      </MapContainer>
    </div>
  );
}

export default Map;
