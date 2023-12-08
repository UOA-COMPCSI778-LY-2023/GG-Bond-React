import React, { useState } from 'react'; // Import useState from React
import { Avatar, Card, Space, Button } from 'antd';
import PollutionChart from '../PollutionChart/PollutionChart';

const { Meta } = Card;

const ShipInfo = ({ ship, toggleTrack }) => {
    // State for controlling the visibility of the pollution chart
    const [showChart, setShowChart] = useState(false);
    const handleShowChart = () => {
        setShowChart(true);
    };
    const handleCancel = () => {
        setShowChart(false);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card style={{ width: 300 }}>
                <Meta
                    avatar={<Avatar src={ship.image} />}
                    title={ship.name}
                    description={ship.type}
                />
                <img alt="ship image" src={ship.image} style={{ width: 250, marginTop: 10 }} />
                <div style={{ marginTop: 10 }}>
                    {/* Button to toggle track visibility */}
                    <Button type="primary" onClick={toggleTrack} style={{ width: 95, textAlign: 'center' }}>Past Track</Button>
                    {/* Button to show pollution forecast chart */}
                    <Button type="primary" onClick={handleShowChart} style={{ width: 135, marginLeft: 20, textAlign: 'center' }}>Pollution Forecast</Button>
                </div>
            </Card>
            {/* PollutionChart component, shown based on the showChart state */}
            {showChart && <PollutionChart showChart={showChart} handleCancel={handleCancel} mmsi={ship.mmsi} />}
        </Space>
    );
};

export default ShipInfo;
