import { Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const CreatePortfolio_V2 = () => {
  // Constants of all stocks:
  const AllStocks = [
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

  const [portfolio, setPortfolio] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioDate: "",
    portfolioCapital: 0,
    allocations: [],
  });

  return (
    <Paper>
      <Typography variant="h2">Create Portfolio</Typography>
    </Paper>
  );
};

export default CreatePortfolio_V2;
