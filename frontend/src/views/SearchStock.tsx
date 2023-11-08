import { useEffect, useState, ChangeEvent, useRef } from "react";
import {
  Paper,
  Avatar,
  Grid,
  Stack,
  TextField,
  Popper,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import { useStores } from "../stores";
import { allStocks } from "../constants/stocks";
import StockChartSearch from "../components/chart/StockChartSearch";
import { Auth } from "../components/Auth";

const SearchStock = () => {
  const textFieldRef = useRef<HTMLDivElement>(null);
  const AppStore = useStores();
  const [stock, setStock] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );
  const [filterOptions, setFilterOptions] = useState(allStocks);

  useEffect(() => {
    if (stock != null) {
      StockDetails();
    }
  }, [stock]);

  // Search function (auto complete)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filtered = allStocks.filter(
      (option) =>
        option.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        option.ticker.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterOptions(filtered);
  };

  const handleSearchClick = async (ticker: string) => {
    setSearchValue("");
    setFilterOptions(allStocks);
    setAnchorEl(null);
    AppStore.viewStockController(ticker).then((res) => {
      setStock(res);
      console.log(res);
    });
  };

  const StockDetails = () => {
    return (
      <>
        <Auth />
        <Paper>
          <br></br>
          <Grid>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                src={`/assets/stocks/${stock?.name}.png`}
                sx={{ width: 100, height: 100 }}
              />
              <h1>{stock?.name}</h1>
            </Stack>
          </Grid>
          <p>{stock?.description}</p>
          <br></br>
        </Paper>
        <br></br>
        <Paper>
          <br></br>
          <Grid container sx={{ marginLeft: "50px" }}>
            <Grid item sm={8}>
              <StockChartSearch stock={stock} />
            </Grid>
            <Grid item sm={4}>
              <Stack
                justifyContent="center"
                alignItems="start"
                sx={{ height: "450px" }}
              >
                <h3> Current Price: ${stock?.stockData[0].close} </h3>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  };
  return (
    <>
      <TextField
        id="stockSearch"
        ref={textFieldRef}
        label="Search for stocks"
        type="text"
        value={searchValue}
        style={{
          marginTop: "10px",
          width: "100%",
        }}
        onChange={handleSearchChange}
        onFocus={(e) => setAnchorEl(e.currentTarget)}
        onBlur={() => setAnchorEl(null)}
      />
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: textFieldRef?.current?.offsetWidth }}
      >
        <MenuList
          style={{
            maxHeight: "230px",
            width: "100%",
            overflowY: "auto",
            border: "1px solid black",
            borderRadius: "10px",
            marginTop: "4px",
            backgroundColor: "white",
          }}
        >
          {filterOptions.map((obj, index) => (
            <MenuItem
              key={index}
              onMouseDown={() => console.log("clicked")}
              style={{ marginTop: "16px" }}
            >
              <Grid
                container
                alignItems="center"
                spacing={2}
                onMouseDown={() => handleSearchClick(obj.ticker)}
              >
                <Grid item xs={1}>
                  <Avatar src={`/assets/stocks/${obj.ticker}.png`} />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {obj.ticker}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">{obj.name}</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </MenuList>
      </Popper>

      {stock != null && <StockDetails />}
    </>
  );
};

export default SearchStock;
