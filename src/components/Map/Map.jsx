import './Map.css'
import 'leaflet/dist/leaflet.css'
import Menuoptions from '../Menuoptions/Menuoptions';
import { MapContainer, TileLayer, LayersControl} from 'react-leaflet';
// import { Marker, Popup, , LayerGroup, FeatureGroup} from 'react-leaflet';
// import { Circle, Rectangle } from 'react-leaflet';

const center = [-36.842, 174.760]

function Map() {
    return (
      <div className="Map">
        <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Google Satellite">
            <TileLayer
            attribution='&copy; <a href="https://maps.google.com">Google Map</a>'
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={19}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Trafic">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenTraficMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
          <Menuoptions></Menuoptions>
        </MapContainer>
      </div>
    );
  }
  
  export default Map;