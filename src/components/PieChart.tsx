import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["One", "Two", "Three"],
    datasets: [
      {
        data: [3, 6, 9],
        backgroundColor: ["aqua", "bloodorange", "purple"],
      },
    ],
  };
  return (
    <div
      style={{
        width: "30%",
        height: "30%",
        margin: "auto",
      }}
    >
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
