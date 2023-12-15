import React, { useState } from "react";
import { Marker, Popup, Polyline } from "react-leaflet";
import { FiNavigation2 } from "react-icons/fi";
import { PiCircleDashedThin } from "react-icons/pi";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../ShipMarker/ShipMarker.css";

const shipTypeDic = {
    Tank: "red",
    Cargo: "lightgreen",
    Fishing: "burlywood",
    Craft: "yellow",
    Pleasure: "purple",
    Tugs: "lightblue",
    Passenger: "blue",
    "Navigation Aids": "pink",
    Unspecified: "lightgray",
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
    const { name, type, speed, location, status } = boatData;
    const togglePopup = () => {
        setSelectedBoat(boatData);
    };

    return (
        <>
            <Marker
                position={[location.latitude, location.longitude]}
                icon={shipIcon(location.heading, type)}
                eventHandlers={{ click: togglePopup }}
            ></Marker>
            {isSelected && (
                <Marker
                    position={[location.latitude, location.longitude]}
                    icon={targetIcon()}
                ></Marker>
            )}
        </>
    );
};

export default ShipMarker;
