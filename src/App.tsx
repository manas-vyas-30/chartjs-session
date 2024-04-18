import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import DoughnutChart from "./components/DoughnutChart";
import PieChart from "./components/PieChart";
import CustomChart from "./components/CustomChart";

function App() {
  const chartData = [25, 25, 25, 25];
  const bgColor = ["#5645DA", "#352C7E", "#FF7F7F", "#90EE90"];
  const previewData = [22, 3, 20, 25];
  let centerText = 0;
  previewData.forEach((val) => {
    centerText += val;
  });

  return (
    <>
      <nav>
        <ul style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bar-chart">Bar Chart</Link>
          </li>
          <li>
            <Link to="/line-chart">Line Chart</Link>
          </li>
          <li>
            <Link to="/doughnut-chart">Doughnut Chart</Link>
          </li>
          <li>
            <Link to="/pie-chart">Pie Chart</Link>
          </li>
          <li>
            <Link to="/custom-chart">Custom Chart</Link>
          </li>
        </ul>
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/doughnut-chart" element={<DoughnutChart />} />
          <Route path="/pie-chart" element={<PieChart />} />
          <Route
            path="/custom-chart"
            element={
              <CustomChart
                data={chartData}
                bgColor={bgColor}
                previewData={previewData}
                variant="lg"
                centerText={(Math.round(centerText * 10) / 10).toString()}
                allowHover
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
