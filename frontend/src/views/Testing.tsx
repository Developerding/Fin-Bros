import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ControlledTextInput from "../components/formComponents/controlled/ControlledTextInput";
import { Button, Stack } from "@mui/material";
import ControlledSelectInput from "../components/formComponents/controlled/ControlledSelectInput";
import PrimaryButton from "../components/buttons/PrimaryButton";
import OutlinedButton from "../components/buttons/OutlinedButton";
import NoUserNavBar from "../components/NavBar/NoUserNavBar";
import axios from "axios";
import { useStores } from "../stores";

const Testing = () => {
  const [form, setForm] = useState({
    name: "",
  });

  const [error, setError] = useState(false);
  const AppStore = useStores();
  const submitEvent = () => {
    AppStore.loginController("ryan.poy.2021@scis.smu.edu.sg", "password123")
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <>
      <NavBar />
      <NoUserNavBar />
      <ControlledTextInput
        label="Name"
        placeholder="Enter Name"
        formControlId="name"
        formValue={form.name}
        setFormControlState={setForm}
        error={error}
        errorText="Name is required"
      />

      {/* <ControlledSelectInput
        label="Label"
        placeholder="Enter Name"
        formControlId="name"
        formValue={form.name}
        setFormControlState={setForm}
        error={error}
        errorText="Name is required"
        options={["1", "2", "3"]}
      /> */}

      <Stack gap={1} direction="row">
        <PrimaryButton
          buttonText="Reset password"
          onClick={() => submitEvent()}
        />
        <OutlinedButton buttonText="Cancel" />
        <OutlinedButton buttonText="Login/Register" />
      </Stack>
    </>
  );
};

export default Testing;
