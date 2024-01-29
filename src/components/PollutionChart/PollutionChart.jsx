import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './PollutionChart.css'
import RadarChart from './RadarChart';

Chart.register(...registerables);

const ChartComponent = ({mmsi}) => {
    const combinedChartRef = useRef(null);
    const radarChartRef = useRef(null);
    const [fuelPollution, setFuelPollution]=useState([])
    const [fuelPollutionAvg, setFuelPollutionAvg]=useState([])

        
    // 创建折线图
    const createCombinedLineChart = (fuelPollution, fuelPollutionAvg) => {
        return combinedChartRef.current ? new Chart(combinedChartRef.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: [
                    '02.00', '04.00', '06.00', '08.00', '10.00','12.00', 
                    '14.00', '16.00', '18.00', '20.00', '22.00','24.00'],
                datasets: [{
                    label: 'CO2 pollution',
                    data: fuelPollution,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }, {
                    label: 'Averge CO2 Consumption ',
                    data: fuelPollutionAvg,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        // min: 0,
                        // max: 100
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 12, 
                                family: 'Arial',
                                weight:'normal'
                            }
                        }
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
                    data: [40, 88, 30, 40, 88],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Environmental Impact 2',
                    data: [28, 48, 50, 55, 77],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        // angleLines: {
                        //     display: false
                        // },
                        // suggestedMin: 20, // 设置雷达图的最小范围
                        // suggestedMax: 100, // 设置雷达图的最大范围
                        // beginAtZero: true, // 使得雷达图的范围从0开始
                        ticks: {
                            callback: function(value, index) {
                                // 这里可以根据index（轴的索引）来自定义每个轴的刻度显示
                                // 示例：为每个轴设置不同的最大值
                                const maxValues = [50, 100, 75, 60, 90];
                                const maxValue = maxValues[index];
                                return value <= maxValue ? value : null;
                            }
                        },
                    }
                }
            }
        }) : null;
    };


    useEffect(() => {
        const fetchPollution = async () => {
            const url = `http://127.0.0.1:8080/get/pollution?mmsi=${mmsi}`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const responseData = await response.json();
                    setFuelPollution(responseData.pollution_fuel);
                    setFuelPollutionAvg(responseData.pollution_fuel_avg);
                }
            } catch (error) {
                console.error("Error fetching ship pollution:", error);
            }
        };
        fetchPollution();
    }, [mmsi]); 

    useEffect(() => {
        // fetchPollution(mmsi);
        // console.log(fuelPollution);

        const combinedLineChart = createCombinedLineChart(fuelPollution, fuelPollutionAvg);
        const radarChart = createRadarChart();
        return () => {
            if (combinedLineChart) combinedLineChart.destroy();
            if (radarChart) radarChart.destroy();
        };
    }, [fuelPollution,fuelPollutionAvg]);

    return (
        <div>
            <canvas className="line-chart" ref={combinedChartRef} ></canvas>
            {/* <canvas ref={radarChartRef} style={{marginTop:20}}></canvas> */}
            <RadarChart mmsi={mmsi}></RadarChart>
        </div>
    );
};

export default ChartComponent;
