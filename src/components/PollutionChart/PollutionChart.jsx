import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PollutionChart = ({ showChart, handleCancel, mmsi }) => {
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

    return (
        <Modal
            title="Pollution Forecast"
            open={showChart}
            onCancel={handleCancel}
            footer={null}
            style={{ top: 20, left: 20, position: 'absolute' }}
        >
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </Modal>
    );
}

export default PollutionChart;
