import React, { useState, useEffect } from "react";
import { Card, Space, Button, Spin, ConfigProvider, Progress } from "antd";
import { SwapRightOutlined, CloseOutlined } from "@ant-design/icons";
import DraggableModal from "../DraggableModal/DraggableModal";
import TrackPopup from "../TrackPopup/TrackPopup";
import "./shipInfo.css";
import ShipInfoBody from "./ShipInfoBody";
import CountryFlag from "react-country-flag";
import Draggable from "react-draggable";
import useShipData from "../../hooks/useShipData";
import L from "leaflet";

const ShipInfo = ({ ship, setSelectedBoat }) => {
    const mmsi = ship.mm;
    const shipData = useShipData(mmsi);
    const closeShipInfo = () => {
        setSelectedBoat(null);
    };
    //  get ship type picture
    const getTypePath = (vesselType) => {
        vesselType = vesselType === "Pleasure Craft" ? "Pleasure" : vesselType;
        if (
            [
                "Cargo",
                "Craft",
                "Fishing",
                "Navigation_Aids",
                "Passenger",
                "Pleasure",
                "Tanker",
                "Tug",
            ].includes(vesselType)
        ) {
            return `ShipIcons/${vesselType}.png`;
        } else {
            return "ShipIcons/Unspecified.png";
        }
    };
    const typePath = getTypePath(shipData.vesselType);

    // get ship country picture
    const getCountry = (shipCountryCode) => {
        if (["NAN", "nan"].includes(shipCountryCode)) {
            return null;
        } else {
            return shipCountryCode;
        }
    };
    const country = getCountry(shipData.alpha2);
    // get ship country picture
    // let loading = true;
    // const shipImage = useShipImage(mmsi);  // getimage
    // loading = false
    const [shipImage, setShipImage] = useState("defaultShip2.jpg");

    const [loading, setLoading] = useState(false);

    const fetchImage = async () => {
        setLoading(true);
        const shiIdUrl = `http://13.236.117.100:8080/get/shipID?mmsi=${mmsi}`;
        try {
            const response = await fetch(shiIdUrl, {
                method: "GET",
            });
            if (response.ok) {
                const responseData = await response.json();
                const shipId = responseData.vessel_id;
                console.log(shipId);
                if (shipId) {
                    const imageUrl = `http://13.236.117.100:8080/get/shipPicture?ship_id=${shipId}`;
                    // Check if the image URL returns a 404 status
                    const imageResponse = await fetch(imageUrl, {
                        method: "GET",
                    });
                    if (response.ok) {
                        const responseData = await imageResponse.json();
                        const shipImage = responseData.ship_image;
                        console.log(shipImage);
                        if (shipImage) {
                            setShipImage(shipImage);
                        } else {
                            setShipImage("defaultShip2.jpg");
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching ship picture:", error);
            setShipImage("defaultShip2.jpg"); // Set default image in case of any error
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchImage();
    }, [mmsi]);

    ///2222

    //Show Chart
    const [showChart, setShowChart] = useState(false);
    const [showTrackPopup, setShowTrackPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const handleShowChart = () => {
        setShowChart(true);
    };

    const handleCancel = () => {
        setShowChart(false);
    };

    // show track
    const handleTrackButtonClick = () => {
        setShowTrackPopup(!showTrackPopup);
        setIsAnimating(false); // Ensure animation doesn't start automatically
    };

    useEffect(() => {
        const el = document.getElementById("ship-dragble-card");
        L.DomEvent.on(el, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    useEffect(() => {
        const el = document.getElementById("ship-info-body");
        L.DomEvent.on(el, "mousedown", L.DomEvent.stopPropagation);
    }, []);

    return (
        <>
            <Draggable
                onDrag={(e) => e.stopPropagation()}
                defaultPosition={{ x: 50, y: 8 }}
            >
                <div className="card-space" id="ship-dragble-card">
                    <Space
                        direction="vertical"
                        size={16}
                        style={{ cursor: "auto" }}
                    >
                        <Card
                            className="info-card"
                            bodyStyle={{ padding: "10px" }}
                        >
                            <div>
                                <div className="ship-info-header">
                                    <img
                                        className="ship-type-image"
                                        alt="shiptype"
                                        src={typePath}
                                    ></img>
                                    {country !== null ? (
                                        <CountryFlag
                                            className="country-flag"
                                            countryCode={country}
                                            svg
                                            style={{
                                                width: "2.2em",
                                                height: "2.2em",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            className="country-flag-img"
                                            src="defaultCountryImage.png"
                                            alt="defaul-country"
                                        />
                                    )}
                                    <div className="name-with-type">
                                        <div className="ship-name">
                                            {shipData.vesselName}
                                        </div>
                                        <div className="ship-type">
                                            {shipData.vesselType}
                                        </div>
                                    </div>
                                    <div
                                        className="pollution-level"
                                        style={{
                                            position: "absolute",
                                            top: 14,
                                            right: 35,
                                        }}
                                    >
                                        <Progress
                                            type="circle"
                                            percent={(shipData.lv / 30) * 100}
                                            size={[28]}
                                            strokeColor={{
                                                "0%": "#93CB96",
                                                "50%": "#F6ED9F",
                                                "100%": "#F44336",
                                            }}
                                            format={() =>
                                                `${Math.ceil(shipData.lv)}`
                                            }
                                        />
                                    </div>
                                    <div className="close-icon">
                                        <CloseOutlined
                                            onClick={closeShipInfo}
                                        />
                                    </div>
                                </div>
                                {loading ? (
                                    <ConfigProvider
                                        theme={{
                                            token: { colorPrimary: "black" },
                                        }}
                                    >
                                        <div className="spin-box">
                                            <Spin size="large" />
                                        </div>
                                    </ConfigProvider>
                                ) : (
                                    <img
                                        alt="ship image"
                                        src={shipImage}
                                        style={{ width: "100%", marginTop: 2 }}
                                    />
                                )}
                                <div
                                    className="ship-info-body"
                                    id="ship-info-body"
                                >
                                    <ShipInfoBody
                                        shipData={shipData}
                                    ></ShipInfoBody>
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <Button
                                        className="past-track-button"
                                        type="primary"
                                        onClick={handleTrackButtonClick}
                                        icon={<SwapRightOutlined />}
                                    >
                                        Past Track
                                    </Button>
                                    <Button
                                        className="pollution-button"
                                        type="primary"
                                        onClick={handleShowChart}
                                    >
                                        Pollution Forecast
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        {showTrackPopup && (
                            <TrackPopup
                                visible={showTrackPopup}
                                onClose={() => {
                                    setShowTrackPopup(false);
                                    setIsAnimating(false);
                                }}
                                isAnimating={isAnimating}
                                setIsAnimating={setIsAnimating}
                            />
                        )}
                    </Space>
                </div>
            </Draggable>
            <DraggableModal visible={showChart} onCancel={handleCancel} />
        </>
    );
};

export default ShipInfo;
