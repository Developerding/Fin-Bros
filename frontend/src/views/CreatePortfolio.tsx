import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  Grid,
  List,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import PortfolioName from "../components/formComponents/controlled/PortfolioName";
import PortfolioDescription from "../components/formComponents/controlled/PortfolioDescription";
import PortfolioDate from "../components/formComponents/controlled/PortfolioDate";
import PortfolioCapital from "../components/formComponents/controlled/PortfolioCapital";
import PortfolioStock from "../components/PortfolioStock";
import { allStocks } from "../constants/stocks";
import dayjs, { Dayjs } from "dayjs";
import { useStores } from "../stores";
import PrimaryButton from "../components/buttons/PrimaryButton";

const CreatePortfolio_V2 = () => {
  // Constants of all stocks:

  type StockAllocation = {
    stockName: string;
    percentage: number;
  };

  const textFieldRef = useRef<HTMLDivElement>(null);
  const AppStore = useStores();
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [portfolio, setPortfolio] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioDate: null as Dayjs | null,
    portfolioCapital: 0,
    allocations: [] as StockAllocation[],
  });
  const [total, setTotal] = useState(0);

  // Search value
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLElement) | null>(
    null
  );
  const [filterOptions, setFilterOptions] = useState(allStocks);

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

  const handleSearchClick = (ticker: string) => {
    console.log("menu list clicked!");
    setSearchValue("");
    setFilterOptions(allStocks);
    setAnchorEl(null);
    const alreadyExists = portfolio.allocations.some(
      (allocation) => allocation.stockName === ticker
    );
    if (!alreadyExists) {
      const obj: StockAllocation = {
        stockName: ticker,
        percentage: 0,
      };
      setPortfolio({
        ...portfolio,
        allocations: [...portfolio.allocations, obj],
      });
    }
  };

  useEffect(() => {
    console.log(portfolio);
  }, [portfolio]);

  useEffect(() => {
    if (portfolio.allocations.length == 0) {
      setTotal(0);
      return;
    }
    let total = 0;
    portfolio.allocations.map((obj) => {
      if (obj.percentage) {
        total += obj.percentage;
      }
    });
    setTotal(total);
  }, [portfolio.allocations]);

  // Remove stocks
  const removeStock = (stockName: string) => {
    setPortfolio((prevPortfolio) => {
      const newAllocations = prevPortfolio.allocations.filter(
        (allocation) => allocation.stockName !== stockName
      );
      return { ...prevPortfolio, allocations: newAllocations };
    });
  };

  // Handle percentage change
  const handlePercentageChange = (
    stockName: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      allocations: prevPortfolio.allocations.map((allocation) => {
        if (allocation.stockName === stockName) {
          return { ...allocation, percentage: Number.parseInt(e.target.value) };
        }
        return allocation;
      }),
    }));
  };

  // Handles submit verification
  const handleSubmit = async () => {
    setLoading(true);
    setSuccess({
      status: false,
      message: "",
    });
    // Check whether all of the fields are filled
    if (
      portfolio.portfolioCapital == 0 ||
      portfolio.portfolioDate == null ||
      portfolio.portfolioDescription == "" ||
      portfolio.portfolioName == "" ||
      portfolio.allocations.length == 0
    ) {
      setError({
        status: true,
        message: "Fill in all required information",
      });
      setLoading(false);
      return;
    }

    // summing of allocations
    let sum = 0;
    portfolio.allocations.map((obj) => {
      sum += obj.percentage;
    });
    // for (let key in portfolio.allocations) {
    //   sum += portfolio.allocations[key].percentage;
    // }

    if (sum > 100) {
      setError({
        status: true,
        message: "Portfolio allocation exceeds 100%",
      });
      setLoading(false);
      return;
    } else if (sum != 100) {
      setError({
        status: true,
        message: "Portfolio allocation does not add up to 100%",
      });
      setLoading(false);
      return;
    }

    // Checking of Date:
    let currentDate = dayjs();
    if (portfolio.portfolioDate > currentDate) {
      setError({
        status: true,
        message: "Portfolio date cannot be in the future",
      });
      setLoading(false);
      return;
    }

    // Calling Controller:
    const jsDate = portfolio.portfolioDate.toDate();
    const data = {
      userId: AppStore.getUserId(),
      capital: portfolio.portfolioCapital,
      dateTime: jsDate,
      name: portfolio.portfolioName,
      description: portfolio.portfolioDescription,
      allocations: portfolio.allocations,
    };
    AppStore.uploadPortfolioController(data)
      .then((response) => {
        console.log(response);
        setError({
          status: false,
          message: "",
        });
        setSuccess({
          status: true,
          message: "Portfolio created successfully",
        });
        // logging the status
        const d = new Date();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const hour = d.getHours();
        const second = d.getSeconds();
        const formattedDate = `${month}/${day}/${year}`;
        const formattedTime = `${hour}:${second}`;
        const logData = {
          message: `${AppStore.getUserId()} created portfolio ${
            portfolio.portfolioName
          } at ${formattedDate} ${formattedTime}`,
        };
        setLoading(false);
        AppStore.createLogController(logData);
      })
      .catch((error) => {
        console.log(error);
        setError({
          status: true,
          message: "Portfolio name already exists",
        });
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="xl" sx={{ width: "100%" }}>
      <Paper
        sx={{
          margin: "auto",
          marginTop: "50px",
          width: "90%",
          borderRadius: "15px",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          {/* Title */}
          <Grid item>
            <Typography
              variant="body1"
              sx={{ marginTop: "16px", fontSize: "36px", fontWeight: "bold" }}
            >
              Create Portfolio
            </Typography>
          </Grid>

          {/* Contents */}
          <Grid container spacing={2}>
            {/* left columns */}
            <Grid item xs={4}>
              {/* Portfolio Name */}
              <Grid item>
                <PortfolioName
                  label="Portfolio Name"
                  placeholder="Enter portfolio name"
                  formControlId="portfolioName"
                  formValue={portfolio.portfolioName}
                  formData={portfolio}
                  setFormControlState={setPortfolio}
                  error={error.status}
                  errorText="Please enter a portfolio name"
                />
              </Grid>
              {/* Portfolio Description */}
              <Grid item style={{ marginTop: "40px" }}>
                <PortfolioDescription
                  label="Portfolio Description"
                  placeholder="Enter description"
                  formControlId="portfolioDescription"
                  formValue={portfolio.portfolioDescription}
                  formData={portfolio}
                  setFormControlState={setPortfolio}
                  error={error.status}
                  errorText="Please enter a description"
                />
              </Grid>
              {/* Inception Date */}
              <Grid item style={{ marginTop: "40px" }}>
                <PortfolioDate
                  label="Portfolio inception date"
                  formControlId="portfolioDate"
                  formValue={portfolio.portfolioDate}
                  formData={portfolio}
                  setFormControlState={setPortfolio}
                  error={error.status}
                  errorText="Please enter a date"
                />
              </Grid>
              {/* Capital */}
              <Grid item style={{ marginTop: "40px" }}>
                <PortfolioCapital
                  label="Portfolio Capital"
                  formControlId="portfolioCapital"
                  formValue={portfolio.portfolioCapital}
                  formData={portfolio}
                  setFormControlState={setPortfolio}
                  error={error.status}
                  errorText="Please enter a starting capital"
                />
              </Grid>

              <Grid item style={{ marginTop: "20px" }}>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "24px",
                    marginLeft: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Total Allocations: {total}%
                </Typography>
              </Grid>
            </Grid>

            {/* RHS */}
            <Grid item xs={8}>
              {/* Search Bar */}
              <Box
                sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}
              >
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
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
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

                <Paper
                  elevation={3}
                  sx={{ height: 350, overflow: "auto", marginTop: "10px" }}
                >
                  {portfolio.allocations.length == 0 ? (
                    <Box
                      justifyContent="center"
                      display="flex"
                      alignItems="center"
                    >
                      <Typography variant="body1" style={{ color: "red" }}>
                        No stocks added
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box
                        justifyContent="center"
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          variant="body1"
                          style={{ fontSize: "24px", fontWeight: "bold" }}
                        >
                          Allocations
                        </Typography>
                      </Box>
                      {portfolio.allocations.map((allocation, index) => (
                        <PortfolioStock
                          stockName={allocation.stockName}
                          currentPercentage={allocation.percentage}
                          key={index}
                          removeStock={() => removeStock(allocation.stockName)}
                          handlePercentChange={(
                            e: ChangeEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          ) => handlePercentageChange(allocation.stockName, e)}
                        />
                      ))}
                    </>
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>

          <PrimaryButton
            buttonText="Create portfolio"
            onClick={handleSubmit}
            isLoading={loading}
            style={{ width: "100%", margin: "0px" }}
            divStyle={{ width: "100%", padding: "20px" }}
          />
          {/* <Button
            variant="contained"
            onClick={handleSubmit}
            style={{
              width: "100%",
              margin: "15px",
              backgroundColor: "#054be3",
              borderRadius: "10px",
            }}
          >
            Create portfolio
          </Button> */}
        </Grid>
      </Paper>
      {error.status == true && (
        <Snackbar
          open={error.status}
          autoHideDuration={6000}
          // onClose={handleClose}
          // message="Please fill in all information"
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {error.message}
          </Alert>
        </Snackbar>
      )}

      {success.status && (
        <Snackbar open={success.status} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {success.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default CreatePortfolio_V2;
