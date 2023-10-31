import {
  CardContent,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import { allStocks } from "../constants/stocks";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
interface Props {
  style?: {};
  className?: string;
  stockName: string;
  currentPercentage: number;
  //   onClick: () => void;
  //   onChange: () => void;
  divStyle?: {};
  divClassName?: string;
  removeStock: () => void;
  handlePercentChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PortfolioStock: FC<Props> = ({
  style,
  className,
  stockName,
  currentPercentage,
  //   onClick,
  //   onChange,
  removeStock,
  handlePercentChange,
  divStyle,
  divClassName,
}) => {
  const defaultStyle: React.CSSProperties = {};
  const styling = { ...defaultStyle, ...style };
  const stockObj = allStocks.filter((stock) => stock.ticker == stockName)[0];

  return (
    <>
      <CardContent style={{ padding: "16px 16px 0px 16px" }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Avatar src={`/assets/stocks/${stockName}.png`} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {stockName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">{stockObj.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            {/* number field */}
            <TextField
              type="number"
              placeholder="0"
              value={currentPercentage}
              onChange={(event) => {
                if (event.target.value.includes("e")) {
                  event.preventDefault();
                  return;
                }
                handlePercentChange(event);
              }}
              style={{ width: "100%" }}
              InputProps={{
                inputMode: "numeric",
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              inputProps={{
                pattern: "[0-9]*",
              }}
            />
          </Grid>
          <Grid item xs={2} display={"flex"} justifyContent={"center"}>
            {/* delete button */}
            {/* <Button
              variant="contained"
              style={{
                borderRadius: "50%",
                padding: "10px",
                minWidth: "unset",
                width: "40px",
                height: "40px",
                border: "1px solid black",
                backgroundColor: "white",
              }}
            > */}
            <DeleteForeverOutlinedIcon
              style={{ color: "grey", cursor: "pointer" }}
              onClick={removeStock}
            />
            {/* </Button>{" "} */}
          </Grid>
        </Grid>

        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Avatar src={`/assets/stocks/${stockName}.png`} />
          <Typography variant="h4"> {stockName}</Typography>

          <Stack direction="row" justifyContent="space-around" spacing={2}>

            <TextField
              placeholder="0"
              onChange={(event) => handlePercentChange(event)}
              type="number"
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />

            <Button variant="outlined" onClick={removeStock}>
              <Typography variant="h3">-</Typography>
            </Button>
          </Stack>
        </Stack> */}
      </CardContent>
    </>
  );
};

export default PortfolioStock;
