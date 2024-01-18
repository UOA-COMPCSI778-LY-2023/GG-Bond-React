import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import axios from "axios";
import { MapContainer, useMapEvents, ScaleControl } from "react-leaflet";
import MenuOptions from "../MenuOptions/MenuOptions";
import ShipInfo from "../ShipInfo/ShipInfo";
import ShipMarker from "../ShipMarker/ShipMarker";
import SearchShip from "../SearchShip/SearchShip";
import "leaflet/dist/leaflet.css";
import MapLayers from "../MapLayers/MapLayers";
import leafletHashPlus from "leaflet-hash-plus"; // Don't DELETE this line
import "leaflet.heat";
import "./Map.css";

//map boundary limit
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function Map() {
    const [selectedBoat, setSelectedBoat] = useState();
    const [shipsBasicData, setShipsBasicData] = useState([]);
    const [heatData, setHeatData] = useState([]);
    const [map, setMap] = useState(null);

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
            const heatdata = response.data.data.map((item) => [
                item.la,
                item.lo,
                item.lv,
            ]);
            setHeatData(heatdata);
        } catch (error) {
            console.error("Error fetching ship details:", error.message);
        }
    };

    useEffect(() => {
        if (map) {
            const latLngNE = map.getBounds()._northEast;
            const latLngSW = map.getBounds()._southWest;
            getShipBasicData(latLngNE, latLngSW);

            // Initialize Leaflet Hash Plus when the component mounts
            new L.Hash(map);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    const handleMoveEnd = useCallback(() => {
        if (map) {
            getShipBasicData(
                map.getBounds()._northEast,
                map.getBounds()._southWest
            );
        }
    }, [map]);

    function GetMapDetail() {
        useMapEvents({
            moveend: handleMoveEnd,
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
                center={[-36.842, 174.76]}
                zoom={14}
                scrollWheelZoom={true}
                maxBoundsViscosity={1.0}
                maxBounds={bounds}
                minZoom={2}
                ref={setMap}
            >
                <GetMapDetail />
                <ScaleControl position={"bottomleft"} />
                <MapLayers heatData={heatData} />
                <MenuOptions />

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
                    />
                )}
            </MapContainer>
            <SearchShip setSelectedBoat={setSelectedBoat} />
        </div>
    );
}

export default Map;
