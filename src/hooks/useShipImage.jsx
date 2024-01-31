import { useState, useEffect } from "react";

const useShipImage = (mmsi) => {
    const [shipImage, setShipImage] = useState(null);

    useEffect(() => {
        const shiIdUrl = `http://13.236.117.100:8080/get/shipID?mmsi=${mmsi}`;

        const fetchShipPicture = async () => {
            try {
                const response = await fetch(shiIdUrl, {
                    method: "GET",
                });
                if (response.ok) {
                    const responseData = await response.json();
                    const shipId = responseData.vessel_id;
                    console.log(shipId);
                    if (shipId) {
                        const imageUrl = `http://13.236.117.100:8080/get/shipPicture?ship_id=${shipId}`;
                        const imageResponse = await fetch(imageUrl, {
                            method: "GET",
                        });
                        if (response.ok) {
                            const responseData = await imageResponse.json();
                            const shipImage = responseData.ship_image;
                            console.log(shipImage);
                            if (shipImage) {
                                setShipImage(shipImage);
                            } else {
                                setShipImage("defaultShip2.jpg");
                            }
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
