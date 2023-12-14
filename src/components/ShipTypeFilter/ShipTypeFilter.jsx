import React from 'react';
import './ShipTypeFilter.css';

const ShipTypeFilter = ({ selectedFilters, handleFilterSelect, shipTypes }) => {
  return (
    <div className="ship-type-filter-dropdown">
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
  );
};

export default ShipTypeFilter;
