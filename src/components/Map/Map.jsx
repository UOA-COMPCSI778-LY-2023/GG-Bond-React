import L from "leaflet";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, useMapEvents, ScaleControl } from "react-leaflet";
import MenuOptions from "../MenuOptions/MenuOptions";
import ShipInfo from "../ShipInfo/ShipInfo";
import ShipMarker from "../ShipMarker/ShipMarker";
import "leaflet/dist/leaflet.css";
import SearchShip from "../SearchShip/SearchShip";
import MapLayers from "../MapLayers/MapLayers";
// import './Map.css'

const center = [-36.842, 174.76];
//map boundary limit
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function Map() {
    const [selectedBoat, setSelectedBoat] = useState();
    const [shipsBasicData, setShipsBasicData] = useState([]);

    const getShipBasicData = async (latLngNE, latLngSW) => {
        const type = "0";
        const source = 0;
        const limit = 500;
        const url = `http://13.236.117.100:8888/rest/v1/ship/list/${latLngSW.lng}/${latLngSW.lat}/${latLngNE.lng}/${latLngNE.lat}/${type}/${source}/${limit}`;

        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setShipsBasicData(response.data.data);
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

    //Help function to check boat
    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (
            typeof obj1 !== "object" ||
            obj1 === null ||
            typeof obj2 !== "object" ||
            obj2 === null
        ) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
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
                <MapLayers />
                <MenuOptions />
                <SearchShip />

                {shipsBasicData.map((boatData, index) => {
                    return (
                        <ShipMarker
                            key={index}
                            boatData={boatData}
                            setSelectedBoat={setSelectedBoat}
                            isSelected={deepEqual(boatData, selectedBoat)}
                        />
                    );
                })}
                {selectedBoat && (
                    <ShipInfo
                        ship={selectedBoat}
                        setSelectedBoat={setSelectedBoat}
                    ></ShipInfo>
                )}
            </MapContainer>
        </div>
    );
}

export default Map;
