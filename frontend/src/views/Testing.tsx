import { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ControlledTextInput from "../components/formComponents/controlled/ControlledTextInput";
import { Button, Stack } from "@mui/material";
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

const Testing = () => {
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

      <PortfolioStock currentPercentage={2} stockName="testing" />
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
      <PortfolioDate
        label="Portfolio inception date"
        formControlId="portfolioDate"
        formValue={form.portfolioDate}
        formData={form}
        setFormControlState={setForm}
        error={error}
        errorText="Please enter a date"
      />
    </>
  );
};

export default Testing;
