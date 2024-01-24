import React from 'react';
import './MarineTrafficStyle.css';
import locationIcon from './location.png'

function getFlagEmoji(countryCode) {
  const codePoints = countryCode.toUpperCase().split('').map(char => 
      127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function SearchResults({ results, onSelectShip }) {
    return (
        <div className="search-results-container">
            {results.map((result, index) => (
                <div key={index} className="dropdown-item" onClick={() => onSelectShip(result)}>
                    <p><strong>MMSI:</strong> {result.mmsi}</p>
                    <p><strong>Name:</strong> {result.vesselName}</p>
                    <p><strong>Country:</strong> {getFlagEmoji(result.alpha2)} {result.flagCountry}</p>
                    <p><strong>Type:</strong> {result.vesselType}</p>
                    <img src={locationIcon} alt="localization" className="icon-location" /> 
                    {/* 可以根据需要添加更多信息 */}
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
