import { useState, useEffect } from 'react';


const useShipImage = (mmsi) => {
    const [shipImage, setShipImage] = useState('defaultShip2.jpg');
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
                    console.log(shipId)
                    if (shipId) {
                        const imageUrl = `http://13.236.117.100:8080/get/shipPicture?ship_id=${shipId}`;
                        // Check if the image URL returns a 404 status
                        const imageResponse = await fetch(imageUrl, {
                            method: "GET",
                        });
                        if (response.ok) {
                            const responseData = await imageResponse.json();
                            const shipImage = responseData.ship_image;
                            console.log(shipImage)
                            if (shipImage){
                                setShipImage(shipImage);
                            }
                        }
                    } 
                }
            }catch (error) {
                console.error('Error fetching ship picture:', error);
                setShipImage('defaultShip2.jpg'); // Set default image in case of any error
            }
        };
    
        fetchShipPicture();
    }, [mmsi]);
    return shipImage;
}

export default useShipImage;
