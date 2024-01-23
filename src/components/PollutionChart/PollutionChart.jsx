import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
    const combinedChartRef = useRef(null);
    const radarChartRef = useRef(null);

    useEffect(() => {
        // 创建折线图
        const createCombinedLineChart = () => {
            return combinedChartRef.current ? new Chart(combinedChartRef.current.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['02.00', '06.00', '10.00', '14.00', '18.00', '22.00'],
                    datasets: [{
                        label: 'co2 pollution',
                        data: [8, 12, 6, 10, 7, 9],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }, {
                        label: 'fuel consumption',
                        data: [10, 11, 9, 8, 12, 10],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        y: {
                            min: 6,
                            max: 12
                        }
                    }
                }
            }) : null;
        };

        // 创建雷达图
        const createRadarChart = () => {
            return radarChartRef.current ? new Chart(radarChartRef.current.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: ['Air Quality', 'Water Quality', 'Noise', 'Waste pollution', 'Power Consumption'],
                    datasets: [{
                        label: 'Environmental Impact 1',
                        data: [65, 59, 90, 81, 56],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Environmental Impact 2',
                        data: [28, 48, 40, 19, 96],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                display: false
                            },
                            suggestedMin: 20, // 设置雷达图的最小范围
                            suggestedMax: 100, // 设置雷达图的最大范围
                            beginAtZero: true // 使得雷达图的范围从0开始
                        }
                    }
                }
            }) : null;
        };
        
        const combinedLineChart = createCombinedLineChart();
        const radarChart = createRadarChart();

        return () => {
            if (combinedLineChart) combinedLineChart.destroy();
            if (radarChart) radarChart.destroy();
        };
    }, []);

    return (
        <div>
            <canvas ref={combinedChartRef} width="400" height="150"></canvas>
            <canvas ref={radarChartRef} width="400" height="300"></canvas>
        </div>
    );
};

export default ChartComponent;
