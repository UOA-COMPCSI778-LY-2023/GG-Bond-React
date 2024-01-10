import React, { useState } from "react";
import { Marker, Popup, Polyline, useMap, Pane } from "react-leaflet";
import { FiNavigation2 } from "react-icons/fi";
import { PiCircleDashedThin } from "react-icons/pi";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../ShipMarker/ShipMarker.css";
import WarningAnimation from "./WarningAnimation";

const shipTypeDic = {
    3: "rgba(255, 0, 0, 0.7)", //Tank
    1: "rgba(144, 238, 144, 0.7)", //Cargo
    2: "rgba(222, 184, 135, 0.7)", //Fishing
    6: "rgba(255, 255, 0, 0.7)", //Sailing
    4: "rgba(128, 0, 128, 0.7)", //Pleasure craft
    5: "rgba(173, 216, 230, 0.7)", //Tug & Towing
    7: "rgba(0, 0, 255, 0.7)", //Passenger
    8: "rgba(119, 136, 153, 0.7)", //Law Enforcement
    9: "rgba(0, 0, 139, 0.7)", //Military
    10: "rgba(165, 42, 42, 0.7)", //Dredging
    11: "rgba(169, 169, 169, 0.7)", //Other
};

const shipIcon = (heading, type, mm) => {
    const color = shipTypeDic[type] || "gray";

    return L.divIcon({
        className: "ships-icon",
        html: ReactDOMServer.renderToString(
            <div style={{ position: "relative" }}>
                <FiNavigation2
                    className="ships"
                    style={{
                        stroke: "black",
                        strokeWidth: 0.5,
                        fill: color,
                        transform: `rotate(${heading}deg) scale(1.5)`,
                        position: "absolute",
                    }}
                />
                {mm % 39 == 0 && (
                    <WarningAnimation
                        className="warningIcon"
                        style={{
                            position: "absolute",
                        }}
                    ></WarningAnimation>
                )}
            </div>
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
                icon={shipIcon(he, vt, mm)}
                eventHandlers={{ click: togglePopup }}
            ></Marker>
            {isSelected && (
                <Marker position={[la, lo]} icon={targetIcon()}></Marker>
            )}
        </>
    );
};

export default ShipMarker;
