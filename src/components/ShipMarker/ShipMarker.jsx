import React, { useState } from "react";
import { Marker, Popup, Polyline,useMap,Pane } from "react-leaflet";
import { FiNavigation2 } from "react-icons/fi";
import { PiCircleDashedThin } from "react-icons/pi";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import "../ShipMarker/ShipMarker.css";
import WarningAnimation from "./WarningAnimation";

const shipTypeDic = {
    3: "red", //Tank
    1: "lightgreen", //Cargo
    2: "burlywood", //Fishing
    6: "yellow", //Sailing
    4: "purple", //Pleasure
    5: "lightblue", //Tugs
    7: "blue", //Passenger
    // 8: "pink", //Military & Law Enforcement
    9: "lightgray", //Other
};

const shipIcon = (heading, type, mm) => {
    const color = shipTypeDic[type] || "gray";

    return L.divIcon({
        className: "ships-icon",
        html: ReactDOMServer.renderToString(
            <div style={{position: 'relative'}}>
                <FiNavigation2
                    className="ships"
                    style={{
                        strokeColor: "black",
                        fill: color,
                        transform: `rotate(${heading}deg) scale(1.5)`,
                        position:'absolute'
                    }}
                />
                {mm%39==0 && <WarningAnimation 
                    className="warningIcon"
                    style={{
                        position:'absolute'
                    }}
                    ></WarningAnimation>}
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
