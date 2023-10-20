import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Container, Grid, Typography, Card, CardContent, MenuList, MenuItem } from "@mui/material";
import DoughnutChart from "../components/chart/Chart";
import { useStores } from "../stores";

const stockPortfolioData = {
    "_id": {
      "$oid": "65322c839e44a31b94a6933c"
    },
    "userId": "1",
    "capital": 50000,
    "dateTime": {
      "$date": "2023-10-14T08:30:06.629Z"
    },
    "name": "test2",
    "description": "This is a sample portfolio with a unique name.",
    "allocations": [
      {
        "stockName": "AAPL",
        "averagePrice": 150,
        "quantity": 100,
        "capitalAllocated": 15000,
        "percentage": 30
      },
      {
        "stockName": "MSFT",
        "averagePrice": 150,
        "quantity": 100,
        "capitalAllocated": 15000,
        "percentage": 70
      }
    ],
    "_class": "g1t1.backend.portfolio.Portfolio"
};
// const AppStore = useStores();

// const [stockPortfolioData, setStockPortfolioData] = useState<any>({});

// const ViewPortfolioDetails = ()=> {
//   useEffect(() => {
//     AppStore.viewPortfolioController("test1")
//       .then((res) => {
//         console.log("Response data:", res);
//         setStockPortfolioData(res);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

// NOTE: just comment line 53 and uncomment the stuff  on top
function ViewPortfolioDetails() {
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "2%" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>

            <Typography variant="h2" sx={{ fontWeight: "500", marginBottom: "2%"}}>
              {stockPortfolioData.name}
            </Typography>

            {/* Portfolio Description */}
            <Typography variant="h4" sx={{ marginTop: "1%", marginBottom: "0.5%"}}> 
              <b>Portfolio Description </b> 
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="subtitle1"> 
                  {stockPortfolioData.description}
                </Typography>
              </CardContent>
            </Card>

            {/* Total Capital */}
            <Typography variant="h4" sx={{ marginTop: "1%", marginBottom: "0.5%"}}>
              <b>Capital </b>
            </Typography>
            <Grid item xs={2}>  
              <Card>
                <CardContent>
                  <Typography variant="subtitle1"> ${stockPortfolioData.capital}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>       
        </Grid>
  
          {/* Analytics */}
        <Grid container spacing={4} sx={{ marginTop: "1%" }}>
          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Analytics
            </Typography>
            <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* insert donut chart, can add piechart for regions they belong to */}
              <CardContent>
              <DoughnutChart></DoughnutChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Overall Returns
            </Typography>
            <Card>
              <CardContent>something</CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Allocation
            </Typography>
            <Card>
              <CardContent>
                <MenuList>
                {stockPortfolioData.allocations.map((allocation:any) => (
                    <MenuItem key={allocation.stockName}>
                      <Typography>{allocation.stockName} - {allocation.percentage}% , Capital is ${allocation.capitalAllocated} for {allocation.quantity} shares </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ViewPortfolioDetails;
