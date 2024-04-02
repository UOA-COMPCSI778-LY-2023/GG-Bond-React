import React, { useState, useEffect } from "react";
import L from "leaflet";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import EsriLeafletGeoSearch from "react-esri-leaflet/plugins/EsriLeafletGeoSearch";
import DownloadShipsInfo from "../DownloadShipsInfo/DownloadShipsInfo";
import DrawTools from "../DrawTools/DrawTools";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "./MenuOptions.css";
import VtSelect from "../VtSelect/VtSelect";
import UserTour from "../UserTour/UserTour";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FloatButton } from "antd";
import {
    ToolOutlined,
    DownloadOutlined,
    SearchOutlined,
    FilterOutlined,
    createFromIconfontCN,
    EnvironmentOutlined,
    QuestionCircleOutlined,
    BarChartOutlined,
} from "@ant-design/icons";

const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
});

const MenuOptions = ({ tourOpen, setTourOpen, handleVtSelect }) => {
    const [showFilterDropdown, setShowFilterDropdown] = useState(true);
    const [showDrawTools, setShowDrawTools] = useState(true);
    const [showSearchLocation, setShowSearchLocation] = useState(true);
    const [showDownloadPanel, setShowDownloadPanel] = useState(false);
    const [shapesContainer, setShapeContainer] = useState({
        polygon: {},
        circle: {},
    });
    const navigate = useNavigate();

    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
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

    const toggleDashboard = () => {
        navigate("/dashboard");
    };

    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

    const toggleLogOut = () => {
        removeCookie("loggedIn");
    };
    

    useEffect(() => {
        const el = document.getElementById("menuoptions");
        L.DomEvent.on(el, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    return (
        <div id="menuoptions">
            {/* style={menuOptionsStyle} */}
            <FloatButton.Group
                className="functionpanel"
                shape="square"
                trigger="hover"
                icon={<ToolOutlined />}
                open={tourOpen ? true : undefined}
            >
                <FloatButton
                    onClick={toggleDrawTools}
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
                    // onClick={(e) => console.log("name:" + e.target.tagName)}
                    tooltip={<div>Search</div>}
                    className="menubtn"
                />
                <FloatButton
                    onClick={toggleFilterDropdown}
                    icon={<FilterOutlined />}
                    tooltip={<div>Filter</div>}
                    className="menubtn filterBtn"
                />

                <FloatButton
                    onClick={toggleDashboard}
                    tooltip={<div>Dashboard</div>}
                    icon={<BarChartOutlined />}
                    className="menubtn dashboardBtn"
                />

                <FloatButton
                    onClick={toggleDownloadPanel}
                    tooltip={<div>Download</div>}
                    icon={<DownloadOutlined />}
                    className="menubtn downloadBtn"
                />

                <FloatButton
                    onClick={() => setTourOpen(true)}
                    tooltip={<div>Tour</div>}
                    icon={<QuestionCircleOutlined />}
                    className="menubtn tourBtn"
                />

                <FloatButton
                    onClick={toggleLogOut}
                    tooltip={<div>Log Out</div>}
                    icon={<IconFont type="icon-tuichu" />}
                    className="menubtn logoutBtn"
                />
            </FloatButton.Group>

            {showFilterDropdown && <VtSelect onVtSelect={handleVtSelect} />}
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
                    collapseAfterResult={false}
                    id="geo-search"
                />
            )}
            {showDownloadPanel && (
                <DownloadShipsInfo
                    setShowDownloadPanel={setShowDownloadPanel}
                    shapesContainer={shapesContainer}
                />
            )}
            <UserTour
                setTourOpen={setTourOpen}
                tourOpen={tourOpen}
                setShowDrawTools={setShowDrawTools}
                setShowSearchLocation={setShowSearchLocation}
            />
        </div>
    );
};

export default React.memo(MenuOptions);
