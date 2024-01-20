import React, { useState } from "react";
import L from "leaflet";
import axios from "axios";
import { saveAs } from "file-saver";
import { Card, Space, Button, Divider, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import ShipTypeCheckboxes from "../ShipTypeCheckboxes/ShipTypeCheckboxes";
import DownloadTimePicker from "../DownloadTimePicker/DownloadTimePicker";
import "./DownloadShipsInfo.css";

const DownloadShipsInfo = ({ setShowDownloadPanel, shapesContainer }) => {
    const [checkedList, setCheckedList] = useState([]);
    const [selectedTimeRange, setSelectedTimeRange] = useState([]);

    React.useEffect(() => {
        const cardDiv = document.getElementById("downloadcard");
        L.DomEvent.on(cardDiv, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    const handleCloseDownloadPanel = () => {
        setShowDownloadPanel(false);
    };

    const handleDownload = async () => {
        const mmsi = 512006414;
        const url = `http://13.236.117.100:8888/rest/v1/ship/${mmsi}`;

        try {
            const response = await axios.get(url);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonBlob = new Blob([JSON.stringify(response.data.data)], {
                type: "application/json",
            });

            saveAs(jsonBlob, "ship_data.json");

            console.log(response.data.data);
            console.log(checkedList);
            console.log(shapesContainer);
            console.log("Selected Time Range:", selectedTimeRange);

            message.success("Download started!");
        } catch (error) {
            message.error("Download failed!");
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
                                <DownloadTimePicker
                                    setSelectedTimeRange={setSelectedTimeRange}
                                />
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
