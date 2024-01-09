import { useState, useEffect } from 'react';

const useGetShipsType = (selectedTypes, ll_lon, ll_lat, ur_lon, ur_lat, source, limit) => {
    const [shipsData, setShipsData] = useState([]);

    useEffect(() => {
        const fetchShipData = async () => {
            // Constructing the API URL with required parameters
            const typeQueryParam = selectedTypes.join(',');
            const url = `/rest/v1/ship/list/${ll_lon}/${ll_lat}/${ur_lon}/${ur_lat}/${typeQueryParam}/${source}/${limit}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setShipsData(data); // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching ship data:", error);
                setShipsData([]); // Reset the data in case of an error
            }
        };

        // Fetch data if ship types are selected
        if (selectedTypes.length > 0) {
            fetchShipData();
        } else {
            setShipsData([]); // Clear data if no ship types are selected
        }
    }, [selectedTypes, ll_lon, ll_lat, ur_lon, ur_lat, source, limit]);

    return shipsData;
};

export default useGetShipsType;
