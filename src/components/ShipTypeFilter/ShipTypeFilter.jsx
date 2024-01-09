import React, { useState } from 'react';
import './ShipTypeFilter.css';
import useGetShipsType from '../../hooks/useGetShipsType'; // Import the correct hook

const ShipTypeFilter = ({ handleFilterSelect, shipTypes, countryTypes, selectedCountries, handleCountrySelect }) => {
  const [isShipTypeOpen, setIsShipTypeOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedShipTypes, setSelectedShipTypes] = useState([]); // State to track selected ship types
  const [selectedCountryTypes, setSelectedCountryTypes] = useState(selectedCountries); // State to track selected country types

  const shipsData = useGetShipsType(selectedShipTypes); // Use the hook to fetch data

  const toggleShipTypeDropdown = () => {
    setIsShipTypeOpen(!isShipTypeOpen);
    if (isCountryOpen) setIsCountryOpen(false);
  };

  const toggleCountryDropdown = () => {
    setIsCountryOpen(!isCountryOpen);
    if (isShipTypeOpen) setIsShipTypeOpen(false);
  };

  const handleShipTypeSelect = (type) => {
    const updatedShipTypes = selectedShipTypes.includes(type)
      ? selectedShipTypes.filter(t => t !== type)
      : [...selectedShipTypes, type];
    setSelectedShipTypes(updatedShipTypes);
    handleFilterSelect(updatedShipTypes); // Call parent handler if needed
  };

  const handleCountryTypeSelect = (type) => {
    const updatedCountryTypes = selectedCountryTypes.includes(type)
      ? selectedCountryTypes.filter(t => t !== type)
      : [...selectedCountryTypes, type];
    setSelectedCountryTypes(updatedCountryTypes);
    handleCountrySelect(updatedCountryTypes); // Call parent handler if needed
  };

  return (
    <div className="filter-dropdown">
      {/* Ship Type Dropdown */}
      <div className="filter-parent" onClick={toggleShipTypeDropdown}>
        Ship Types
        <span className="triangle">&#9660;</span>
      </div>
      <div className={`ship-type-filter-dropdown ${isShipTypeOpen ? 'show' : ''}`}>
        {shipTypes.map(ship => (
          <label key={ship.type} className="ship-type-filter-item">
            <input
              type="checkbox"
              className="ship-type-filter-checkbox"
              checked={selectedShipTypes.includes(ship.type)}
              onChange={() => handleShipTypeSelect(ship.type)}
            />
            <span className="ship-type-filter-text" style={{ color: ship.color }}>
              {ship.type}
            </span>
          </label>
        ))}
      </div>

      {/* Country Dropdown */}
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
              checked={selectedCountryTypes.includes(country.type)}
              onChange={() => handleCountryTypeSelect(country.type)} 
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
