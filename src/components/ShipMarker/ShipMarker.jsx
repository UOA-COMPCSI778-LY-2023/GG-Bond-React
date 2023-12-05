import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MdOutlineNavigation } from "react-icons/md";
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import ShipInfo from '../ShipInfo/ShipInfo';
import shipMockData from '../ShipInfo/ShipMockData';


const shipIcon = (heading) => L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<MdOutlineNavigation style={{ color: 'green', transform: `rotate(${heading}deg)` }}/>),
});

const ShipMarker = ({ boatData }) => {
  const { name, type, speed, location, status } = boatData;

  return (
    <Marker position={[location.latitude, location.longitude]} icon={shipIcon(location.heading)}>
      <Popup>
        
        {/* <div>
          <h3>{name}</h3>
          <p>Type: {type}</p>
          <p>Speed: {speed} knots</p>
          <p>Status: {status}</p>
          {/* Add more details or styling as needed */}
        {/* </div> */} 
        <ShipInfo ship={shipMockData}></ShipInfo>

      </Popup>
    </Marker>
  );
};

export default ShipMarker;