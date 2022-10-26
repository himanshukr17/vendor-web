import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Graph = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [50, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default Graph;

// ./components/PieChart.js
// import React from "react";
// import Chart from "chart.js/auto";
// import { Pie } from "react-chartjs-2";
// const labels = ["January", "February", "March", "April", "May", "June"];
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(0,0,255)",
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };
// const PieChart = () => {
//   return (
//     <div>
//       <Pie data={data} />
//     </div>
//   );
// };
// export default PieChart;

// import React from "react";
// import Chart from "chart.js/auto";
// import { Line } from "react-chartjs-2";

// const labels = ["January", "February", "March", "April", "May", "June"];

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(255, 99, 132)",
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };

// const LineChart = () => {
//   return (
//     <div>
//       <Line data={data} />
//     </div>
//   );
// };

// export default LineChart;
