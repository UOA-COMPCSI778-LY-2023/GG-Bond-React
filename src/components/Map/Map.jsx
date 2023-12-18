
import L from "leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    MapContainer,
    LayersControl,
    useMapEvents,
    ScaleControl,
    useMap
} from "react-leaflet";
import { BasemapLayer } from "react-esri-leaflet";

// import './Map.css'
import MenuOptions from "../MenuOptions/MenuOptions";
import { Marker, Popup } from "react-leaflet";
import ShipInfo from "../ShipInfo/ShipInfo";
import ReactDOMServer from "react-dom/server";
import ShipMarker from "../ShipMarker/ShipMarker";
import "leaflet/dist/leaflet.css";
import SearchShip from "../SearchShip/SearchShip";

// //Mock
// // import mockBoatsData from '../../MockData/MockData';
// //Real Data
// //1000
// import MockData1000 from "../../MockData/MockData1000new.json";
// //Data levle 500
// import MockData500 from "../../MockData/MockData500.json";
// //5000
// import MockData5000 from "../../MockData/MockData5000.json";
// //10000 too many
// import MockData10000 from "../../MockData/MockData10000.json";
// //100000 too many
// import MockData100000 from "../../MockData/MockData100000.json";
// //Mock

const center = [-36.842, 174.76];
// const apiKey = "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-";
// const baseUrl = "https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles";

//map boundary limit
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function Map() {
    const [selectedBoat, setSelectedBoat] = useState();

    const [mousePosition, setMousePosition] = useState(null); // Added for mouse position tracking

    const [shipsBasicData, setShipsBasicData] = useState([]);

    const getShipBasicData = async (latLngNE, latLngSW) => {

        const type = "0";
        const source = 0;
        const limit = 800;
        console.log(latLngNE, latLngSW);
        const url = `http://13.236.117.100:8888/rest/v1/ship/list/${latLngSW.lng}/${latLngSW.lat}/${latLngNE.lng}/${latLngNE.lat}/${type}/${source}/${limit}`;

        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setShipsBasicData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching ship details:", error.message);
        }
    };

    useEffect(() => {
        const latLngNE = { lat: 90, lng: 240 };
        const latLngSW = { lat: -90, lng: -240 };
        getShipBasicData(latLngNE, latLngSW);
    }, []);

    function GetMapDetail() {

        const map = useMapEvents({
            mousemove: (e) => {
                setMousePosition(e.latlng); // Track mouse position
            },
            zoomend: () => {
                getShipBasicData(
                    map.getBounds()._northEast,
                    map.getBounds()._southWest
                );
            },
            moveend: () => {
                getShipBasicData(
                    map.getBounds()._northEast,
                    map.getBounds()._southWest
                );
            },
        });

      return null;
  }

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

                    <LayersControl.BaseLayer name="Dark map">
                        <BasemapLayer name="DarkGray" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Satellite">
                        <BasemapLayer name="Imagery" />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer name="Oceans">
                        <BasemapLayer name="Oceans" maxZoom={13} />{" "}
                        {/*China maxZoom={10} */}
                    </LayersControl.BaseLayer>
                </LayersControl>
                <MenuOptions />
                <SearchShip />


                {/* Displaying ships using fetched data */}
                {shipsBasicData.map((boatData, index) => (
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

            {/* Displaying mouse position */}
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
