import { Paper } from "@mui/material";
import { useStores } from "../stores";
import { useLocation } from "react-router";

const IndivStock = () => {
const AppStore = useStores();
const{ state } = useLocation();
const {stockName} = state;


    return (
        <>
        <Paper>
            <h1>{stockName}</h1>

        </Paper>
        </>
    );
}

export default IndivStock;