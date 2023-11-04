import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const predefinedColors = [

    "hsl(210, 70%, 60%)", // Purple
    "hsl(240, 70%, 60%)", // Blue-Purple
    "hsl(270, 70%, 60%)", // Blue
    "hsl(300, 70%, 60%)", // Teal
    "hsl(330, 70%, 60%)", // Green
];

// const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
// const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

Array.prototype.groupBy = function(key) {
    return this.reduce((hash, obj) => {
        if(obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
    }, {})
};

function RegionChart(props) {
  if (props.stocks && props.stocks.length > 0) {
    Chart.register(ArcElement, Tooltip, Legend)
    let stocksByCountry = props.stocks.groupBy("country");
    let data = {
        labels: Object.keys(stocksByCountry),
        datasets: [
            {
                label: 'Portfolio Allocation by Region (%)',
                data: Object.keys(stocksByCountry).map(country => stocksByCountry[country].length / props.stocks.length * 100),
                borderWidth: 1,
                backgroundColor: Object.keys(stocksByCountry).map((_, index) => predefinedColors[index % predefinedColors.length]),

                // backgroundColor: Object.keys(stocksByCountry).map(_ => randomRGB()),
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

export default RegionChart;
