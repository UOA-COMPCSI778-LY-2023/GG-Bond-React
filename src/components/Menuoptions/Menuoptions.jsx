import React, { useState, useCallback } from 'react';
import "./Menuoptions.css";
import { IoIosSearch } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { LiaDrawPolygonSolid } from "react-icons/lia";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";

const Menuoptions = () => {

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
        <button><span><LiaDrawPolygonSolid /></span></button> {/*Draft */}
        <button><span><CiLocationArrow1 /></span></button> {/*Localization*/}
        <button><span><IoIosSearch /></span></button>  {/*Search*/}

    </div>
  );
};

export default Menuoptions;