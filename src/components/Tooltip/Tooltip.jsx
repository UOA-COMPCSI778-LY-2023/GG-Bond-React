import React, { useState } from "react";
import "./Tooltip.css"; // Import your Tooltip CSS

const Tooltip = ({ children, text }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {children}
            {showTooltip && <div className="tooltip-box">{text}</div>}
        </div>
    );
};

export default Tooltip;
