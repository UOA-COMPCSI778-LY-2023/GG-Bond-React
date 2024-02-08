import React, { useState, useEffect, useCallback } from "react";
import L from "leaflet";
import { getShipBasicData } from "../../utils/api";
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
    const [tourOpen, setTourOpen] = useState(false);
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

    const handleSelectBoat = (boatData) => {
        if (selectedBoat && selectedBoat.mm === boatData.mm) {
            // 如果点击的是当前已选中的船只，则取消选择
            setSelectedBoat(null);
        } else {
            // 否则，更新为新选中的船只
            setSelectedBoat(boatData);
        }
    };

    // 更新历史轨迹数据的逻辑

    const fetchShipBasicData = async (latLngNE, latLngSW) => {
        const type = "0";
        const source = 0;
        const limit = 500;
        try {
            const response = await getShipBasicData(
                latLngNE,
                latLngSW,
                type,
                source,
                limit
            );

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
            fetchShipBasicData(latLngNE, latLngSW);
        }
    }, [map]);

    const handleMoveEnd = useCallback(() => {
        if (map) {
            fetchShipBasicData(
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
        if (
            obj1 === null ||
            obj2 === null ||
            typeof obj1 === "undefined" ||
            typeof obj2 === "undefined"
        ) {
            return false;
        }

        if (obj1.mm !== undefined && obj2.mm !== undefined) {
            if (obj1.mm === obj2.mm) return true;
        }

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
                center={[-40.797, 174.99]}
                zoom={6}
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
                <MenuOptions tourOpen={tourOpen} setTourOpen={setTourOpen} />


                {
                    shipsBasicData
                    .filter(boatData => selectedVt.size === 0 || selectedVt.has(boatData.vt)) // 仍然基于VT过滤
                        .map((boatData) => (
                            <ShipMarker
                                key={boatData.mm}
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
            <SearchShip setSelectedBoat={setSelectedBoat} map={map} />
        </div>
    );
}

export default Map;
