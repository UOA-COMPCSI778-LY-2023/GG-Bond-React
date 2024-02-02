import { useState, useEffect } from "react";
import { getShipDetail } from "../utils/api";

const useShipData = (mmsi) => {
    const [shipData, setShipData] = useState({ mmsi: mmsi });

    useEffect(() => {
        const fetchShipDetail = async () => {
            try {
                const response = await getShipDetail(mmsi);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const shipData = response.data.data;
                console.log(shipData);
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
