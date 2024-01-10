import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import { IoIosColorFilter } from "react-icons/io";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import Tooltip from "../Tooltip/Tooltip";
import DrawTools from "../DrawTools/DrawTools";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "./MenuOptions.css";
import ShipTypeFilter from '../ShipTypeFilter/ShipTypeFilter';


const shipTypes = [
    // { type: 'ALL', color: 'Black' },
    { type: 'Tank', color: 'Red' },
    { type: 'Cargo', color: 'LightGreen' },
    { type: 'Fishing', color: 'YellowBrown' },
    { type: 'Tug', color: 'Blue' },
    { type: 'Sailboat', color: 'Navy' },
    { type: 'Cruise', color: 'Purple' },
    { type: 'Container', color: 'Orange' },
    { type: 'Bulk Carrier', color: 'Maroon' },
    { type: 'Naval', color: 'Gray' },
    { type: 'Patrol', color: 'Olive' },
    { type: 'Research', color: 'Lime' },
    { type: 'Yacht', color: 'Teal' },
    { type: 'Oil Tanker', color: 'Black' },
    { type: 'Ferry', color: 'RoyalBlue' },
    { type: 'Submarine', color: 'Aqua' },
    // Add additional ship types as necessary
];

const countryTypes = [
    // { type: 'ALL', color: 'Black' },
    { type: 'CN', color: 'Red' },
    { type: 'NZ', color: 'LightGreen' },
    { type: 'USA', color: 'YellowBrown' },


    // Add additional ship types as necessary
];


const MenuOptions = () => {

    const [dark, setDark] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [showDrawTools, setShowDrawTools] = useState(false);
    const [showSearchLocation, setShowSearchLocation] = useState(false);

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
        setSelectedCountries(prevCountries => {
            if (prevCountries.includes(countryType)) {
                return prevCountries.filter(country => country !== countryType);
            } else {
                return [...prevCountries, countryType];
            }
        });
    };

    const toggleDrawTools = () => {
        setShowDrawTools(!showDrawTools);
    };

    const toggleSearchLocation = () => {
        setShowSearchLocation(!showSearchLocation);
    };


    const menuOptionsStyle = {
        background: isActive ? "white" : "#1c2330", // Change background color based on isActive
    };

    const buttonStyle = {
        color: isActive ? "#1c2330" : "#fff", // Change button color based on isActive
    };


    return (
        <div id="menuoptions" style={menuOptionsStyle}>
            <button className="menubutton" style={buttonStyle}>
                <span onClick={toggleDarkOrLightMode}>
                    {dark ? <FaLightbulb /> : <FaRegLightbulb />}
                </span>
                {/* <div>Toggle Dark Mode</div> */}
            </button>
            <button style={buttonStyle} onClick={toggleDrawTools}>
                <span>
                    <Tooltip text="Draft">
                        <LiaDrawPolygonSolid />
                    </Tooltip>
                </span>
            </button>{" "}
            {/*Draft */}
            <button style={buttonStyle} onClick={toggleSearchLocation}>
                <span>
                    <Tooltip text="Localization">
                        <CiLocationArrow1 />
                    </Tooltip>
                </span>
            </button>{" "}
            {/*Localization*/}
            <button style={buttonStyle}>
                <span>
                    <Tooltip text="Search">
                        <IoIosSearch />
                    </Tooltip>
                </span>
            </button>{" "}
            {/*Search*/}

            {/* filter */}
            <button style={buttonStyle} onClick={toggleFilterDropdown}>
                <span><Tooltip text="Filter"><IoIosColorFilter /></Tooltip></span>
            </button>

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

            {showDrawTools && <DrawTools onChange={(geojsonData) => console.log(geojsonData)} />}
            {showSearchLocation && <EsriLeafletGeoSearch
                position="bottomright"
                useMapBounds={false}
                providers={{
                    arcgisOnlineProvider: {
                        token: "AAPK4f354998bf5a4659b9d666b2069641897bTjGcAqQx-CfCSZNh9ToN7ANpoJDprU4gf08kNagIOaR_eSX7gjFQaqM9EzJmu-",
                        label: "ArcGIS Online Results",
                        maxResults: 10
                    }
                }}
                expanded={true}
            />}
        </div>
    );
            }

export default MenuOptions;
