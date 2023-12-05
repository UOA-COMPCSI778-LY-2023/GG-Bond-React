import React, { useState, useCallback } from 'react';
import "./MenuOptions.css";
import { IoIosSearch } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import { IoIosColorFilter } from "react-icons/io";
import Tooltip from '../Tooltip/Tooltip';

const MenuOptions = () => {

  const [dark, setDark] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([])

  const toggleDarkOrLightMode = () => {
    setDark(!dark);
    setIsActive(!isActive);
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterSelect = (filterType) => {
    setSelectedFilters(prevFilters => {
      // Add or remove filter from the array
      if (prevFilters.includes(filterType)) {
        return prevFilters.filter(f => f !== filterType);
      } else {
        return [...prevFilters, filterType];
      }
    });
  };

  const menuOptionsStyle = {
    background: isActive ? 'white' : '#1c2330', // Change background color based on isActive
  };

  const buttonStyle = {
    color: isActive ? '#1c2330' : '#fff', // Change button color based on isActive
  };
  return (
    <div id="menuoptions" style={menuOptionsStyle}>
        <button className='menubutton' style={buttonStyle}> 
        <span onClick={toggleDarkOrLightMode}>{dark ? <FaLightbulb /> : <FaRegLightbulb /> }</span>
          {/* <div>Toggle Dark Mode</div> */}
        </button>
        <button style={buttonStyle}><span><Tooltip text = "Draft"><LiaDrawPolygonSolid /></Tooltip></span></button> {/*Draft */}
        <button style={buttonStyle}><span><Tooltip text = "Localization"><CiLocationArrow1 /></Tooltip></span></button> {/*Localization*/}
        <button style={buttonStyle}><span><Tooltip text = "Search"><IoIosSearch /></Tooltip></span></button>  {/*Search*/}

        <button style={buttonStyle} onClick={toggleFilterDropdown}>
        <span><Tooltip text="Filter"><IoIosColorFilter /></Tooltip></span>
      </button>
      {showFilterDropdown && (
        <div className="filter-dropdown">
          <div onClick={() => handleFilterSelect('cargo')}>Cargo</div>
          <div onClick={() => handleFilterSelect('tanker')}>Tanker</div>
          <div onClick={() => handleFilterSelect('passenger')}>Passenger</div>
          {/* Add more ship types as needed */}
        </div>
      )}
        

    </div>
  );
};

export default MenuOptions;