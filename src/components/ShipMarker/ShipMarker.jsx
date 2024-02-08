import React from "react";
import { Marker } from "react-leaflet";
import { FiNavigation2 } from "react-icons/fi";
import { PiCircleDashedThin } from "react-icons/pi";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../ShipMarker/ShipMarker.css";
import WarningAnimation from "./WarningAnimation";

const shipTypeDic = {
    1: "rgba(144, 238, 144)", //Cargo
    2: "rgba(222, 184, 135)", //Fishing
    3: "rgba(255, 0, 0)", //Tank
    4: "rgba(230, 161, 223)", //Pleasure craft
    5: "rgba(173, 216, 230)", //Tug & Towing
    6: "rgba(255, 255, 0)", //Sailing
    7: "rgba(245, 99, 66)", //Passenger
    8: "rgba(119, 136, 153)", //Law Enforcement
    9: "rgba(0, 0, 139)", //Military
    10: "rgba(165, 42, 42)", //Dredging
    11: "rgba(169, 169, 169)", //Other
};

const shipIcon = (heading, type, mm, colorType, at) => {
    const color = shipTypeDic[type] || "gray";
    return L.divIcon({
        className: "ships-icon",
        html: ReactDOMServer.renderToString(
            <div style={{ position: "relative" }}>
                <FiNavigation2
                    className="ships"
                    style={{
                        stroke: colorType === "dark" ? "grey" : "black",
                        opacity: colorType === "dark" ? 1 : 0.7,
                        strokeWidth: 0.5,
                        fill: color,
                        transform: `rotate(${heading}deg) scale(1.5)`,
                        position: "absolute",
                    }}
                />
                {at > 0 && (
                    <WarningAnimation
                        className="warningIcon"
                        style={{
                            position: "absolute",
                        }}
                        colorType={colorType}
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

const ShipMarker = ({
    boatData,
    setSelectedBoat,
    isSelected,
    selectedLayer,
}) => {
    const colorType =
        selectedLayer === "Satellite" || selectedLayer === "Dark map"
            ? "dark"
            : "light";
    const { he, la, lo, mm, vt, at } = boatData;

    const togglePopup = () => {
        console.log("Clicked Marker's vt value:", vt); // Log the vt value
        setSelectedBoat(boatData);
    };

    return (
        <>
            <Marker
                position={[la, lo]}
                icon={shipIcon(he, vt, mm, colorType, at)}
                eventHandlers={{ click: togglePopup }}
            ></Marker>
            {isSelected && (
                <Marker position={[la, lo]} icon={targetIcon()}></Marker>
            )}
        </>
    );
};

export default ShipMarker;
