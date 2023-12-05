import React, { useState, useCallback } from 'react';
import "./MenuOptions.css";
import { IoIosSearch } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import Tooltip from '../Tooltip/Tooltip';

const MenuOptions = () => {

  const [dark, setDark] = useState(false);
  const toggleDarkOrLightMode = () => {
    setDark(!dark);
  };

  return (
    <div id="menuoptions">
        <button className='menubutton'>
        <span onClick={toggleDarkOrLightMode}>{dark ? <FaLightbulb /> : <FaRegLightbulb /> }</span>
          {/* <div>Toggle Dark Mode</div> */}
        </button>
        <button><span><Tooltip text = "Draft"><LiaDrawPolygonSolid /></Tooltip></span></button> {/*Draft */}
        <button><span><Tooltip text = "Localization"><CiLocationArrow1 /></Tooltip></span></button> {/*Localization*/}
        <button><span><Tooltip text = "Search"><IoIosSearch /></Tooltip></span></button>  {/*Search*/}

    </div>
  );
};

export default MenuOptions;
