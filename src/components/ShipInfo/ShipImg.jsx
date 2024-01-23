import { useState } from "react";

const ShipImg=()=>{
    const [loading,setloading] =useState();
    return(
        <>
            {loading ? <Spin size="large" />:<img
                alt="ship image"
                src={shipImage}
                style={{ width: "100%", marginTop: 2 }}
            />}
        </>
    )
}
export default ShipImg;