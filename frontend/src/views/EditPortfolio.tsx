import {
  Typography,
  TextField,
  Grid,
  Box,
  MenuList,
  MenuItem,
  Paper,
  ListItemText,
  Card,
  CardContent,
  Button,
  Alert,
  Snackbar,
  Container,
  Popper,
  Avatar,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useStores } from "../stores";
import { useLocation, useNavigate } from "react-router";
import * as LINKS from "../routes/links";
import dayjs, { Dayjs } from "dayjs";
import PrimaryButton from "../components/buttons/PrimaryButton";
import PortfolioStock from "../components/PortfolioStock";
import PortfolioCapital from "../components/formComponents/controlled/PortfolioCapital";
import PortfolioDate from "../components/formComponents/controlled/PortfolioDate";
import PortfolioDescription from "../components/formComponents/controlled/PortfolioDescription";
import PortfolioName from "../components/formComponents/controlled/PortfolioName";
import { allStocks } from "../constants/stocks";

interface portfolio {
  portfolioName: string;
  portfolioCapital: number;
  portfolioDescription: string;
  portfolioDate: Dayjs | null;
  allocations: allocation[];
}

interface allocation {
  stockName: string;
  percentage: number;
}

interface StockAllocation {
  stockName: string;
  percentage: number;
}

export const EditPortfolio = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [portfolio, setPortfolio] = useState<portfolio>({
    portfolioName: "",
    portfolioCapital: 0,
    portfolioDescription: "",
    portfolioDate: null,
    allocations: [],
  });
  const [originalPortfolioName, setOriginalPortfolioName] = useState("");
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [portfolioLoading, setPortfolioLoading] = useState(false);

  // Search function (auto complete)
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

  // starting useEffect:
  useEffect(() => {
    setPortfolioLoading(true);
    if (state == null) {
      navigate(LINKS.HOME_PAGE);
      return;
    }
    setOriginalPortfolioName(state.portfolioName);

    // Getting original portfolio Data:
    AppStore.getPortfolioByUserIdController(
      AppStore.getUserId(),
      state.portfolioName
    ).then((res: any) => {
      let data = res.data;
      const portfolioName = data.name;
      const portfolioDescription = data.description;
      const portfolioCapital = data.capital;
      let portfolioDate = data.dateTime;
      portfolioDate = dayjs(portfolioDate);
      let allocations = [];
      for (let stockData of data.allocations) {
        allocations.push({
          stockName: stockData.stockName,
          percentage: stockData.percentage,
        });
      }
      setPortfolio({
        portfolioName: portfolioName,
        portfolioCapital: portfolioCapital,
        portfolioDescription: portfolioDescription,
        portfolioDate: portfolioDate,
        allocations: allocations,
      });
      setPortfolioLoading(false);
    });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ width: "100%" }}>
      {portfolioLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          width={"80%"}
          height={500}
          margin="auto"
          borderRadius="100px"
        >
          <Skeleton variant="rectangular" width="100%" height="100%" />
          <CircularProgress
            style={{
              position: "absolute",
              zIndex: 10,
            }}
          />
        </Box>
      ) : (
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
                Edit Portfolio
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
              </Grid>

              {/* RHS */}
              <Grid item xs={8}>
                {/* Search Bar */}
                <Box
                  sx={{
                    width: "calc(100%-32px)",
                    margin: "16px 16px 0px 16px",
                  }}
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
                              <Avatar
                                src={`/assets/stocks/${obj.ticker}.png`}
                              />
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
                              <Typography variant="body2">
                                {obj.name}
                              </Typography>
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
                            removeStock={() =>
                              removeStock(allocation.stockName)
                            }
                            handlePercentChange={(
                              e: ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                              >
                            ) =>
                              handlePercentageChange(allocation.stockName, e)
                            }
                          />
                        ))}
                      </>
                    )}
                  </Paper>
                </Box>
              </Grid>
            </Grid>

            {/* <PrimaryButton
            buttonText="Create portfolio"
            onClick={handleSubmit}
            isLoading={loading}
            style={{ width: "100%", margin: "0px" }}
            divStyle={{ width: "100%", padding: "20px" }}
          /> */}
          </Grid>
        </Paper>
      )}
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

export default EditPortfolio;
