import React from 'react';
import { List } from 'antd';
import locationIcon from './location.png';

function getFlagEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split('').map(char =>
        127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function SearchResults({ results, onSelectShip }) {
    // 当结果为空时，不渲染内容
    if (!results || results.length === 0) {
        return null;
    }

    const renderItem = (item) => (
        <List.Item onClick={() => onSelectShip(item)} className="music-style-list-item">
            <div className="music-style-list-item-content">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p><strong>MMSI:</strong> {item.mmsi}</p>
                    <p><strong>Name:</strong> {item.vesselName}</p>
                    <p><strong>Country:</strong> {getFlagEmoji(item.alpha2)} {item.flagCountry}</p>
                    <p><strong>Type:</strong> {item.vesselType}</p>
                    <img src={locationIcon} alt="localization" className="icon-location" />
                </div>
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
