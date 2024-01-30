import React, { useState } from "react";
import axios from "axios"; // 引入axios进行API调用
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

function SearchShip({ setSelectedBoat }) {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");

    const getShipsBySearch = async (searchTerm) => {
        try {
            const response = await axios.get(
                `http://13.236.117.100:8888/rest/v1/ship/search/${searchTerm}/20`
            );
            if (response.status === 200 && response.data.isok === true) {
                // start storing response data
                const shipData = response.data.data;
                setSearchResults(shipData);
            } else {
                setSearchResults([]);
            }
            setError("");
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data");
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
        setSelectedBoat(newShip);
    };

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <SearchBox onSearch={getShipsBySearch} />
            <SearchResults
                results={searchResults}
                onSelectShip={onSelectShip}
            />
        </div>
    );
}

export default SearchShip;
