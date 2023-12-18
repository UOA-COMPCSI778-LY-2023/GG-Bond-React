// ChartComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);

    useEffect(() => {
        if (chartRef1.current && chartRef2.current) {
            const ctx1 = chartRef1.current.getContext('2d');
            const ctx2 = chartRef2.current.getContext('2d');

            const newChartInstance1 = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Pollution Levels',
                        data: [8, 12, 6, 10, 7, 9, 11],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {}
            });

            const newChartInstance2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Other Pollution Levels',
                        data: [10, 11, 9, 8, 12, 10, 9],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {}
            });

            return () => {
                newChartInstance1.destroy();
                newChartInstance2.destroy();
            };
        }
    }, []);

    return (
        <div>
            <canvas ref={chartRef1} width="400" height="400"></canvas>
            <canvas ref={chartRef2} width="400" height="400"></canvas>
        </div>
    );
}

export default ChartComponent;
