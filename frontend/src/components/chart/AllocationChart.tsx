import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const predefinedColors = [
  "hsl(30, 70%, 60%)", // Orange
  "hsl(60, 70%, 60%)", // Yellow
  "hsl(90, 70%, 60%)", // Green
  "hsl(120, 70%, 60%)", // Teal
  "hsl(150, 70%, 60%)", // Blue
];
// const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
// const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

function AllocationChart(props) {
  if (props.allocations) {
    Chart.register(ArcElement, Tooltip, Legend)
    let data = {
        labels: props.allocations.map(stock => stock.stockName),
        datasets: [
            {
                label: 'Portfolio Allocation (%)',
                data: props.allocations.map(stock => stock.percentage),
                borderWidth: 1,
                // backgroundColor: props.allocations.map(_ => randomRGB()),
                backgroundColor: props.allocations.map(_ => predefinedColors[Math.floor(Math.random() * predefinedColors.length)]),

                
            },
        ],
    };
    return (
        <div style={{width: '300px', height: '300px'}}>
            <Doughnut data={data}></Doughnut>
        </div>
    );
  } else {
    return <div></div>;
  }
};

export default AllocationChart;
