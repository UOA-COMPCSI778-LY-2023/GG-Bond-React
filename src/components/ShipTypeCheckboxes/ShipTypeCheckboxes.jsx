import React, { useState } from "react";
import { Checkbox, Col, Row } from "antd";
import "./ShipTypeCheckboxes.css";

const shipTypes = [
    // { type: 'ALL', color: 'Black' },
    { type: "Tank", color: "Red" },
    { type: "Cargo", color: "LightGreen" },
    { type: "Fishing", color: "YellowBrown" },
    { type: "Tug", color: "Blue" },
    { type: "Sailboat", color: "Navy" },
    { type: "Cruise", color: "Purple" },
    { type: "Container", color: "Orange" },
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

const ShipTypeCheckboxes = ({ checkedList, setCheckedList }) => {
    const checkAll = shipOptions.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < shipOptions.length;
    const onChange = (list) => {
        setCheckedList(list);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? shipOptions : []);
    };

    const checkboxCols = shipOptions.map((option, index) => (
        <Col key={index} span={6}>
            <Checkbox value={option}>{option}</Checkbox>
        </Col>
    ));

    return (
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
                    style={{ width: "100%" }}
                    value={checkedList}
                    onChange={onChange}
                >
                    <Row gutter={16}>{checkboxCols}</Row>
                </Checkbox.Group>
            </div>
        </div>
    );
};

export default ShipTypeCheckboxes;
