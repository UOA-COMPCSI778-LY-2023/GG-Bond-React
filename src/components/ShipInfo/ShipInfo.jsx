import React from 'react';
import { Avatar, Card, Space, Button } from 'antd';

const { Meta } = Card;

const ShipInfo = ({ ship, toggleTrack }) => {
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
                    <Button type="primary" onClick={toggleTrack} style={{ width: 95, textAlign: 'center' }}>Past Track</Button>
                    <Button type="primary" style={{ width: 135,marginLeft: 20, textAlign: 'center'  }}>Pollution Forcast</Button>
                </div>
                

            </Card>
            </Space>
    );
}

export default ShipInfo;