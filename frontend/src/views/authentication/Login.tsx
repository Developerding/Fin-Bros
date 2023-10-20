import {
  Alert,
  AlertTitle,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import LoginInput from "../../components/formComponents/controlled/LoginInput";
import PasswordInput from "../../components/formComponents/controlled/PasswordInput";
import Link from "../../components/link/Link";
import * as LINKS from "./../../routes/links";
import validator from "validator";
import { useStores } from "../../stores";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const AppStore = useStores();
  const [error, setError] = useState(false);

  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#1976d2",
  //     },
  //   },
  // });

  const submitFunction = () => {
    // console.log("clicked");
    setIsLoading(true);
    if (!validator.isEmail(form.email) || form.password === "") {
      setError(true);
      setIsLoading(false);
      return;
    }

    AppStore.loginController(form.email, form.password)
      .then((res: any) => {
        console.log(res);
        // Email does not exist
        if (res?.response?.status == 500) {
          setLoginError(true);
          setErrorMessage("Email " + form.email + " does not exist");
          setIsLoading(false);
        }

        // Wrong password
        else if (res?.response?.status == 409) {
          setLoginError(true);
          setErrorMessage(res.response.data);
          setIsLoading(false);
        }

        // Email not verified yet
        else if (res?.response?.status == 400) {
          setLoginError(true);
          setErrorMessage(res.response.data);
          setIsLoading(false);
        } else if (res?.response?.status == 404) {
          setLoginError(true);
          setErrorMessage("Login Error");
          setIsLoading(false);
        }

        // Login successful:
        else {
          setLoginError(false);
          setErrorMessage("");
          console.log(res);
          AppStore.setEmail(res.email);
          AppStore.setUserId(res.localId);
          AppStore.setIsLoggedIn(true);

          setIsLoading(false);

          window.location.href = LINKS.HOME_PAGE;
        }
      })

      .catch((err) => {
        console.log(err);
      });
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
      {/* <ThemeProvider theme={theme}> */}
      {/* <NoUserNavBar /> */}
      <Container maxWidth="xl" sx={{ width: "100%" }}>
        {loginError && (
          <Alert severity="error" sx={{ marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Paper
          sx={{
            margin: "auto",
            marginTop: "100px",
            width: { sm: "100%", md: "40%" },
            borderRadius: "45px",
          }}
          elevation={4}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography
                variant="h2"
                sx={{ marginTop: "24px", fontWeight: "500" }}
              >
                Login
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "40px" }}>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "16px" }}>
            <Grid item xs={12}>
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                formControlId="password"
                formValue={form.password}
                formData={form}
                setFormControlState={setForm}
                error={error}
                errorText="Password is required"
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              marginTop: "6px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <PrimaryButton
                buttonText="Login"
                onClick={submitFunction}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Link
                to={LINKS.PASSWORDEMAIL}
                style={{ textDecoration: "none", color: "#054be3" }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    marginTop: "30px",
                    // marginRight: "16px",
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              marginTop: "6px",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Grid>

          <Grid
            container
            sx={{
              marginTop: "10px",

              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link
                to={LINKS.REGISTER}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography>
                  Don't have an account? Click here to{" "}
                  <span style={{ color: "#054be3" }}>register</span>
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container />
        </Paper>
      </Container>
      {/* </ThemeProvider> */}
    </>
  );
};

export default Login;
