import { useEffect, useState } from "react";
import { Paper, Avatar, Grid, Stack, Box } from "@mui/material";
import { useStores } from "../stores";
import { useLocation } from "react-router";
import StockChart from "../components/chart/StockChart";


const IndivStock = () => {
const AppStore = useStores();
const{ state } = useLocation();
const {stockName, avgPrice, portfolio, stocks} = state;
const [stock, setStock] = useState(null);
const [diff, setDiff] = useState(0);

function test(){
    console.log("test")
    console.log(stockName)
    console.log(portfolio)
    console.log(stocks)
    console.log(stock)
}

useEffect(
    () => {
        for(let i = 0; i < stocks.length; i++){
            if(stocks[i].name == stockName){
                setStock(stocks[i])
            }
        }

        setDiff(stock?.stockData[0].close - avgPrice)
    }, [stock]
)
    return (
        <>
        <Paper >
            <br></br>
            <Grid spacing={3}>
                <Stack direction="row" spacing={3} alignItems="center">
                <Avatar src={`/assets/stocks/${stockName}.png`} sx={{ width: 100, height: 100}} />
                <h1>{stock?.name }</h1>
                </Stack>
            </Grid>
            <p>{stock?.description}</p>
            <br></br>
        </Paper>
        <br></br>
        <Paper>
            <br></br>
            <Grid container sx={{marginLeft:"50px"}}>
                <Grid item sm={8}>
                <StockChart stock={stock} purchasedStock={stockName}/>
                </Grid>
                <Grid item sm={4}>
                    <Stack justifyContent="center" alignItems="start" sx={{height: "450px"}}>
                        <h3> Current Price: ${stock?.stockData[0].close} </h3>
                        <h3> Purchased Price: ${avgPrice} </h3>
                        <h3> P/L: {diff.toFixed(2)}% </h3>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
        </>
    );
}

export default IndivStock;