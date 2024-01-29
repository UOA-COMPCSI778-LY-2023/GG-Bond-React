const VtSelect = ({ onVtSelect }) => {
    const vtValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const containerStyle = {
        position: 'absolute',
        top: '10%',
        left: '0%',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        maxWidth: '300px'
    };
    
    const labelStyle = {
        display: 'block',
        margin: '10px 0',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        fontFamily: '"Arial", sans-serif',
        fontSize: '14px',
        color: '#333',
        transition: 'background-color 0.3s, box-shadow 0.3s'
    };
    
    const hoverStyle = {
        backgroundColor: '#e8e8e8',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // 轻微的阴影效果
    };
    
    return (
        <div style={containerStyle}>
            {vtValues.map(vt => (
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
                    VT: {vt}
                </label>
            ))}
        </div>
    );
    
    
};

export default VtSelect;
