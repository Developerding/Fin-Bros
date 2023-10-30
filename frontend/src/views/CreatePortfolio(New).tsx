import { Autocomplete, Button, Grid, List, Paper, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState, useEffect, ChangeEvent } from "react";
import PortfolioName from "../components/formComponents/controlled/PortfolioName";
import PortfolioDescription from "../components/formComponents/controlled/PortfolioDescription";
import PortfolioDate from "../components/formComponents/controlled/PortfolioDate";
import PortfolioCapital from "../components/formComponents/controlled/PortfolioCapital";
import PortfolioStock from "../components/PortfolioStock";

const CreatePortfolio_V2 = () => {
  // Constants of all stocks:
  const allStocks = [
    { name: "Apple Inc.", ticker: "AAPL" },
    { name: "Microsoft Corp.", ticker: "MSFT" },
    { name: "Amazon.com Inc.", ticker: "AMZN" },
    { name: "Alphabet Inc.", ticker: "GOOGL" },
    { name: "Facebook, Inc.", ticker: "FB" },
    { name: "Berkshire Hathaway Inc.", ticker: "BRK.A" },
    { name: "Tesla, Inc.", ticker: "TSLA" },
    { name: "NVIDIA Corporation", ticker: "NVDA" },
    { name: "JPMorgan Chase & Co.", ticker: "JPM" },
    { name: "Johnson & Johnson", ticker: "JNJ" },
    { name: "Visa Inc.", ticker: "V" },
    { name: "Procter & Gamble Co.", ticker: "PG" },
    { name: "UnitedHealth Group Inc.", ticker: "UNH" },
    { name: "Home Depot Inc.", ticker: "HD" },
    { name: "Mastercard Inc.", ticker: "MA" },
    { name: "Bank of America Corp.", ticker: "BAC" },
    { name: "Walt Disney Co.", ticker: "DIS" },
    { name: "Netflix Inc.", ticker: "NFLX" },
    { name: "Adobe Inc.", ticker: "ADBE" },
    { name: "PayPal Holdings Inc.", ticker: "PYPL" },
    { name: "Exxon Mobil Corp.", ticker: "XOM" },
    { name: "Coca-Cola Co.", ticker: "KO" },
    { name: "Intel Corp.", ticker: "INTC" },
    { name: "Cisco Systems Inc.", ticker: "CSCO" },
    { name: "PepsiCo Inc.", ticker: "PEP" },
    { name: "Walmart Inc.", ticker: "WMT" },
    { name: "Chevron Corp.", ticker: "CVX" },
    { name: "AT&T Inc.", ticker: "T" },
    { name: "Merck & Co. Inc.", ticker: "MRK" },
    { name: "Verizon Communications Inc.", ticker: "VZ" },
    { name: "Nike Inc.", ticker: "NKE" },
    { name: "Boeing Co.", ticker: "BA" },
    { name: "Oracle Corp.", ticker: "ORCL" },
    { name: "Goldman Sachs Group Inc.", ticker: "GS" },
    { name: "McDonald's Corp.", ticker: "MCD" },
    { name: "3M Co.", ticker: "MMM" },
    { name: "Salesforce.com Inc.", ticker: "CRM" },
    { name: "Abbott Laboratories", ticker: "ABT" },
    { name: "American Express Co.", ticker: "AXP" },
    { name: "Costco Wholesale Corp.", ticker: "COST" },
  ];

  type StockAllocation = {
    stockName: string;
    percentage: number;
  };

  const [error, setError] = useState(false);

  const [portfolio, setPortfolio] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioDate: "",
    portfolioCapital: 0,
    allocations: [] as StockAllocation[],
  });

  // Add stocks
  const addStock = (stockName: string) => { 
    if (!portfolio.allocations.some(item => item.stockName === stockName)) {

      const newAllocation: StockAllocation = { stockName, percentage: 0};
      setPortfolio({...portfolio, allocations:[...portfolio.allocations,newAllocation]})     
    }
  }

  useEffect(() => {
    console.log(portfolio)
  }, [portfolio])

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
        if (allocation.stockName === stockName){
          return {...allocation, percentage: Number.parseInt(e.target.value)};
        }
        return allocation;
      })
    }))
  }

  // Handles submit verification
  const handleSubmit = async () => {
    (await portfolio.portfolioName) == "" || (await portfolio.portfolioDescription) == "" || (await portfolio.portfolioCapital) == 0 || (await portfolio.portfolioDate) == "" ? setError(true) : setError(false)
  }

  const options = allStocks.map((option) => {
    const firstLetter = option.name[0]
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  

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
                  error={error}
                  errorText="Please enter a portfolio name"
                />
              </Grid>
              {/* Portfolio Description */}
              <Grid item>
                <PortfolioDescription 
                label="Portfolio Description"
                placeholder="Enter description"
                formControlId="portfolioDescription"
                formValue={portfolio.portfolioDescription}
                formData={portfolio}
                setFormControlState={setPortfolio}
                error={error}
                errorText="Please enter a description"
                />
              </Grid>
              {/* Inception Date */}
              <Grid item>
                <PortfolioDate 
                label="Portfolio inception date"
                formControlId="portfolioDate"
                formValue={portfolio.portfolioDate}
                formData={portfolio}
                setFormControlState={setPortfolio}
                error={error}
                errorText="Please enter a date"
                />
              </Grid>
              {/* Capital */}
              <Grid item>
                <PortfolioCapital
                label="Portfolio Capital"
                formControlId="portfolioCapital"
                formValue={portfolio.portfolioCapital}
                formData={portfolio}
                setFormControlState={setPortfolio}
                error={error}
                errorText="Please enter a starting capital"
                />
              </Grid>
            </Grid>

            {/* RHS */}
            <Grid item xs={8}>
              {/* Search Bar */}
              <Box
                sx={{ width: "calc(100%-32px)", margin: "16px 16px 0px 16px" }}
              >
                {/* <TextField
                  id="stockSearch"
                  label="Search for stocks"
                  type="text"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                  }}
                  // onChange={handleChange}
                  // inputRef={stockSearchInputRef}
                /> */}

                <Autocomplete
                  id="grouped-demo"
                  options={
                    options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))

                  }
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: "100%" }}
                  renderInput={(params) => <TextField {...params} label="Search for Stock" />}
                  isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
                  onChange={(event, value)=> {
                      if (value !== null) {
                        addStock(value.ticker);
                      }
                    }
                  }
                  clearOnBlur = {true}
                />
                <Paper
                  elevation={0}
                  sx={{maxHeight: 250, overflow: 'auto'}}

                >
                  
                  {portfolio.allocations.map((allocations, index)=> (
                  <PortfolioStock
                    stockName={allocations.stockName}
                    currentPercentage={allocations.percentage}
                    key={index}
                    onClick={() => removeStock(allocations.stockName)}
                    onChange={(e) => handlePercentageChange(allocations.stockName, e)}
                  />
                ))}
                  
                
                </Paper>
                
                
                
              </Box>
            </Grid>
          </Grid>

          <Button
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
          </Button>
        </Grid>

        
      </Paper>
    </Container>
  );
};

export default CreatePortfolio_V2;
