import React, {useState} from 'react';
import { Marker, Popup } from 'react-leaflet';
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
  
  return (
    <Marker position={[location.latitude, location.longitude]} icon={shipIcon(location.heading, type)}>
      <Popup>

        <ShipInfo ship={shipMockData}></ShipInfo>

      </Popup>
    </Marker>
  );
};

export default ShipMarker;
