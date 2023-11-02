import { Chart, Legend, Tooltip, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Line } from "react-chartjs-2";

function StockChart(props) {
  if (props.stock && props.purchasedStock) {
    let stockData = props.stock.stockData.reverse();
    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    console.log(stockData[0]["date"])
    let data = {
        labels: stockData.map(stock => stock.date),
        datasets: [
            {
                label: props.stock.name,
                data: stockData.map(stock => stock.close),
                borderColor: 'rgba(173, 216, 130, 0.5)',
                backgroundColor: 'rgba(173, 216, 130, 0.5)',
            },
            {
                label: 'Portfolio purchased price',
                data: {
                    "2023-02-26": 120,
                },
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }
        ],
    };
    return (
        <div style={{width: '900px', height: '900px'}}>
            <Line data={data}></Line>
        </div>
    );
  } else {
    return <div></div>;
  }
};

export default StockChart;
