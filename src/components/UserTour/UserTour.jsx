import React, { useRef, useEffect } from "react";
import { Tour } from "antd";
const UserTour = ({
    tourOpen,
    setTourOpen,
    setShowSearchLocation,
    setShowDrawTools,
}) => {
    const drawToolsRef = useRef(null);
    const searchLocationRef = useRef(null);
    const filterRef = useRef(null);
    const downloadRef = useRef(null);
    const searchShipRef = useRef(null);
    const tourRef = useRef(null);
    const logoutRef = useRef(null);
    const mapLayersControlRef = useRef(null);

    useEffect(() => {
        if (tourOpen) {
            setShowSearchLocation(true);
            setShowDrawTools(true);
        }
        searchShipRef.current = document.querySelector(".search-box-container");
        searchLocationRef.current = document.querySelector(".geocoder-control");
        drawToolsRef.current = document.querySelector(".leaflet-draw");
        filterRef.current = document.querySelector(".filterBtn");
        downloadRef.current = document.querySelector(".downloadBtn");
        tourRef.current = document.querySelector(".tourBtn");
        logoutRef.current = document.querySelector(".logoutBtn");
        mapLayersControlRef.current = document.querySelector(
            ".leaflet-control-layers"
        );
        const mapLayersControl = mapLayersControlRef.current;
        if (mapLayersControl) {
            if (tourOpen) {
                mapLayersControl.classList.add(
                    "leaflet-control-layers-expanded"
                );
            } else {
                // 恢复到默认状态
                mapLayersControl.classList.remove(
                    "leaflet-control-layers-expanded"
                );
            }
        }
    }, [tourOpen]);

    const steps = [
        {
            title: "Search Ship",
            description:
                "Here you can enter the name or MMSI of the vessel you want to find.",
            target: () => searchShipRef.current,
        },
        {
            title: "Search Location",
            description: "You can do a geolocation search here.",
            target: () => searchLocationRef.current,
        },
        {
            title: "Draw Tools",
            description:
                "You can use these tools for ranging, highlighting areas. Polygon and circle drawn areas can be used to select areas to be downloaded.",
            target: () => drawToolsRef.current,
        },
        {
            title: "Filter",
            description:
                "Here you can filter the vessels (type, country, signal reception).",
            target: () => filterRef.current,
        },
        {
            title: "Download",
            description:
                "You can download the vessel information here (remember to draw the area with the drawing tool first).",
            target: () => downloadRef.current,
        },
        {
            title: "Log Out",
            description: "Click here to log out.",
            target: () => logoutRef.current,
        },
        {
            title: "Map Layers",
            description: "Switch the map base or add an overlay here.",
            target: () => mapLayersControlRef.current,
        },
        {
            title: "Tour",
            description: "If you forget how to use it, check back.",
            target: () => tourRef.current,
        },
    ];
    return (
        <>
            <Tour
                open={tourOpen}
                onClose={() => setTourOpen(false)}
                steps={steps}
                indicatorsRender={(current, total) => (
                    <span>
                        {current + 1} / {total}
                    </span>
                )}
            />
        </>
    );
};
export default UserTour;
