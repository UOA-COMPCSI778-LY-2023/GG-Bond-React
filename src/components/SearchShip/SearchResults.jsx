import React from "react";
import { List } from "antd";
import locationIcon from "./location.png";
import TypeCodeArrow from "./TypeCodeArrow";

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
            <div
                className="music-style-list-item-content"
                style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <TypeCodeArrow typeCode={item.typeCode} />
                <div style={{ flex: 1 }}>
                    <p
                        style={{
                            marginBottom: "0px",
                            textAlign: "left",
                            fontSize: "18px",
                        }}
                    >
                        Name:
                        <span style={{ marginRight: "15px" }}>
                            {item.vesselName}
                        </span>
                        MMSI:{item.mmsi}
                    </p>

                    <p style={{ marginTop: "-5px", textAlign: "left" }}>
                        {item.vesselType} 【{getFlagEmoji(item.alpha2)}】
                    </p>
                </div>
                <img
                    src={locationIcon}
                    alt="localization"
                    className="icon-location"
                    style={{ width: "20px", height: "20px" }}
                />
            </div>
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
