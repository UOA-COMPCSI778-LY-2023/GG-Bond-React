import { useState, useEffect } from "react";

const useShipData = (mmsi) => {
    const [shipData, setShipData] = useState({ mmsi: mmsi });

    useEffect(() => {
        const fetchShipDetail = async () => {
            const url = `http://13.236.117.100:8888/rest/v1/ship/${mmsi}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                const shipData = responseData.data;
                setShipData(shipData);
            } catch (error) {
                console.error("Error fetching ship details:", error);
            }
        };

        fetchShipDetail();
    }, [mmsi]);

    return shipData;
};

export default useShipData;
