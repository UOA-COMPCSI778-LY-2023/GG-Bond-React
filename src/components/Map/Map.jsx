import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  useMapEvents,
  ScaleControl,
  LayersControl,
} from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MarineTrafficStyle.css";

import MenuOptions from "../MenuOptions/MenuOptions";
import ShipInfo from "../ShipInfo/ShipInfo";
import ShipMarker from "../ShipMarker/ShipMarker";
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

const center = [-36.842, 174.76];
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function GetMapDetail() {
  const map = useMapEvents({
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
  const [shipsBasicData, setShipsBasicData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [error, setError] = useState("");

  const getShipBasicData = async () => {
    const latLngNE = { lat: 90, lng: 240 };
    const latLngSW = { lat: -90, lng: -240 };
    const type = "0";
    const source = 0;
    const limit = 800;
    const url = `http://13.236.117.100:8888/rest/v1/ship/list/${latLngSW.lng}/${latLngSW.lat}/${latLngNE.lng}/${latLngNE.lat}/${type}/${source}/${limit}`;
    try {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setShipsBasicData(response.data.data);
    } catch (error) {
      console.error("Error fetching ship details:", error.message);
      setError("Error fetching ship details: " + error.message);
    }
  };

  // Map.jsx
// ...

// Map 组件中的 getShipsBySearch 函数

const getShipsBySearch = async (searchTerm) => {
    console.log('Searching for:', searchTerm);
    

    const staticData = [
      { mmsi: '123456789', vesselName: 'Static Ship 1' },
      { mmsi: '987654321', vesselName: 'Static Ship 2' }
    ];
  
    setSearchResults(staticData); 
    setError(""); 
  };
  
  
  
  
  

  const onSelectShip = (ship) => {
    setSelectedShip(ship);
    // 这里可以添加逻辑来移动地图到选定船只的位置
  };

  useEffect(() => {
    getShipBasicData();
  }, []);
  return (
    <div className="Map">
      {error && <div className="error-message">{error}</div>}
      <SearchBox onSearch={getShipsBySearch} />
      <MapContainer
        id="mapId"
        center={center}
        zoom={2}
        scrollWheelZoom={true}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
        minZoom={2}
      >
        <GetMapDetail />
        <ScaleControl position={"bottomleft"} />
        <LayersControl position="bottomleft" collapsed={true}>
          <LayersControl.BaseLayer name="Light map" checked>
            <BasemapLayer name="Gray" />
          </LayersControl.BaseLayer>
          {/* 在这里添加其他 LayersControl.BaseLayer 选项 */}
        </LayersControl>
        <MenuOptions />
        {Array.isArray(shipsBasicData) && shipsBasicData.map((boatData, index) => (
          <ShipMarker
            key={index}
            boatData={boatData}
            setSelectedBoat={setSelectedBoat}
            isSelected={selectedBoat === boatData}
          />
        ))}
        {selectedBoat && (
          <ShipInfo
            ship={selectedBoat}
            setSelectedBoat={setSelectedBoat}
          />
        )}
      </MapContainer>
      <SearchResults results={searchResults} />
      {mousePosition && (
        <div style={{
            position: 'absolute',
            bottom: '20px',
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
            Lat: {mousePosition.lat.toFixed(4)}<br />
            Lng: {mousePosition.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}

export default Map;
