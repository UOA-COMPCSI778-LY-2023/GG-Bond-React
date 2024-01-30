import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import axios from "axios";
import { MapContainer, useMapEvents, ScaleControl } from "react-leaflet";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MenuOptions from "../MenuOptions/MenuOptions";
import ShipInfo from "../ShipInfo/ShipInfo";
import ShipMarker from "../ShipMarker/ShipMarker";
import SearchShip from "../SearchShip/SearchShip";
import "leaflet/dist/leaflet.css";
import MapLayers from "../MapLayers/MapLayers";
import "leaflet-hash-plus";
import "leaflet.heat";
import "./Map.css";
import VtSelect from "../ShipMarker/VtSelect";
import useHistoryTrack from "../../hooks/useHistoryTrack";
import TrackPopup from "../TrackPopup/TrackPopup";



//map boundary limit
const corner1 = L.latLng(-90, -240);
const corner2 = L.latLng(90, 240);
const bounds = L.latLngBounds(corner1, corner2);

function Map() {
    const [selectedBoat, setSelectedBoat] = useState();
    const [shipsBasicData, setShipsBasicData] = useState([]);
    const [heatData, setHeatData] = useState([]);
    const [map, setMap] = useState(null);
    const [selectedLayer, setSelectedLayer] = useState("Light map");
    const [selectedVt, setSelectedVt] = useState(new Set()); // 使用 Set 来存储选中的 vt 值
    const [isAnimating, setIsAnimating] = useState(false);
    const [cookies] = useCookies(["loggedIn"]);
    const navigate = useNavigate();

    useEffect(() => {
        let hashInstance;
        if (!cookies.loggedIn) {
            navigate("/login"); // Redirect to login page
        } else {
            if (map) {
                // Initialise Leaflet Hash Plus after successful login and map is available
                hashInstance = new L.Hash(map);
            } else {
                console.log("Map is not initialized");
            }
        }

        return () => {
            if (hashInstance && hashInstance.stopListening) {
                hashInstance.stopListening();
            }
        };
    }, [cookies, navigate, map]);

    const interval = 60; // Fixed interval value
    const mmsi = selectedBoat ? selectedBoat.mm : null;

    const { historicalTrackData } = useHistoryTrack(interval, mmsi);
    console.log("Selected Boat MMSI:", mmsi);
    console.log("Selected Boat interval:", interval);
    console.log("historicalTrackData", historicalTrackData);

    let transformedTrackData = [];
    if (historicalTrackData && historicalTrackData.data) {
        transformedTrackData = historicalTrackData.data.map(item => {
            return {
                position: [parseFloat(item.latitude), parseFloat(item.longitude)],
                pollution: 20 // Assign a default pollution value or modify as required
            };
        });
    }

    console.log("Transformed Track Data:", transformedTrackData);

    let realtimestamps = [];
    if (historicalTrackData && historicalTrackData.data) {
        realtimestamps = historicalTrackData.data.map(item => item.dtStaticUtc);
    }

    console.log("Extracted Timestamps:", realtimestamps);


    const handleVtSelect = (vt) => {
        setSelectedVt(prevSelectedVt => {
            const newSelectedVt = new Set(prevSelectedVt);
            if (newSelectedVt.has(vt)) {
                newSelectedVt.delete(vt);
            } else {
                newSelectedVt.add(vt);
            }
            return newSelectedVt;
        });
    };


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
                <MapLayers
                    heatData={heatData}
                    setSelectedLayer={setSelectedLayer}
                />
                <MenuOptions />

                <TrackPopup
                    isAnimating={isAnimating}
                    setIsAnimating={setIsAnimating}
                    trackData={transformedTrackData}
                    realtimestamps={realtimestamps}
                />

                {
                    shipsBasicData
                        .filter(boatData => selectedVt.size > 0 && selectedVt.has(boatData.vt))
                        .map((boatData, index) => (
                            <ShipMarker
                                key={index}
                                boatData={boatData}
                                setSelectedBoat={setSelectedBoat}
                                isSelected={deepEqual(boatData, selectedBoat)}
                                selectedLayer={selectedLayer}
                            />
                        ))
                }


                {selectedBoat && (
                    <ShipInfo
                        ship={selectedBoat}
                        setSelectedBoat={setSelectedBoat}
                    />
                )}
                <VtSelect onVtSelect={handleVtSelect} />
            </MapContainer>


            <SearchShip setSelectedBoat={setSelectedBoat} />
        </div>
    );
}

export default Map;
