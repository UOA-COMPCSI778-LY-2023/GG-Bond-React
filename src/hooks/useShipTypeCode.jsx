import { useState, useEffect } from "react";

const useShipTypeCode = (type) => {
    const [ShipTypeCode, setShipTypeCode] = useState({ type: type });

    useEffect(() => {
        const fetchShipDetail = async () => {
            const url = `/rest/v1/ship/list/{ll_lon}/{ll_lat}/{ur_lon}/{ur_lat}/{type}/{source}/{limit}`;

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

    return ShipTypeCode;
};

export default useShipTypeCode;
