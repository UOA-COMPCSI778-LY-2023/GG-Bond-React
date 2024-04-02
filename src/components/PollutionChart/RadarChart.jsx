import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { getTotalPollution } from "../../utils/api";

const RadarChart = ({ mmsi }) => {
    const chartRef = useRef(null);
    let myChart = null;
    const [radarData, setRadarData] = useState(null);

    useEffect(() => {
        const fetchTotalPollution = async () => {
            try {
                const response = await getTotalPollution(mmsi);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setRadarData(response.data);
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
                tooltip: {},
                legend: {
                    top: "2%",
                    textStyle: {
                        fontFamily: "Arial",
                        fontSize: 12,
                        fontWeight: "Normal",
                        color: "#5a5a5a",
                    },
                    icon: "rect",
                    data: [
                        {
                            name: "Current Ship Parameters",
                        },
                        {
                            name: "Average Ship Parameters",
                        },
                    ],
                },
                radar: {
                    center: ["50%", "58%"],
                    radius: "70%",
                    splitArea: {
                        areaStyle: {
                            color: "transparent",
                        },
                    },
                    axisLabel: {
                        color: "#6b6b6b",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#cfcfcf",
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#e8e8e8",
                        },
                    },
                    indicator: [
                        { name: "Speed (knot)" },
                        { name: "Length (meter)" },
                        { name: "Width (meter)" },
                        { name: "CO2 (kg)" },
                        { name: "Fuel Consumption (kg)" },
                    ],
                    name: {
                        textStyle: {
                            color: "#6e6e6e",
                            fontSize: 11,
                            fontFamily: "Helvetica",
                        },
                    },
                },
                series: [
                    {
                        name: "Current Ship Parameters",
                        type: "radar",
                        lineStyle: {
                            normal: {
                                color: "rgba(255, 99, 132, 1)",
                                width: 1,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: "rgba(255, 99, 132, 0.2)",
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(255, 99, 132, 0.2)",
                                borderColor: "rgba(255, 99, 132, 1)",
                                borderWidth: 1,
                                borderType: "solid",
                            },
                        },
                        data: [
                            {
                                value: [
                                    radarData.sog,
                                    radarData.length,
                                    radarData.width,
                                    radarData.total_co2,
                                    radarData.total_fuel,
                                ],
                                name: "Current Ship Parameters",
                            },
                        ],
                    },
                    {
                        name: "Average Ship Parameters",
                        type: "radar",
                        lineStyle: {
                            normal: {
                                color: "rgba(75, 192, 192, 1)",
                                width: 1,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: "rgba(75, 192, 192, 0.2)",
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(75, 192, 192, 0.2)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                                borderType: "solid",
                            },
                        },
                        data: [
                            {
                                value: [
                                    radarData.sog_avg,
                                    radarData.length_avg,
                                    radarData.width_avg,
                                    radarData.total_co2_avg,
                                    radarData.total_fuel_avg,
                                ],
                                name: "Average Ship Parameters",
                            },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
        }

        return () => {
            if (myChart != null) {
                myChart.dispose();
            }
        };
    }, [radarData]);

    return <div ref={chartRef} style={{ height: 300, marginTop: 20 }}></div>;
};

export default RadarChart;
