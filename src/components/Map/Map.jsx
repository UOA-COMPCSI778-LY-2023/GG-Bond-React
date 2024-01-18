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

import MenuOptions from "../MenuOptions/MenuOptions";
import ShipInfo from "../ShipInfo/ShipInfo";
import ShipMarker from "../ShipMarker/ShipMarker";
import SearchShip from "../SearchShip/SearchShip";

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
  const [shipsBasicData, setShipsBasicData] = useState([]);

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
    }
  };


  useEffect(() => {
    getShipBasicData();
  }, []);

  return (
    <div className="Map">
      
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
      <SearchShip setSelectedBoat={setSelectedBoat}/>
    </div>
  );
}

export default Map;
