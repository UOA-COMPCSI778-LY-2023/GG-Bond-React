import { useState, useEffect } from "react";
import { getShipID, getShipPicture } from "../utils/api";

const useShipImage = (mmsi) => {
    const [shipImage, setShipImage] = useState(null);

    useEffect(() => {
        const fetchShipPicture = async () => {
            try {
                const shipIdResponse = await getShipID(mmsi);
                if (shipIdResponse.status === 200) {
                    const shipId = shipIdResponse.data.vessel_id;
                    if (shipId) {
                        const imageResponse = await getShipPicture(shipId);
                        if (imageResponse.status === 200) {
                            const shipImage = imageResponse.data.ship_image;
                            setShipImage(shipImage || "defaultShip2.jpg");
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching ship picture:", error);
                setShipImage("defaultShip2.jpg");
            }
        };

        fetchShipPicture();
    }, [mmsi]);

    return shipImage;
};

export default useShipImage;
