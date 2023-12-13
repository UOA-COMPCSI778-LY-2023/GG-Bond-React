import React, {useState} from 'react';
import { Marker, Popup, Polyline } from 'react-leaflet';
import { FiNavigation2 } from "react-icons/fi";
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';


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

const ShipMarker = ({ boatData, setSelectedBoat }) => {
  const { name, type, speed, location, status } = boatData;
  const togglePopup = () => {
    setSelectedBoat(boatData);
  };
  
  return (
    <>
        <Marker position={[location.latitude, location.longitude]} icon={shipIcon(location.heading, type)}
        eventHandlers= {{click: togglePopup}} > 
        </Marker>

    </>
  );
};


export default ShipMarker;
