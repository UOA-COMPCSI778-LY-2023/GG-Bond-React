import React from "react";
import { List, Col, Row } from "antd";
import TypeCodeArrow from "./TypeCodeArrow";
import CountryFlag from "react-country-flag";

// 添加用于生成国旗表情符号的函数
function getFlagEmoji(countryCode) {
    if (countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map((char) => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }
    return null;
}

function SearchResults({ results, onSelectShip }) {
    if (!results || results.length === 0) {
        return null;
    }

    const renderItem = (item, index) => (
        <List.Item
            onClick={() => onSelectShip(item)}
            className="music-style-list-item"
            style={{ marginBottom: "0px" }}
        >
            <Row gutter={24} justify="space-around" align="middle">
                <Col span={1}>
                    <TypeCodeArrow typeCode={item.typeCode} />
                </Col>
                <Col span={8}>
                    <p>Name: {item.vesselName}</p>
                </Col>
                <Col span={8}>
                    <p> MMSI:{item.mmsi}</p>
                </Col>
                <Col span={4}>
                    <p>{item.vesselType}</p>
                </Col>
                <Col span={2}>
                    {item.alpha2 !== null ? (
                        <CountryFlag
                            className="country-flag"
                            countryCode={item.alpha2}
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
                </Col>
            </Row>
        </List.Item>
    );

    return (
        <div className="search-results-container">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={results}
                renderItem={renderItem}
            />
        </div>
    );
}

export default SearchResults;
