import React, { useState } from "react";
import { Marker, Popup, Polyline } from "react-leaflet";
import { FiNavigation2 } from "react-icons/fi";
import { PiCircleDashedThin } from "react-icons/pi";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../ShipMarker/ShipMarker.css";

const shipTypeDic = {
    3: "red", //Tank
    1: "lightgreen", //Cargo
    2: "burlywood", //Fishing
    6: "yellow", //Sailing
    4: "purple", //Pleasure craft
    5: "lightblue", //Tug & Towing
    7: "blue", //Passenger
    8: "lightslategray", //Law Enforcement
    9: "darkblue", //Military
    10: "brown", //Dredging
    11: "lightgray", //Other
};

const shipIcon = (heading, type) => {
    const color = shipTypeDic[type] || "gray";

    return L.divIcon({
        className: "ships-icon",
        html: ReactDOMServer.renderToString(
            <FiNavigation2
                className="ships"
                style={{
                    strokeColor: "black",
                    fill: color,
                    transform: `rotate(${heading}deg) scale(1.5)`,
                }}
            />
        ),
    });
};

const targetIcon = () => {
    return L.divIcon({
        className: "target-icon",
        html: ReactDOMServer.renderToString(
            <PiCircleDashedThin className="targetShip" />
        ),
    });
};

const ShipMarker = ({ boatData, setSelectedBoat, isSelected }) => {
    const { co, he, la, lo, mm, ut, vt } = boatData;
    const togglePopup = () => {
        setSelectedBoat(boatData);
    };

    return (
        <>
            <Marker
                position={[la, lo]}
                icon={shipIcon(he, vt)}
                eventHandlers={{ click: togglePopup }}
            ></Marker>
            {isSelected && (
                <Marker position={[la, lo]} icon={targetIcon()}></Marker>
            )}
        </>
    );
};

export default ShipMarker;
