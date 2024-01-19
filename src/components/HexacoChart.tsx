import {
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import React from "react";
import { Radar } from "react-chartjs-2";
import chroma from "chroma-js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  Legend,
  LineElement,
  Filler,
  Tooltip
);

type HexacoChartArgs = {
  baseColor?: string;
  datasetName: string;
  h: number;
  e: number;
  x: number;
  a: number;
  c: number;
  o: number;
  i: number;
};

const chartSkeletonColor = "#00000060";

const HexacoChart: React.FC<HexacoChartArgs> = ({
  baseColor,
  datasetName,
  h,
  e,
  x,
  a,
  c,
  o,
  i,
}) => {
  const color = baseColor ?? chroma.random().hex();

  const data: ChartData<"radar", number[], string> = {
    labels: ["H", "E", "X", "A", "C", "O", "I"],
    datasets: [
      {
        label: datasetName,
        data: [h, e, x, a, c, o, i],
        fill: true,
        backgroundColor: chroma(color).darken(1).alpha(0.2).hex(),
        borderColor: color,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: color,
      },
    ],
  };

  const options: ChartOptions<"radar"> = {
    scales: {
      r: {
        grid: {
          circular: true,
          color: chartSkeletonColor,
          lineWidth: 3,
        },
        angleLines: {
          color: chartSkeletonColor,
          lineWidth: 3,
        },
        min: 0,
        pointLabels: {
          font: {
            size: 40,
          },
        },
        ticks: {
          z: 10,
          backdropColor: "#fff",
          backdropPadding: 5,
          count: 3,
          color: chartSkeletonColor,
          font: {
            size: 24,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="card">
      <Radar data={data} options={options} />
    </div>
  );
};

export default HexacoChart;
