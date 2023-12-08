import React, { useRef, useState } from 'react';
import { Avatar, Card, Space, Button } from 'antd';
import PollutionChart from '../PollutionChart/PollutionChart';

const { Meta } = Card;

const ShipInfo = ({ ship }) => {

    //Show Chart
    const [showChart, setShowChart] = useState(false);
    const handleShowChart = () => {
        setShowChart(true);
    };
    const handleCancel = () => {
        setShowChart(false);
    };

    return (
        <>
            <Space direction="vertical" size={16}>
                <Card style={{ width: 300 }}>
                    <Meta
                        avatar={<Avatar src={ship.image} />}
                        title={ship.name}
                        description={ship.type}
                    />
                    <img alt="ship image" src={ship.image} style={{ width: 250, marginTop: 10 }} />
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" style={{ width: 95, textAlign: 'center' }}>Past Track</Button>
                        <Button type="primary" style={{ width: 135, marginLeft: 20, textAlign: 'center' }} onClick={handleShowChart}>Pollution Forecast</Button>
                    </div>
                </Card>
                <PollutionChart showChart={showChart} handleCancel={handleCancel} mmsi={ship.mmsi} />
            </Space>
            
        </>
    );
}

export default ShipInfo;
