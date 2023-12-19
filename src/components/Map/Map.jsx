import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    MapContainer,
    LayersControl,
    useMapEvents,
    ScaleControl,
    Marker,
    Popup
} from 'react-leaflet';
import { BasemapLayer } from 'react-esri-leaflet';
import ShipMarker from '../ShipMarker/ShipMarker';
import ShipInfo from '../ShipInfo/ShipInfo';
import 'leaflet/dist/leaflet.css';
import './MarineTrafficStyle.css';
import MockData1000 from '../../MockData/MockData1000new.json';

const center = [-36.842, 174.76];
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function Map() {
    const [selectedBoat, setSelectedBoat] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [mousePosition, setMousePosition] = useState(null);
    const [shipsBasicData, setShipsBasicData] = useState([]);

    const getShipBasicData = async (latLngNE, latLngSW) => {
        const type = '0';
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
            console.error('Error fetching ship details:', error.message);
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
                setMousePosition(e.latlng);
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

    const filteredBoats = MockData1000.filter((boatData) =>
        boatData.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="Map">
            <div className="marine-traffic-search">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="search by id..."
                />
            </div>
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
                <ScaleControl position={'bottomleft'} />
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
                        <BasemapLayer name="Oceans" maxZoom={13} />
                    </LayersControl.BaseLayer>
                </LayersControl>
                {/* MenuOptions */}
                {/* Using filtered boat data */}
                {filteredBoats.map((boatData, index) => (
                    <ShipMarker
                        key={index}
                        boatData={boatData}
                        setSelectedBoat={setSelectedBoat}
                    />
                ))}
                {selectedBoat && (
                    <ShipInfo
                        ship={selectedBoat}
                        setSelectedBoat={setSelectedBoat}
                    />
                )}
            </MapContainer>
            {/* Mouse position display */}
            {mousePosition && (
                <div
                    style={{
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
                        textAlign: 'center',
                    }}
                >
                    Lat: {mousePosition.lat.toFixed(4)}
                    <br />
                    Lng: {mousePosition.lng.toFixed(4)}
                </div>
            )}
        </div>
    );
}

export default Map;
