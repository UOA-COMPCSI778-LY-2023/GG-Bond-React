import React, { useState } from 'react'; // 导入 useState
import { Marker, Popup, Polyline } from 'react-leaflet'; // 导入 Polyline
import { FiNavigation2 } from "react-icons/fi";
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import ShipInfo from '../ShipInfo/ShipInfo';
import shipMockData from '../ShipInfo/ShipMockData';

const shipTypeDic = {
    "Tank" : "red",
    "Cargo" : "lightgreen",
    "Fishing" : "burlywood",
    "Craft" : "yellow",
    "Pleasure" : "purple",
    "Tugs" : "lightblue",
    "Passenger" : "blue",
    "Navigation Aids" : "pink",
    "Unspecified" : "lightgray"
}

const shipIcon = (heading, type) => {
    const color = shipTypeDic[type] || 'gray';
  
    return L.divIcon({
      className: 'custom-icon',
      html: ReactDOMServer.renderToString(
        <FiNavigation2 style={{strokeColor: "black", fill: color, transform: `rotate(${heading}deg) scale(1.5)` }} />
      ),
    });
  };

const ShipMarker = ({ boatData }) => {
  const { name, type, speed, location, status } = boatData;
  const [showTrack, setShowTrack] = useState(false);

  const toggleTrack = () => {
    setShowTrack(!showTrack);
  };
    // 模拟轨迹数据
    const mockTrack = [
      [37.7749, -122.4194], 
      [34.0522, -118.2437], 
      [25.7617, -80.1918],  
      [40.7128, -74.0060], 
    ];

   return (
    <Marker position={[boatData.location.latitude, boatData.location.longitude]} icon={shipIcon(boatData.location.heading, boatData.type)}>
      <Popup>
        <ShipInfo ship={boatData} toggleTrack={toggleTrack} />
        {showTrack && <Polyline positions={mockTrack} color="red" />}
      </Popup>
    </Marker>
  );
};


export default ShipMarker;
