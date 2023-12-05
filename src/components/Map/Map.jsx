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
// import { Circle, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//Mock
import mockBoatsData from '../../MockData/MockData';
import ShipMarker from '../ShipMarker/ShipMarker';
//Mock

const center = [-36.842, 174.760]
// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

function Map() {
    return (
      
      <div className="Map">
        <MapContainer id='mapId' center={center} zoom={16} scrollWheelZoom={true}>
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

            <LayersControl.BaseLayer name="Oceans" maxzoom={13}>
              <BasemapLayer name="Oceans" />
            </LayersControl.BaseLayer>

          </LayersControl>
          <MenuOptions></MenuOptions>

          {mockBoatsData.map((boatData, index) => (
            <ShipMarker key={index} boatData={boatData} />
          ))}


          {/* <Marker position={center} icon={shipIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
        </MapContainer>
      </div>
    );
  }
  
  export default Map;

