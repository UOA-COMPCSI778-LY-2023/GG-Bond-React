// ChartComponent.jsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const newChartInstance = new Chart(ctx, {
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

            return () => {
                newChartInstance.destroy();
            };
        }
    }, []);

    return <canvas ref={chartRef} width="400" height="400"></canvas>;
}

export default ChartComponent;
