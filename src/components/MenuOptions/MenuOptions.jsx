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
  const toggleDarkOrLightMode = () => {
    setDark(!dark);
    setIsActive(!isActive);
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
        <button style={buttonStyle}><span><Tooltip text = "Filter"><IoIosColorFilter /></Tooltip></span></button>  {/*Search*/}

    </div>
  );
};

export default MenuOptions;