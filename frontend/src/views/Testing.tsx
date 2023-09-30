import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ControlledTextInput from "../components/formComponents/controlled/ControlledTextInput";
import { Button } from "@mui/material";

const Testing = () => {
  const [form, setForm] = useState({
    name: "",
  });

  const [error, setError] = useState(false);
  const submitEvent = () => {
    if (form.name == "") {
      setError(true);
    }
  };
  return (
    <>
      <NavBar />
      <ControlledTextInput
        label="Name"
        placeholder="Enter Name"
        formControlId="name"
        formValue={form.name}
        setFormControlState={setForm}
        error={error}
        errorText="Name is required"
      />
    </>
  );
};

export default Testing;
