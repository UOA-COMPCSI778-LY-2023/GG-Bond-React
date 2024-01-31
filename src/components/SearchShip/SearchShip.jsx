import React, { useState } from "react";
import axios from "axios";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

function SearchShip({ setSelectedBoat, map }) {
    const [searchResults, setSearchResults] = useState([]);

    const getShipsBySearch = async (searchTerm) => {
        try {
            const response = await axios.get(
                `http://13.236.117.100:8888/rest/v1/ship/search/${searchTerm}/20`
            );
            if (response.status === 200 && response.data.isok === true) {
                const shipData = response.data.data;
                setSearchResults(shipData);
            } else {
                setSearchResults([]);
            }
        } catch (err) {
            setSearchResults([]);
        }
    };

    const onSelectShip = (ship) => {
        /*
        {
            "mmsi": "229541000",
            "vesselName": "VALIANT",
            "vesselType": "Cargo",
            "flagCountry": "Malta",
            "alpha2": "MT",
            "typeCode": 1
        }
        null
        */
        const { mmsi: mm, ...rest } = ship;
        const newShip = { mm, ...rest };
        console.log(newShip);
        setSelectedBoat(newShip);
        map.setView([newShip.latitude, newShip.longitude], 13); //Maxinum Zoom level: 13
    };

    return (
        <div className="search-ship">
            <SearchBox onSearch={getShipsBySearch} />
            <SearchResults
                results={searchResults}
                onSelectShip={onSelectShip}
            />
        </div>
    );
}

export default SearchShip;
