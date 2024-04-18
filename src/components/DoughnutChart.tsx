import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Yes", "No"],
    datasets: [
      {
        label: "Poll",
        data: [3, 6],
        backgroundColor: ["Red", "Black"],
        borderColor: ["Red", "Black"],
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
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
