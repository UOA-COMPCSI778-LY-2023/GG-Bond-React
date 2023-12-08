import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Card, Space, Button, Modal } from 'antd';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const { Meta } = Card;

const ShipInfo = ({ ship }) => {
    const [showChart, setShowChart] = useState(false);
    const [chartData, setChartData] = useState({}); // 使用状态来存储图表数据
    const chartRef = useRef(null);

    useEffect(() => {
        if (showChart && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: chartData, // 使用状态中的数据
                options: {}
            });

            return () => {
                newChartInstance.destroy();
            };
        }
    }, [showChart, chartData]); // 在数据或显示状态改变时重新渲染图表

    const handleShowChart = () => {
        // 根据船只的不同数据更新图表
        // 这里可以根据船只的具体数据来更新图表
        const newData = [8, 12, 6, 10, 7, 9, 11]; // 这是示例数据，你可以用实际的船只数据替换它
        const newChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Pollution Levels',
                data: newData, // 使用船只的数据
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        };
        setChartData(newChartData);
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

