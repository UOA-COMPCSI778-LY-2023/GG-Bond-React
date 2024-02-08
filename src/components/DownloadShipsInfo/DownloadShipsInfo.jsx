import React, { useState } from "react";
import L from "leaflet";
import { getDownloadFile } from "../../utils/api";
import { Card, Space, Button, Divider, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import ShipTypeCheckboxes from "../ShipTypeCheckboxes/ShipTypeCheckboxes";
// import DownloadTimePicker from "../DownloadTimePicker/DownloadTimePicker";
import "./DownloadShipsInfo.css";

const DownloadShipsInfo = ({ setShowDownloadPanel, shapesContainer }) => {
    const [checkedList, setCheckedList] = useState([]);
    // const [selectedTimeRange, setSelectedTimeRange] = useState([]);

    function checkedListToString() {
        if (checkedList.length === 11) {
            return "0";
        }
        return checkedList.join(",");
    }

    function convertCirclesToString() {
        let circles = shapesContainer.circle;
        if (!circles || Object.keys(circles).length === 0) {
            return "none";
        }

        const circleStrings = Object.entries(circles).map(
            ([_, [radius, { lat, lng }]]) => `${lng},${lat},${radius}`
        );

        return circleStrings.join("|");
    }

    function convertPolygonsToString() {
        let polygons = shapesContainer.polygon;
        if (!polygons || Object.keys(polygons).length === 0) {
            return "none";
        }

        const polygonStrings = Object.values(polygons).map((polygon) =>
            polygon
                .map((points) =>
                    points.map((point) => `${point.lng},${point.lat}`).join("_")
                )
                .join("|")
        );
        return polygonStrings.join("|");
    }

    React.useEffect(() => {
        const cardDiv = document.getElementById("downloadcard");
        L.DomEvent.on(cardDiv, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    const handleCloseDownloadPanel = () => {
        setShowDownloadPanel(false);
    };

    const handleDownload = async () => {
        let typeStr = checkedListToString();
        let polygonStr = convertPolygonsToString();
        let circleStr = convertCirclesToString();
        try {
            const response = await getDownloadFile(
                "0", // selectedTimeRange[0],
                "0", // selectedTimeRange[1],
                typeStr,
                circleStr,
                polygonStr
            );

            if (!response) {
                if (typeStr === "") {
                    message.error(`Must choose at least one ship type!`);
                } else if (polygonStr === "none" && circleStr === "none") {
                    message.error(
                        `Use the drawing tool (polygon or circle) to select at least one area.`
                    );
                }
            } else {
                message.success("Download started!");
            }
        } catch (error) {
            console.error("Error fetching ship details:", error.message);
        }
    };

    return (
        <>
            <Draggable
                onDrag={(e) => e.stopPropagation()}
                defaultPosition={{ x: 50, y: 20 }}
            >
                <div className="downloadcard" id="downloadcard">
                    <Space
                        direction="vertical"
                        size={16}
                        style={{ cursor: "auto" }}
                    >
                        <Card
                            className="downloadinfo-card"
                            bodyStyle={{ padding: "10px" }}
                        >
                            <div className="download-info-body">
                                <div>
                                    <h2>Download</h2>
                                </div>

                                <Divider />
                                {/* <DownloadTimePicker
                                    setSelectedTimeRange={setSelectedTimeRange}
                                /> */}
                                <ShipTypeCheckboxes
                                    setCheckedList={setCheckedList}
                                    checkedList={checkedList}
                                />
                            </div>
                            <div style={{ marginTop: 4 }}>
                                <Button
                                    type="primary"
                                    block
                                    onClick={handleDownload}
                                >
                                    Download
                                </Button>
                            </div>
                            <div
                                className="close-icon"
                                onClick={handleCloseDownloadPanel}
                            >
                                <CloseOutlined />
                            </div>
                        </Card>
                    </Space>
                </div>
            </Draggable>
        </>
    );
};

export default DownloadShipsInfo;
