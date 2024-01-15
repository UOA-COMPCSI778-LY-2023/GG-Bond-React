import React, { useState } from "react";
import L from "leaflet";
import { Card, Space, Button, DatePicker, Checkbox, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./DownloadShipsInfo.css";

dayjs.extend(customParseFormat);

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
const shipOptions = shipTypes.map((ship) => ship.type);
const defaultCheckedList = [];

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};
const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
};

const disabledRangeTime = (_, type) => {
    if (type === "start") {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
};

const DownloadShipsInfo = ({ setShowDownloadPanel }) => {
    const [checkedList, setCheckedList] = useState([defaultCheckedList]);
    const checkAll = shipOptions.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < shipOptions.length;
    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? shipOptions : []);
    };
    const handleCloseDownloadPanel = () => {
        setShowDownloadPanel(false);
    };

    React.useEffect(() => {
        const cardDiv = document.getElementById("downloadcard");
        L.DomEvent.on(cardDiv, "dblclick", L.DomEvent.stopPropagation);
    }, []);

    return (
        <>
            <Draggable
                onDrag={(e) => e.stopPropagation()}
                defaultPosition={{ x: 0, y: 140 }}
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
                                <div className="timescale-box">
                                    <h4>Time Scale</h4>
                                    <DatePicker.RangePicker
                                        disabledDate={disabledDate}
                                        disabledTime={disabledRangeTime}
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [
                                                dayjs("00:00:00", "HH:mm:ss"),
                                                dayjs("11:59:59", "HH:mm:ss"),
                                            ],
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        changeOnBlur={false}
                                    />
                                </div>
                                <div className="download-ship-type">
                                    <div>
                                        <h4>Ship Type</h4>
                                        <Checkbox
                                            indeterminate={indeterminate}
                                            onChange={onCheckAllChange}
                                            checked={checkAll}
                                        >
                                            <h5>Check all</h5>
                                        </Checkbox>
                                    </div>

                                    <div>
                                        <Checkbox.Group
                                            options={shipOptions}
                                            value={checkedList}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="close-icon"
                                    onClick={handleCloseDownloadPanel}
                                >
                                    <CloseOutlined />
                                </div>
                            </div>
                            <div style={{ marginTop: 4 }}>
                                <Button type="primary" block>
                                    Download
                                </Button>
                            </div>
                        </Card>
                    </Space>
                </div>
            </Draggable>
        </>
    );
};

export default DownloadShipsInfo;
