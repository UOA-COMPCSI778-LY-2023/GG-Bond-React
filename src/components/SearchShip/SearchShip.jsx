import React, { useState } from "react";
import { getShipsBySearch } from "../../utils/api";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

function SearchShip({ setSelectedBoat, map }) {
    const [searchResults, setSearchResults] = useState([]);

    const fetchShipsBySearch = async (searchTerm) => {
        try {
            const response = await getShipsBySearch(searchTerm);
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
            <SearchBox onSearch={fetchShipsBySearch} />
            <SearchResults
                results={searchResults}
                onSelectShip={onSelectShip}
            />
        </div>
    );
}

export default SearchShip;
