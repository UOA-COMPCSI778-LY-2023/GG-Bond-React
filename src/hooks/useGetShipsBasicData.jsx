import { useEffect } from "react";
import axios from "axios";

const useGetShipBasicData = (latLngNE, latLngSW, setShipsBasicData) => {
    useEffect(() => {
        const fetchData = async () => {
            const type = "0";
            const source = 0;
            const limit = 500;
            console.log(latLngNE, latLngSW);
            const url = `http://13.236.117.100:8888/rest/v1/ship/list/${
                latLngSW.lng + 0.2
            }/${latLngSW.lat + 0.2}/${latLngNE.lng + 0.2}/${
                latLngNE.lat + 0.2
            }/${type}/${source}/${limit}`;

            try {
                const response = await axios.get(url);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setShipsBasicData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching ship details:", error.message);
            }
        };

        fetchData();
    }, [latLngNE, latLngSW, setShipsBasicData]);
};

export default useGetShipBasicData;
