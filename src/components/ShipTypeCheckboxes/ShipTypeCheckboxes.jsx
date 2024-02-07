import React from "react";
import { Checkbox, Col, Row } from "antd";
import "./ShipTypeCheckboxes.css";

const shipTypes = [
    { type: "Cargo", index: 1 },
    { type: "Fishing", index: 2 },
    { type: "Tank", index: 3 },
    { type: "Pleasure Craft", index: 4 },
    { type: "Tug & Towing", index: 5 },
    { type: "Sailing", index: 6 },
    { type: "Passenger", index: 7 },
    { type: "Law Enforcement", index: 8 },
    { type: "Military", index: 9 },
    { type: "Dredging", index: 10 },
    { type: "Other", index: 11 },
];

const shipOptions = shipTypes.map((ship) => ship.type);

const ShipTypeCheckboxes = ({ checkedList, setCheckedList }) => {
    const checkAll = shipTypes.length === checkedList.length;
    const indeterminate =
        checkedList.length > 0 && checkedList.length < shipTypes.length;

    const onChange = (list) => {
        setCheckedList(list);
    };

    const onCheckAllChange = (e) => {
        setCheckedList(
            e.target.checked ? shipTypes.map((_, index) => index + 1) : []
        );
    };

    const checkboxCols = shipOptions.map((option, index) => (
        <Col key={index} span={6}>
            <Checkbox value={index + 1}>{option}</Checkbox>
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
