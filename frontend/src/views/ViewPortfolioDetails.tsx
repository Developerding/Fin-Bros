import { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, Stack, Avatar, Box } from "@mui/material";
import AllocationChart from "../components/chart/AllocationChart";
import { useStores } from "../stores";
import { useLocation } from "react-router";
import { allStocks } from "../constants/stocks";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RegionChart from "../components/chart/RegionChart";


const handleRowClick = (allocation: any) => {
  console.log('clicked on');
  console.log(allocation.stockName);
};

///////// Constants to calculate overall returns (to be used in the table but debug first) /////////
// const capitalAllocated = (allocation) => (allocation.percentage / 100) * stockPortfolioData.capital;
// const numberOfSharesBought = (allocation) => Math.round(capitalAllocated(allocation) / allocation.averagePrice);
// const returns = (allocation) => Math.round(numberOfSharesBought(allocation) * (200 - allocation.averagePrice) / 100);
// const isPositiveReturn = (allocation) => returns(allocation) > 0;
// const performance = (allocation) => Math.round(returns(allocation) / capitalAllocated(allocation) * 100) / 100;


const ViewPortfolioDetails = () => {
  const AppStore = useStores();
  const [stockPortfolioData, setStockPortfolioData] = useState<any>({});
  const [hoveredRow, setHoveredRow] = useState(-1); // to change the background color of the row when hovered
  const { state } = useLocation();
  const { userId, portfolioName } = state;
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Make an API call to fetch portfolio data
    AppStore.viewPortfolioController(portfolioName, userId)
      .then(async (res) => {
        setStockPortfolioData(res);
        for (let stock of res.allocations) {
          await getStock(stock.stockName)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  ///////////// Function to fetch stock data from API /////////////
  const getStock = (stockTicker: string) => {
    // Fetch stock data
    return AppStore.viewStockController(stockTicker)
      .then((res) => {
        // if (stocks.includes(res)) {
        setStocks(prevStocks => {
          // Check if the stock already exists in the state
          const isStockExists = prevStocks.some(stock => stock.name === res.name);

          // If the stock doesn't exist, add it to the state
          if (!isStockExists) {
            return [...prevStocks, res];
          }

          // If the stock exists, return the previous state
          return prevStocks;
        });
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
        return null; // Return null in case of an error
      });
  };



  // Find the stock name from allStocks object from the allocations.stockName (which is the ticker)
  const getRealStockName = (stockName: string) => {
    const stock = allStocks.find((stock) => stock.ticker === stockName);
    return stock?.name;
  };

  const getCurrentStockPrice = (stockName: string) => {
    const stock = stocks.find((stock) => stock.name === stockName);
    return stock?.stockData[0].close;
  }

  // To format the dateTime string from Portfolio object
  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Replace 'en-US' with the desired locale
  }

  const capital = stockPortfolioData?.capital;

  const getCurrentStockPriceForAllocations = {};
  const allocationData = stockPortfolioData.allocations?.map((allocation) => {
    const stockName = allocation.stockName;
    const currentStockPrice = getCurrentStockPrice(stockName);
    getCurrentStockPriceForAllocations[stockName] = currentStockPrice;

    const capitalAllocated = (allocation.percentage / 100) * capital;
    const numberOfSharesBought = Math.round(capitalAllocated / allocation.averagePrice);
    const returns = Math.round(
      (currentStockPrice - allocation.averagePrice) * (capitalAllocated / allocation.averagePrice)
    );
    const isPositiveReturn = returns > 0;
    const performance = Math.round((returns / capitalAllocated) * 100) / 100;

    return {
      stockName: allocation.stockName,
      capitalAllocated,
      numberOfSharesBought,
      currentStockPrice,
      returns,
      isPositiveReturn,
      performance,
    };
  });

  // console.log(allocationData);


  return (
    <>

      <Container maxWidth="xl" sx={{ marginTop: "2%" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>

            <Stack direction="right" justifyContent="space-between">
              <Typography variant="h2" sx={{ fontWeight: "500", marginBottom: "2%" }}>
                {stockPortfolioData.name}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: "500", marginBottom: "2%" }}>
                Created on <b>{formatDateTime(stockPortfolioData.dateTime)} </b>
              </Typography>
            </Stack>



            {/* Portfolio Description */}
            <Typography variant="h3" sx={{ marginTop: "1%", marginBottom: "1%" }}>
              <b>Portfolio Description </b>
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">
                  {stockPortfolioData.description}
                </Typography>

                <Stack sx={{ width: 1, display: "flex", height: "100%", paddingY: 2, justifyContent: "start", paddingLeft: 1 }}>
                  {/*<Typography> This portfolio was created by user <b>{stockPortfolioData.userId}</b>. </Typography> */}
                  <Typography sx={{ paddingY: 1 }}>
                    Portfolio consists of stocks from {stockPortfolioData.allocations?.map((allocation: any, index: number) => (
                      <span key={index}>
                        <b>{getRealStockName(allocation.stockName)}</b>
                        {index === stockPortfolioData.allocations.length - 1
                          ? ''
                          : index === stockPortfolioData.allocations.length - 2
                            ? ' and '
                            : ', '}


                      </span>
                    ))}
                  </Typography>
                  <Typography>
                    Total capital allocated to this portfolio is <b>${stockPortfolioData.capital}</b>.
                  </Typography>
                </Stack>

              </CardContent>
            </Card>

            <Grid container spacing={4} sx={{ marginTop: "1%" }}>
              <Grid item xs={5}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <b>Stock Allocation </b>
                </Typography>
                <Card>
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableHead >
                          <TableRow >
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Symbol</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Stock Name</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Buying Price</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Percentage Allocation</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {stockPortfolioData.allocations?.map((allocation: any, index: number) => (
                            <TableRow
                              key={index}
                              onClick={() => handleRowClick(allocation)} // Attach onClick event to TableRow
                              style={{
                                cursor: "pointer",
                                backgroundColor: hoveredRow === index ? "lightgrey" : "",
                              }}
                              onMouseEnter={() => setHoveredRow(index)}
                              onMouseLeave={() => setHoveredRow(-1)}
                            >
                              <TableCell align="center">
                                <Avatar src={`/assets/stocks/${allocation.stockName}.png`} sx={{ width: 50, height: 50 }} />
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="h5" >
                                  {getRealStockName(allocation.stockName)}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">{allocation.averagePrice}</TableCell>
                              <TableCell align="center">{allocation.percentage}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={7}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <b>Overall Returns </b>
                </Typography>
                <Card>
                  <CardContent>
                    <TableContainer >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Stock Ticker</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Capital Allocated</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Number of Shares Bought</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Current Price</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Returns ($)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Performance wrt Stock Capital Allocation(%)</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {allocationData?.map((allocation: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell align="center">{allocation.stockName}</TableCell>
                              <TableCell align="center">{allocation.capitalAllocated}</TableCell>
                              <TableCell align="center">
                                {Math.round(allocation.numberOfSharesBought)}
                              </TableCell>
                              <TableCell align="center">{allocation.currentStockPrice}</TableCell>
                              <TableCell align="center">
                                {Math.round(allocation.returns)}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontWeight: "bold",
                                  color: allocation.isPositiveReturn ? "green" : "red",
                                }}
                              >
                                {Math.round((allocation.returns / allocation.capitalAllocated) * 100) / 100}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>


                      </Table>
                    </TableContainer>

                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ marginTop: "2%", marginBottom: "0.5%" }}>
              <b>Geographic Data </b>
            </Typography>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <TableContainer>
                    <Table>
                      <TableHead >
                        <TableRow >
                          {/* <TableCell align="center" sx={{ fontWeight: "bold" }}>Symbol</TableCell> */}
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>Stock Name</TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>Country</TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>Sector</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {stocks.map((stock: any, index: number) => (
                          <TableRow key={index}>
                            {/* <TableCell align="center">
                                <Avatar src={`/assets/stocks/${stock.name}.png`} sx={{ width: 50, height: 50 }} />
                              </TableCell> */}
                            <TableCell align="center">
                              <Typography variant="h5" >
                                {getRealStockName(stock.name)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">{stock.country}</TableCell>
                            <TableCell align="center">{stock.sector}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h4" sx={{ marginTop: "2%", marginBottom: "0.5%" }}>
            <b>Analytics</b>
          </Typography>
          <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* insert donut chart, can add piechart for regions they belong to */}
            <CardContent>
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <b>Portfolio Allocation by Stock</b>
                  </Typography>
                  <AllocationChart allocations={stockPortfolioData ? stockPortfolioData.allocations : null}></AllocationChart>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <b>Portfolio Allocation by Region</b>
                  </Typography>
                  <RegionChart stocks={stocks ? stocks : null}></RegionChart>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "1%" }}>
        </Grid>
      </Container>
    </>
  );
}

export default ViewPortfolioDetails;
