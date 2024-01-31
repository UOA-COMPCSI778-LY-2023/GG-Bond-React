import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const RadarChart = ({mmsi}) => {
    const chartRef = useRef(null);
    let myChart = null;
    const [radarData,setRadarData] = useState(null);


    useEffect(() => {
        const fetchTotalPollution = async () => {
            const url = `http://3.104.55.204:8080/get/total_pollution?mmsi=${mmsi}`;
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const responseData = await response.json();
                    setRadarData(responseData);
                }
            } catch (error) {
                console.error("Error fetching ship pollution:", error);
            }
        };
        fetchTotalPollution();
    }, [mmsi]); 

    useEffect(() => {
        if (chartRef.current && radarData) {
            myChart = echarts.init(chartRef.current);
            const option = {
                // title: {
                //     text: 'Rader'
                // },
                tooltip: {},
                legend: {
                    top: '2%', 
                    textStyle: {
                        fontFamily: 'Arial', 
                        fontSize: 12,
                        fontWeight: 'Normal',
                        color: '#5a5a5a',
                    },
                    icon: 'rect',
                    data: [{
                        name: 'Pollution',
                    }, {
                        name: 'Average Pollution',
                    }],
                },
                radar: {
                    center: ['50%', '58%'], 
                    radius: '70%',          
                    splitArea: {
                        areaStyle: {
                            color: 'transparent' 
                        }
                    },
                    axisLabel: { 
                        color: '#6b6b6b', 
                    },
                    axisLine: {  
                        lineStyle: {
                            color: '#cfcfcf', 
                        }
                    },
                    splitLine: { 
                        lineStyle: {
                            color: '#e8e8e8', 
                        }
                    },
                    indicator: [
                        { name: 'Speed (knot)'},
                        { name: 'Length (meter)'},
                        { name: 'Width (meter)'},
                        { name: 'CO2 (kg)'},
                        { name: 'Fuel Consumption (kg)'}
                    ],
                    name: {
                        textStyle: {
                            color: '#6e6e6e', 
                            fontSize: 11,
                            fontFamily:'Helvetica'   
                        }
                    }
                },
                series: [{
                    name: 'Pollution',
                    type: 'radar',
                    lineStyle: {
                        normal: {
                            color: 'rgba(75, 192, 192, 1)', 
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(75, 192, 192, 0.2)'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(75, 192, 192, 0.2)', // 数据点的颜色，这里设置为红色
                            borderColor: 'rgba(75, 192, 192, 1)', // 数据点的边框颜色，这里设置为黑色
                            borderWidth: 1, // 数据点的边框宽度
                            borderType: 'solid' // 数据点的边框类型
                        }
                    },
                    data : [
                        {
                            value : [
                                radarData.sog, 
                                radarData.length, 
                                radarData.width, 
                                radarData.total_co2, 
                                radarData.total_fuel],
                            name : 'Pollution'
                        }
                    ]
                }, {
                    name: 'Average Pollution',
                    type: 'radar',
                    lineStyle: {
                        normal: {
                            color: 'rgba(255, 99, 132, 1)', 
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(255, 99, 132, 0.2)' 
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 99, 132, 0.2)', // 数据点的颜色，这里设置为红色
                            borderColor: 'rgba(255, 99, 132, 1)', // 数据点的边框颜色，这里设置为黑色
                            borderWidth: 1, // 数据点的边框宽度
                            borderType: 'solid' // 数据点的边框类型
                        }
                    },
                    data : [
                        {
                            value : [
                                radarData.sog_avg, 
                                radarData.length_avg, 
                                radarData.width_avg, 
                                radarData.total_co2_avg, 
                                radarData.total_fuel_avg],
                            name : 'Average Pollution'
                        }
                    ]
                }]
            };
            myChart.setOption(option);
        }

        return () => {
            if (myChart != null) {
                myChart.dispose();
            }
        };
    }, [radarData]);

    return <div ref={chartRef} style={{ height: 300, marginTop:20 }}></div>;
};

export default RadarChart;