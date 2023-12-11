import { useState } from 'react';
import { MapContainer, LayersControl} from 'react-leaflet';
import {
  BasemapLayer,
  FeatureLayer,
  DynamicMapLayer,
  TiledMapLayer,
  ImageMapLayer
} from "react-esri-leaflet";
import MenuOptions from '../MenuOptions/MenuOptions';

// import './Map.css'
import { Marker, Popup} from 'react-leaflet';
import ShipInfo from '../ShipInfo/ShipInfo';
import ReactDOMServer from 'react-dom/server';
// import { Circle, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//Mock
// import mockBoatsData from '../../MockData/MockData';
//Real Data
//Data levle 500
import MockData500 from '../../MockData/MockData500.json'
//1000 
import MockData1000 from '../../MockData/MockData1000new.json'
//5000
import MockData5000 from '../../MockData/MockData5000.json'
//10000 too many
import MockData10000 from '../../MockData/MockData10000.json'
//100000 too many
import MockData100000 from '../../MockData/MockData100000.json'
import ShipMarker from '../ShipMarker/ShipMarker';
//Mock

const center = [-36.842, 174.760]
// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

//map boundary limit
const corner1 = L.latLng(-90, -200);
const corner2 = L.latLng(90, 200);
const bounds = L.latLngBounds(corner1, corner2);


function Map() {

    return (
      
      <div className="Map">
        <MapContainer id='mapId' center={center} zoom={2} scrollWheelZoom={true} maxBoundsViscosity={1.0} maxBounds={bounds} minZoom={2}>
          <LayersControl position="topleft" collapsed={true}>

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
              <BasemapLayer name="Oceans" maxzoom={13} />
            </LayersControl.BaseLayer>

          </LayersControl>
          <MenuOptions></MenuOptions>

          {MockData1000.map((boatData, index) => (
            <ShipMarker key={index} boatData={boatData}/>
          ))}
          
        </MapContainer>
      </div>
    );
  }
  
  export default Map;

