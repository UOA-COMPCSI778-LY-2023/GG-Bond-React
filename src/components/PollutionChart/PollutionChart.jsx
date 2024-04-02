import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { getPollutionData } from "../../utils/api";
import RadarChart from "./RadarChart";
import "./PollutionChart.css";

Chart.register(...registerables);

const ChartComponent = ({ mmsi }) => {
    const combinedChartRef = useRef(null);
    const radarChartRef = useRef(null);
    const [fuelPollution, setFuelPollution] = useState([]);
    const [fuelPollutionAvg, setFuelPollutionAvg] = useState([]);

    const createCombinedLineChart = (fuelPollution, fuelPollutionAvg) => {
        return combinedChartRef.current
            ? new Chart(combinedChartRef.current.getContext("2d"), {
                  type: "line",
                  data: {
                      labels: [
                          "02.00",
                          "04.00",
                          "06.00",
                          "08.00",
                          "10.00",
                          "12.00",
                          "14.00",
                          "16.00",
                          "18.00",
                          "20.00",
                          "22.00",
                          "24.00",
                      ],
                      datasets: [
                          {
                              label: "Current Ship CO2 Pollution",
                              data: fuelPollution,
                              borderColor: "rgba(255, 99, 132, 1)",
                              borderWidth: 1,
                              fill: false,
                          },
                          {
                              label: "Average Ship CO2 Pollution ",
                              data: fuelPollutionAvg,
                              borderColor: "rgba(75, 192, 192, 1)",
                              borderWidth: 1,
                              fill: false,
                          },
                      ],
                  },
                  options: {
                      scales: {
                          y: {
                              title: {
                                  display: true,
                                  text: "CO2 Pollution (kg)", // Replace 'units' with your actual unit of measure
                                  font: {
                                      size: 12,
                                  },
                              },
                          },
                          x: {
                              title: {
                                  display: true,
                                  text: "Time",
                                  font: {
                                      size: 12,
                                  },
                              },
                          },
                      },
                      plugins: {
                          legend: {
                              labels: {
                                  font: {
                                      size: 12,
                                      family: "Arial",
                                      weight: "normal",
                                  },
                              },
                          },
                      },
                  },
              })
            : null;
    };

    // 创建雷达图
    const createRadarChart = () => {
        return radarChartRef.current
            ? new Chart(radarChartRef.current.getContext("2d"), {
                  type: "radar",
                  data: {
                      labels: [
                          "Air Quality",
                          "Water Quality",
                          "Noise",
                          "Waste pollution",
                          "Power Consumption",
                      ],
                      datasets: [
                          {
                              label: "Environmental Impact 1",
                              data: [40, 88, 30, 40, 88],
                              backgroundColor: "rgba(255, 99, 132, 0.2)",
                              borderColor: "rgba(255, 99, 132, 1)",
                              borderWidth: 1,
                          },
                          {
                              label: "Environmental Impact 2",
                              data: [28, 48, 50, 55, 77],
                              backgroundColor: "rgba(54, 162, 235, 0.2)",
                              borderColor: "rgba(54, 162, 235, 1)",
                              borderWidth: 1,
                          },
                      ],
                  },
                  options: {
                      scales: {
                          r: {
                              ticks: {
                                  callback: function (value, index) {
                                      const maxValues = [50, 100, 75, 60, 90];
                                      const maxValue = maxValues[index];
                                      return value <= maxValue ? value : null;
                                  },
                              },
                          },
                      },
                  },
              })
            : null;
    };

    useEffect(() => {
        const fetchPollution = async () => {
            try {
                const response = await getPollutionData(mmsi);

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setFuelPollution(response.data.pollution_fuel);
                setFuelPollutionAvg(response.data.pollution_fuel_avg);
            } catch (error) {
                console.error("Error fetching ship pollution:", error);
            }
        };
        fetchPollution();
    }, [mmsi]);

    useEffect(() => {
        const combinedLineChart = createCombinedLineChart(
            fuelPollution,
            fuelPollutionAvg
        );
        const radarChart = createRadarChart();
        return () => {
            if (combinedLineChart) combinedLineChart.destroy();
            if (radarChart) radarChart.destroy();
        };
    }, [fuelPollution, fuelPollutionAvg]);

    return (
        <div>
            <canvas className="line-chart" ref={combinedChartRef}></canvas>
            <RadarChart mmsi={mmsi}></RadarChart>
        </div>
    );
};

export default ChartComponent;
