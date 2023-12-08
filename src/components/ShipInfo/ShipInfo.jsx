import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Card, Space, Button, Modal } from 'antd';
import { Chart, registerables } from 'chart.js'; // 导入 Chart.js

Chart.register(...registerables);

const { Meta } = Card;

const ShipInfo = ({ ship }) => {
    const [showChart, setShowChart] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (showChart && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Pollution Levels',
                        data: [12, 19, 3, 5, 2, 3, 9],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {}
            });

            return () => {
                newChartInstance.destroy();
            };
        }
    }, [showChart]);

    const handleShowChart = () => {
        setShowChart(!showChart);
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
                <Modal
                    title="Pollution Forecast"
                    visible={showChart}
                    onCancel={handleCancel}
                    footer={null}
                    style={{ top: 20, left: 20, position: 'absolute' }}
                >
                    <canvas ref={chartRef} width="400" height="400"></canvas>
                </Modal>
            </Space>
        </>
    );
}

export default ShipInfo;
