function TypeCodeArrow({ typeCode }) {
    const colorMap = {
        3: "rgba(255, 0, 0)", // Tank
        1: "rgba(144, 238, 144)", // Cargo
        2: "rgba(222, 184, 135)", // Fishing
        6: "rgba(255, 255, 0)", // Sailing
        4: "rgba(230, 161, 223)", // Pleasure craft
        5: "rgba(173, 216, 230)", // Tug & Towing
        7: "rgba(245, 99, 66)", // Passenger
        8: "rgba(119, 136, 153)", // Law Enforcement
        9: "rgba(0, 0, 139)", // Military
        10: "rgba(165, 42, 42)", // Dredging
        11: "rgba(169, 169, 169)", // Other
    };

    const color = colorMap[typeCode] || "grey";

    return (
        <div
            style={{
                alignSelf: "center",
                color: color,
                marginRight: "10px",
                marginLeft: "-px",
                fontSize: "18px",
            }}
        >
            ➤
        </div>
    );
}

export default TypeCodeArrow;
