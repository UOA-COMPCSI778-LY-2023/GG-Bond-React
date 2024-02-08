import React from 'react';
import { FiNavigation2 } from "react-icons/fi";
const VtSelect = ({ onVtSelect }) => {
    const shipTypes = [
        { vt: 1, name: "Cargo", color: "rgba(144, 238, 144)" },
        { vt: 2, name: "Fishing", color: "rgba(222, 184, 135)" },
        { vt: 3, name: "Tank", color: "rgba(255, 0, 0)" },
        { vt: 4, name: "Pleasure craft", color: "rgba(230, 161, 223)" },
        { vt: 5, name: "Tug & Towing", color: "rgba(173, 216, 230)" },
        { vt: 6, name: "Sailing", color: "rgba(255, 255, 0)" },
        { vt: 7, name: "Passenger", color: "rgba(245, 99, 66)" },
        { vt: 8, name: "Law Enforcement", color: "rgba(119, 136, 153)" },
        { vt: 9, name: "Military", color: "rgba(0, 0, 139)" },
        { vt: 10, name: "Dredging", color: "rgba(165, 42, 42)" },
        { vt: 11, name: "Other", color: "rgba(169, 169, 169)" },
    ];

    const containerStyle = {
        position: 'absolute',
        top: '52px',
        right: '60px',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 600,
        maxWidth: '300px'
    };

    const labelStyle = {
        display: 'block',
        margin: '10px 0',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        fontFamily: '"Helvetica", "Arial", sans-serif', // 更换字体
        fontSize: '14px', // 增大字体大小
        fontWeight: 'bold', // 字体加粗
        color: 'black',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // 添加文本阴影
        transition: 'background-color 0.3s, box-shadow 0.3s'
    };

    const hoverStyle = {
        backgroundColor: '#e8e8e8',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={containerStyle}>
            {shipTypes.map(({ vt, name, color }) => (
                <label
                    key={vt}
                    style={labelStyle}
                    onMouseEnter={e => {
                        e.target.style.backgroundColor = hoverStyle.backgroundColor;
                        e.target.style.boxShadow = hoverStyle.boxShadow;
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundColor = '#fff';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    <input
                        type="checkbox"
                        onChange={() => onVtSelect(vt)}
                        style={{ marginRight: '5px' }}
                    />
                    <FiNavigation2
                        style={{
                            stroke: "rgba(0, 0, 0, 0.5)", // 更淡的黑色边框
                            strokeWidth: '0.5', // 较薄的边框
                            fill: color,
                            marginRight: '8px',
                            verticalAlign: 'middle',
                            fontSize: '20px'
                        }}
                    />
                    {name}
                </label>
            ))}
        </div>
    );
};

export default VtSelect;
