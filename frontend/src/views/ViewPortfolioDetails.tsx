import { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, Stack, Avatar } from "@mui/material";
import AllocationChart from "../components/chart/AllocationChart";
import { useStores } from "../stores";
import { useLocation } from "react-router";
import { allStocks } from "../constants/stocks";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


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
  // const { userId, portfolioName } = state;
  const userId = "1";
  const portfolioName = "test2";
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Make an API call to fetch portfolio data
    AppStore.viewPortfolioController(portfolioName, userId)
      .then(async (res) => {
        setStockPortfolioData(res);
        console.log(res);
        for (let stock of res.allocations) {
          await getStock(stock.stockName)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  ///////////// Function to fetch stock data from API /////////////
  /// uncomment this + line 239-247 + line 132-144 in AppStore.ts viewStockController once debugging is done ///  
  const getStock = (stockTicker: string) => {
    // Fetch stock data
    console.log(stockTicker)
    return AppStore.viewStockController(stockTicker)
      .then((res) => {
        // console.log(stocks.includes(res));
        // if (stocks.includes(res)) {
        setStocks(prevStocks => [...prevStocks, res]);
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


  // To format the dateTime string from Portfolio object
  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options); // Replace 'en-US' with the desired locale
  }


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
                  <Typography> This portfolio was created by user <b>{stockPortfolioData.userId}</b>. </Typography>
                  <Typography sx={{ paddingY: 2 }}>
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
                            <TableCell align="center" sx={{ fontWeight: "bold" }}>Performance wrt Total Initial Capital(%)</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {stockPortfolioData.allocations?.map((allocation: any, index: number) => (

                            <TableRow key={index}>
                              <TableCell align="center">{allocation.stockName} </TableCell>
                              <TableCell align="center">{allocation.percentage / 100 * stockPortfolioData.capital}</TableCell>
                              <TableCell align="center">{Math.round(allocation.percentage / 100 * stockPortfolioData.capital / allocation.averagePrice)}</TableCell>
                              <TableCell align="center">200</TableCell>
                              <TableCell align="center">{Math.round((200 - allocation.averagePrice) * (allocation.percentage / 100 * stockPortfolioData.capital))}</TableCell>
                              <TableCell align="center"
                                sx={{
                                  fontWeight: "bold",
                                  color: // Change color of the percentage based on whether it is positive or negative
                                    Math.round(allocation.percentage / 100 * stockPortfolioData.capital / allocation.averagePrice * (200 - allocation.averagePrice)) / 100 > 0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {Math.round(allocation.percentage / 100 * stockPortfolioData.capital / allocation.averagePrice * (200 - allocation.averagePrice)) / 100}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant="subtitle1" sx={{ marginTop: "2%" }}> <i>Formula: stock price now - stock price when portfolio was created </i></Typography>

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
                          { stocks.map((stock: any, index: number) => (
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

        {/* Analytics */}
        <Grid item xs={4}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "500",
              textAlign: "center",
              marginBottom: "1%",
              marginTop: "1%"
            }}
          >
            Analytics
          </Typography>
          <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* insert donut chart, can add piechart for regions they belong to */}
            <CardContent>
              <AllocationChart allocations={stockPortfolioData ? stockPortfolioData.allocations : null}></AllocationChart>
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
