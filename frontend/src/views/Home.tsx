import { Ticker, TickerTape, SymbolInfo, MiniChart } from "react-ts-tradingview-widgets";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const first = [
  {
    "description": "",
    "proName": "NASDAQ:AAPL"
  },
  {
    "description": "",
    "proName": "NASDAQ:MSFT"
  },
  {
    "description": "",
    "proName": "NASDAQ:AMZN"
  },
  {
    "description": "",
    "proName": "NASDAQ:GOOGL"
  },
  {
    "description": "",
    "proName": "NASDAQ:META"
  }, 
  {
    "description": "",
    "proName": "NYSE:BRK.A"
  },
  {
    "description": "",
    "proName": "NASDAQ:TSLA"
  },
  {
    "description": "",
    "proName": "NYSE:JPM"
  }
]

const second = [{
  "description": "",
  "proName": "NASDAQ:NVDA"
},
{
  "description": "",
  "proName": "NYSE:JNJ"
},
{
  "description": "",
  "proName": "NYSE:V"
},
{
  "description": "",
  "proName": "NYSE:PG"
},
{
  "description": "",
  "proName": "NYSE:UNH"
},
{
  "description": "",
  "proName": "NYSE:HD"
},
{
  "description": "",
  "proName": "NYSE:MA"
},{
  "description": "",
  "proName": "NYSE:BAC"
}
]

const third = [{
  "description": "",
  "proName": "NYSE:DIS"
},
{
  "description": "",
  "proName": "NASDAQ:NFLX"
},
{
  "description": "",
  "proName": "NASDAQ:ADBE"
},
{
  "description": "",
  "proName": "NASDAQ:PYPL"
}]

const all = first.concat(second).concat(third)

function Item(props: any) {
  return (
    <Paper
    sx={{
      height: 500, width: 1, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundColor:"transparent", elevation: 0}}
    >
        <SymbolInfo symbol={props.item.proName} />
        <MiniChart width={1000} symbol={props.item.proName} />
    </Paper>
)
}

export const Home = () => {
  return (
    <>
      {/* <Ticker colorTheme="light" symbols={first}></Ticker>
      <Ticker colorTheme="dark" symbols={second}></Ticker>
      <Ticker colorTheme="dark" symbols={third}></Ticker> */}
      <TickerTape colorTheme="dark" symbols={all}></TickerTape>
      {/* <Carousel
      >
        {
          all.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Carousel> */}

    </>
  );
};

export default Home;
