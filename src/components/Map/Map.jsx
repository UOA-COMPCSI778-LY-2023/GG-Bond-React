import L from 'leaflet';
import { MapContainer, LayersControl, useMapEvents, ScaleControl} from 'react-leaflet';
import {BasemapLayer} from "react-esri-leaflet";
import MenuOptions from '../MenuOptions/MenuOptions';
import ShipMarker from '../ShipMarker/ShipMarker';
// import GetMapDetail from '../GetMapDetail/GetMapDetail';
import 'leaflet/dist/leaflet.css';

//Mock
// import mockBoatsData from '../../MockData/MockData';
//Real Data
//1000 
import MockData1000 from '../../MockData/MockData1000.json'
/*//Data levle 500
import MockData500 from '../../MockData/MockData500.json'
//5000
import MockData5000 from '../../MockData/MockData5000.json'
//10000 too many
import MockData10000 from '../../MockData/MockData10000.json'
//100000 too many
import MockData100000 from '../../MockData/MockData100000.json'*/
//Mock

const center = [-36.842, 174.760]
// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

//map boundary limit
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
  })
  return null
}

function Map() {



    return (
      
      <div className="Map">
        <MapContainer id='mapId' center={center} zoom={2} scrollWheelZoom={true} maxBoundsViscosity={1.0} maxBounds={bounds} minZoom={2}>
          <GetMapDetail />
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
              <BasemapLayer name="Oceans" maxZoom={13} /> {/*China maxZoom={10} */}
            </LayersControl.BaseLayer>

          </LayersControl>
          <MenuOptions></MenuOptions>

          {MockData1000.map((boatData, index) => (
            <ShipMarker key={index} boatData={boatData}/>
          ))}
          <ScaleControl position={"bottomleft"} />
        </MapContainer>
      </div>
    );
  }
  
  export default Map;


