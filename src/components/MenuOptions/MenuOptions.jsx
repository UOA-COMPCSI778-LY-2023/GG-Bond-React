import React, { useState, useEffect } from "react";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import DownloadShipsInfo from "../DownloadShipsInfo/DownloadShipsInfo";
import DrawTools from "../DrawTools/DrawTools";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "./MenuOptions.css";
import ShipTypeFilter from "../ShipTypeFilter/ShipTypeFilter";
import L from "leaflet";
import { useCookies } from "react-cookie";

import { FloatButton } from "antd";
import {
    ToolOutlined,
    DownloadOutlined,
    SearchOutlined,
    FilterOutlined,
    createFromIconfontCN,
    EnvironmentOutlined,
} from "@ant-design/icons";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const shipTypes = [
    // { type: 'ALL', color: 'Black' },
    { type: "Tank", color: "Red" },
    { type: "Cargo", color: "LightGreen" },
    { type: "Fishing", color: "YellowBrown" },
    { type: "Tug", color: "Blue" },
    { type: "Sailboat", color: "Navy" },
    { type: "Cruise", color: "Purple" },
    { type: "Container", color: "Orange" },
    { type: "Bulk Carrier", color: "Maroon" },
    { type: "Naval", color: "Gray" },
    { type: "Patrol", color: "Olive" },
    { type: "Research", color: "Lime" },
    { type: "Yacht", color: "Teal" },
    { type: "Oil Tanker", color: "Black" },
    { type: "Ferry", color: "RoyalBlue" },
    { type: "Submarine", color: "Aqua" },
    // Add additional ship types as necessary
];

const countryTypes = [
    // { type: 'ALL', color: 'Black' },
    { type: "CN", color: "Red" },
    { type: "NZ", color: "LightGreen" },
    { type: "USA", color: "YellowBrown" },

    // Add additional ship types as necessary
];

const MenuOptions = () => {
    const [dark, setDark] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [showDrawTools, setShowDrawTools] = useState(true);
    const [showSearchLocation, setShowSearchLocation] = useState(true);
    const [showDownloadPanel, setShowDownloadPanel] = useState(false);
    const [shapesContainer, setShapeContainer] = useState({
        polygon: {},
        circle: {},
    });

    const toggleDarkOrLightMode = () => {
        setDark(!dark);
        setIsActive(!isActive);
    };

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    const handleFilterSelect = (filterType) => {
        setSelectedFilters((prevFilters) => {
            // Add or remove filter from the array
            if (prevFilters.includes(filterType)) {
                return prevFilters.filter((f) => f !== filterType);
            } else {
                return [...prevFilters, filterType];
            }
        });
    };

    const handleCountrySelect = (countryType) => {
        setSelectedCountries((prevCountries) => {
            if (prevCountries.includes(countryType)) {
                return prevCountries.filter(
                    (country) => country !== countryType
                );
            } else {
                return [...prevCountries, countryType];
            }
        });
    };

    const toggleDrawTools = (e) => {
        setShowDrawTools(!showDrawTools);
        e.stopPropagation();
    };

    const toggleSearchLocation = () => {
        setShowSearchLocation(!showSearchLocation);
    };

    const toggleDownloadPanel = () => {
        console.log(shapesContainer);
        setShowDownloadPanel(!showDownloadPanel);
    };
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

    const toggleLogOut = () => {
        removeCookie("loggedIn");
    };

    useEffect(() => {
        const el = document.getElementById("menuoptions");
        L.DomEvent.on(el, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    // const menuOptionsStyle = {
    //     background: isActive ? "white" : "#1c2330", // Change background color based on isActive
    // };

    // const buttonStyle = {
    //     color: isActive ? "#1c2330" : "#fff", // Change button color based on isActive
    // };

    return (
        <div id="menuoptions">
            {/* style={menuOptionsStyle} */}
            <FloatButton.Group
                className="functionpanel"
                shape="square"
                trigger="hover"
                icon={<ToolOutlined />}
            >
                <FloatButton
                    onClick={toggleDarkOrLightMode}
                    icon={dark ? <FaLightbulb /> : <FaRegLightbulb />}
                    className="menubtn"
                />
                <FloatButton
                    onClick={toggleDrawTools}
                    onDoubleClick={(e) => {
                        // console.log(e);
                        // e.preventDefault();
                        // e.stopPropagation();
                    }}
                    icon={<LiaDrawPolygonSolid />}
                    tooltip={<div>Draft</div>}
                    className="menubtn"
                />
                <FloatButton
                    onClick={toggleSearchLocation}
                    icon={<EnvironmentOutlined />}
                    tooltip={<div>Localization</div>}
                    className="menubtn"
                />
                <FloatButton
                    icon={<SearchOutlined />}
                    onClick={(e) => console.log("name:" + e.target.tagName)}
                    tooltip={<div>Search</div>}
                    className="menubtn"
                />
                <FloatButton
                    onClick={toggleFilterDropdown}
                    icon={<FilterOutlined />}
                    tooltip={<div>Filter</div>}
                    className="menubtn"
                />

                <FloatButton
                    onClick={toggleDownloadPanel}
                    tooltip={<div>Download</div>}
                    icon={<DownloadOutlined />}
                    className="menubtn"
                />

                <FloatButton
                    onClick={toggleLogOut}
                    tooltip={<div>LogOut</div>}
                    icon={<IconFont type="icon-tuichu" />}
                    className="menubtn"
                />
            </FloatButton.Group>

            {showFilterDropdown && (
                <ShipTypeFilter
                    selectedFilters={selectedFilters}
                    handleFilterSelect={handleFilterSelect}
                    shipTypes={shipTypes}
                    selectedCountries={selectedCountries}
                    handleCountrySelect={handleCountrySelect}
                    countryTypes={countryTypes}
                />
            )}
            {/* filter */}
            {showDrawTools && (
                <DrawTools
                    onChange={(geojsonData) => console.log(geojsonData)}
                    setShapeContainer={setShapeContainer}
                />
            )}
            {showSearchLocation && (
                <EsriLeafletGeoSearch
                    position="topright"
                    useMapBounds={false}
                    providers={{
                        arcgisOnlineProvider: {
                            token: "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-",
                            label: "ArcGIS Online Results",
                            maxResults: 10,
                        },
                    }}
                    expanded={true}
                    title=""
                />
            )}
            {showDownloadPanel && (
                <DownloadShipsInfo
                    setShowDownloadPanel={setShowDownloadPanel}
                    shapesContainer={shapesContainer}
                />
            )}
        </div>
    );
};

export default MenuOptions;
