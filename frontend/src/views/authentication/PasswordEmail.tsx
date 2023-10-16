import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import { Email } from "@mui/icons-material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router";
import LoginInput from "../../components/formComponents/controlled/LoginInput";
import validator from "validator";
import { useState,useEffect } from "react";
import { useStores } from "../../stores";

export const PasswordEmail = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const AppStore = useStores();
  const [error, setError] = useState(false);
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#1976d2",
  //     },
  //   },
  // });

  const submitFunction = () => {
    // console.log("clicked");
    if (!validator.isEmail(form.email) || form.password === "") {
      setError(true);
      return;
    }

    AppStore.setEmail(form.email);
    console.log("submit clicked");
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(AppStore.getEmail());
  }, [AppStore.email]);

  return (
    <>
      <NoUserNavBar />
      <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Card sx={{ borderRadius: "5%", padding: 3 }}>
              <CardContent>
                <Stack
                  direction="column"
                  alignItems="center"
                  spacing={2}
                  useFlexGap
                >
                  <Email sx={{ fontSize: 250 }} />

                  <Typography variant="h3" sx={{ fontWeight: "600" }}>
                    Key in your email to reset your password
                  </Typography>
                  <LoginInput
                    label="Email"
                    placeholder="Enter your email address"
                    formControlId="email"
                    formValue={form.email}
                    formData={form}
                    setFormControlState={setForm}
                    error={error}
                    errorText="Email is required"
                  />

                  <PrimaryButton
                    buttonText="Submit"
                    onClick={submitFunction}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PasswordEmail;
