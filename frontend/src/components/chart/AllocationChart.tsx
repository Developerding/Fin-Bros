import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

function AllocationChart(props) {
  if (props.allocations) {
    Chart.register(ArcElement, Tooltip, Legend)
    let data = {
    labels: props.allocations.map(stock => stock.stockName),
    datasets: [
        {
            label: 'Allocation percentage',
            data: props.allocations.map(stock => stock.percentage),
            borderWidth: 1,
            backgroundColor: props.allocations.map(_ => randomRGB()),
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
