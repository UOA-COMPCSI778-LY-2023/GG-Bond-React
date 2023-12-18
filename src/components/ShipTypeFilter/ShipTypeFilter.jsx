import React, { useState } from 'react';
import './ShipTypeFilter.css';

const ShipTypeFilter = ({ selectedFilters, handleFilterSelect, shipTypes }) => {
  const [isShipTypeOpen, setIsShipTypeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const toggleShipTypeDropdown = () => {
    setIsShipTypeOpen(!isShipTypeOpen);
    if (isCountryOpen) setIsCountryOpen(false);
  };

  const toggleCountryDropdown = () => {
    setIsCountryOpen(!isCountryOpen);
    if (isShipTypeOpen) setIsShipTypeOpen(false);
  };

  const handleCountrySelect = (countryCode) => {
    let updatedFilters;
    if (selectedFilters.includes(countryCode)) {
      // 如果已经选中，移除该国家
      updatedFilters = selectedFilters.filter(filter => filter !== countryCode);
    } else {
      // 如果未选中，添加该国家
      updatedFilters = [...selectedFilters, countryCode];
    }
    handleFilterSelect(updatedFilters); // 更新选中的筛选器
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-parent" onClick={toggleShipTypeDropdown}>
        ShipTypes
        <span className="triangle">&#9660;</span>
      </div>

      <div className={`ship-type-filter-dropdown ${isShipTypeOpen ? 'show' : ''}`}>
        {shipTypes.map(ship => (
          <label key={ship.type} className="ship-type-filter-item">
            <input
              type="checkbox"
              className="ship-type-filter-checkbox"
              checked={selectedFilters.includes(ship.type)}
              onChange={() => handleFilterSelect(ship.type)}
            />
            <span className="ship-type-filter-text" style={{ color: ship.color }}>
              {ship.type}
            </span>
          </label>
        ))}
      </div>

      <div className="filter-parent" onClick={toggleCountryDropdown}>
        Countries
        <span className="triangle">&#9660;</span>
      </div>

      <div className={`country-filter-dropdown ${isCountryOpen ? 'show' : ''}`}>
        {['CN', 'NZ', 'USA'].map(country => (
          <label key={country} className="country-filter-item">
            <input
              type="checkbox"
              className="country-filter-checkbox"
              checked={selectedFilters.includes(country)}
              onChange={() => handleCountrySelect(country)}
            />
            <span className="country-filter-text">{country}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShipTypeFilter;
