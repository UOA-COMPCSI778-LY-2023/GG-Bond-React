import React, { useState, useCallback } from "react";
import "./MapController.css";

const MapController = () => {
    return (
        <div id="mapcontroller">
            <div className="chartOption">
                <button>
                    <span>Utilization</span>
                </button>
                <button>
                    <span>Navigation</span>
                </button>
                <button>
                    <span>Navigation analysis</span>
                </button>
                <button>
                    <span>Statistical analysis</span>
                </button>
                <button>
                    <span>Flexibility</span>
                </button>
            </div>
        </div>
    );
};

export default MapController;
