import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  plugins
);

const LineChart = () => {
  const johnData = [];
  const janeData = [];
  let prev = 100;
  let prev2 = 80;
  for (let i = 0; i < 1000; i++) {
    prev += 5 - Math.random() * 10;
    johnData.push({ x: i, y: prev });
    prev2 += 5 - Math.random() * 10;
    janeData.push({ x: i, y: prev2 });
  }

  const labels = [];

  for (let i = 1; i <= 1000; i++) {
    labels.push(i.toString());
  }

  const data = {
    labels,
    datasets: [
      {
        label: "John",
        data: johnData,
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: "Jane",
        data: janeData,
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options = {
    // scales: {
    //   y: {
    //     min: 0,
    //     max: 12,
    //   },
    // },
  };
  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        margin: "auto",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
