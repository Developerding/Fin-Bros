import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ControlledTextInput from "../components/formComponents/controlled/ControlledTextInput";
import {
  Avatar,
  Button,
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ControlledSelectInput from "../components/formComponents/controlled/ControlledSelectInput";
import PrimaryButton from "../components/buttons/PrimaryButton";
import OutlinedButton from "../components/buttons/OutlinedButton";
import NoUserNavBar from "../components/NavBar/NoUserNavBar";
import axios from "axios";
import { useStores } from "../stores";

import PortfolioStock from "../components/PortfolioStock";
import PortfolioName from "../components/formComponents/controlled/PortfolioName";
import PortfolioDescription from "../components/formComponents/controlled/PortfolioDescription";
import PortfolioDate from "../components/formComponents/controlled/PortfolioDate";
import PortfolioCapital from "../components/formComponents/controlled/PortfolioCapital";

const Testing = () => {
  const stocks = [
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
  const [form, setForm] = useState({
    portfolioName: "",
    portfolioDescription: "",
    portfolioDate: "",
    portfolioCapital: 0,
    stocks: [],
  });

  const [error, setError] = useState(false);
  const AppStore = useStores();
  useEffect(() => {
    console.log(form);
  }, [form]);
  const submitEvent = () => {
    if (
      form.portfolioCapital == 0 ||
      form.portfolioDate == "" ||
      form.portfolioDescription == "" ||
      form.portfolioName == "" ||
      form.stocks.length == 0
    ) {
      setError(true);
    }
    console.log("submit");
  };
  return (
    <>
      <NavBar />
      <NoUserNavBar />

      <Stack gap={1} direction="row">
        <PrimaryButton
          buttonText="Reset password"
          onClick={() => submitEvent()}
        />
        <OutlinedButton buttonText="Cancel" />
        <OutlinedButton buttonText="Login/Register" />
      </Stack>

      {/* <PortfolioStock currentPercentage={2} stockName="testing" /> */}
      <PortfolioName
        label="Portfolio Name"
        placeholder="Enter portfolio name"
        formControlId="portfolioName"
        formValue={form.portfolioName}
        formData={form}
        setFormControlState={setForm}
        error={error}
        errorText="Please enter a portfolio name"
      />
      <PortfolioDescription
        label="Portfolio Description"
        placeholder="Enter description"
        formControlId="portfolioDescription"
        formValue={form.portfolioDescription}
        formData={form}
        setFormControlState={setForm}
        error={error}
        errorText="Please enter a description"
      />
      {/* <PortfolioDate
        label="Portfolio inception date"
        formControlId="portfolioDate"
        formValue={form.portfolioDate}
        formData={form}
        setFormControlState={setForm}
        error={error}
        errorText="Please enter a date"
      /> */}
      <PortfolioCapital
        label="Portfolio Capital"
        formControlId="portfolioCapital"
        formValue={form.portfolioCapital}
        formData={form}
        setFormControlState={setForm}
        error={error}
        errorText="Please enter a starting capital"
      />

      {stocks.map((obj) => {
        return (
          <Paper sx={{ width: "60%", margin: "auto" }} key={obj.ticker}>
            <MenuList>
              <MenuItem>
                <Grid container alignItems="center" spacing={2}>
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
            </MenuList>
          </Paper>
        );
      })}
    </>
  );
};

export default Testing;
