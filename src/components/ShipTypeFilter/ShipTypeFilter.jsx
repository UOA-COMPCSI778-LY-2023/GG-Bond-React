import React, { useState } from 'react';
import { FiNavigation2 } from "react-icons/fi";
import './ShipTypeFilter.css';

const ShipTypeFilter = ({ selectedFilters, handleFilterSelect, countryTypes, selectedCountries, handleCountrySelect }) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const shipTypes = [
    { vt: 1, name: "Cargo", color: "rgba(144, 238, 144)" },
    { vt: 2, name: "Fishing", color: "rgba(222, 184, 135)" },
    { vt: 3, name: "Tank", color: "rgba(255, 0, 0)" },
    { vt: 4, name: "Pleasure craft", color: "rgba(230, 161, 223)" },
    { vt: 5, name: "Tug & Towing", color: "rgba(173, 216, 230)" },
    { vt: 6, name: "Sailing", color: "rgba(255, 255, 0)" },
    { vt: 7, name: "Passenger", color: "rgba(245, 99, 66)" },
    { vt: 8, name: "Law Enforcement", color: "rgba(119, 136, 153)" },
    { vt: 9, name: "Military", color: "rgba(0, 0, 139)" },
    { vt: 10, name: "Dredging", color: "rgba(165, 42, 42)" },
    { vt: 11, name: "Other", color: "rgba(169, 169, 169)" }
  ];

  const toggleCountryDropdown = () => {
    setIsCountryOpen(!isCountryOpen);
  };

  const handleCountrySelectInternal = (countryCode) => {
    let updatedCountries;
    if (selectedCountries.includes(countryCode)) {
      updatedCountries = selectedCountries.filter(country => country !== countryCode);
    } else {
      updatedCountries = [...selectedCountries, countryCode];
    }
    handleCountrySelect(updatedCountries);
  };

  return (
    <div className="filter-dropdown">
      <div className="filter-parent">
        ShipTypes
        <span className="triangle">&#9660;</span>
      </div>

      {Object.entries(shipTypes).map(([type, { name, color }]) => (
        <label key={type} className="ship-type-filter-item">
          <input
            type="checkbox"
            className="ship-type-filter-checkbox"
            checked={selectedFilters.includes(type)}
            onChange={() => handleFilterSelect(type)}
          />
          <FiNavigation2 style={{ color: color, marginRight: '8px' }} />
          <span className="ship-type-filter-text" style={{ color: color }}>
            {name}
          </span>
        </label>
      ))}

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
              onChange={() => handleCountrySelectInternal(country.type)}
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
