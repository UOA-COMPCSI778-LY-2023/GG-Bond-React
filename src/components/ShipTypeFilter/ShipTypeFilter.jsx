import React, { useState } from 'react';
import './ShipTypeFilter.css';

const ShipTypeFilter = ({ selectedFilters, handleFilterSelect, shipTypes, countryTypes, selectedCountries, handleCountrySelect }) => {
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

  const handleCountrySelectInternal = (countryCode) => {
    let updatedCountries;
    if (selectedCountries.includes(countryCode)) {
      updatedCountries = selectedCountries.filter(country => country !== countryCode);
    } else {
      updatedCountries = [...selectedCountries, countryCode];
    }
    handleCountrySelect(updatedCountries); // 更新选中的国家类型
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
        {countryTypes.map(country => (
          <label key={country.type} className="country-filter-item">
            <input
              type="checkbox"
              className="country-filter-checkbox"
              checked={selectedCountries.includes(country.type)}
              onChange={() => handleCountrySelect(country.type)} 
            />
            <span className="country-filter-text" style={{ color: country.color }}>
              {country.type}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShipTypeFilter;
