import {
  Ticker,
  TickerTape,
  SymbolInfo,
  MiniChart,
} from "react-ts-tradingview-widgets";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Container, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import bgPicture from "/assets/img/home-page-picture.jpg"

const first = [
  {
    description: "",
    proName: "NASDAQ:AAPL",
  },
  {
    description: "",
    proName: "NASDAQ:MSFT",
  },
  {
    description: "",
    proName: "NASDAQ:AMZN",
  },
  {
    description: "",
    proName: "NASDAQ:GOOGL",
  },
  {
    description: "",
    proName: "NASDAQ:META",
  },
  {
    description: "",
    proName: "NYSE:BRK.A",
  },
  {
    description: "",
    proName: "NASDAQ:TSLA",
  },
  {
    description: "",
    proName: "NYSE:JPM",
  },
];

const second = [
  {
    description: "",
    proName: "NASDAQ:NVDA",
  },
  {
    description: "",
    proName: "NYSE:JNJ",
  },
  {
    description: "",
    proName: "NYSE:V",
  },
  {
    description: "",
    proName: "NYSE:PG",
  },
  {
    description: "",
    proName: "NYSE:UNH",
  },
  {
    description: "",
    proName: "NYSE:HD",
  },
  {
    description: "",
    proName: "NYSE:MA",
  },
  {
    description: "",
    proName: "NYSE:BAC",
  },
];

const third = [
  {
    description: "",
    proName: "NYSE:DIS",
  },
  {
    description: "",
    proName: "NASDAQ:NFLX",
  },
  {
    description: "",
    proName: "NASDAQ:ADBE",
  },
  {
    description: "",
    proName: "NASDAQ:PYPL",
  },
];

const all = first.concat(second).concat(third);

function Item(props: any) {
  return (
    <Paper
      sx={{
        height: 500,
        width: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        elevation: 0,
      }}
    >
      <SymbolInfo symbol={props.item.proName} />
      <MiniChart width={1000} symbol={props.item.proName} />
    </Paper>
  );
}

export const Home = () => {
  return (
    <>
      {/* <Ticker colorTheme="light" symbols={first}></Ticker>
      <Ticker colorTheme="dark" symbols={second}></Ticker>
      <Ticker colorTheme="dark" symbols={third}></Ticker> */}

      {/* <Carousel
      >
        {
          all.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Carousel> */}

      {/* <img src={bgPicture} alt="" /> */}

      <Container
        maxWidth="false"
        sx={{ 
          backgroundImage: `url(${bgPicture})`,
          backgroundRepeat: 'no-repeat', // Prevent repeating the image
          backgroundPosition: 'center center', // Center the image
          height:"1000px"
        }}
      >
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item sx={{marginTop: 40, marginLeft: 3}}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                duration: 5,
              }}
            >
              <Typography sx={{ fontWeight: "700", fontSize: 175 }}>
                FINBROS
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -75 }}
              animate={{ opacity: 1, y: -50 }}
              transition={{
                type: "spring",
                duration: 3,
                delay: 3,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "600" }}>
                Bringing you only the best
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <TickerTape colorTheme="dark" symbols={all}></TickerTape>
    </>
  );
};

export default Home;
