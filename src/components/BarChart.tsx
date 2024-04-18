import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "John",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Jane",
        data: [3, 3, 3],
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Distance in KM",
        },
      },
    },
  };
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        margin: "auto",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
