const VtSelect = ({ onVtSelect }) => {
    const vtValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // 定义一些基本样式
    const containerStyle = {
        position: 'absolute',
        top: '10px', // 根据需要调整位置
        left: '10px', // 根据需要调整位置
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f7f7f7',
        zIndex: 1000, // 确保在地图之上
        maxWidth: '300px'
    };

    const labelStyle = {
        display: 'inline-block',
        margin: '5px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
        backgroundColor: '#fff'
    };

    return (
        <div style={containerStyle}>
            {vtValues.map(vt => (
                <label key={vt} style={labelStyle}>
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