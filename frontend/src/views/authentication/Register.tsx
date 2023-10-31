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
import { useStores } from "../../stores";
import { useNavigate } from "react-router";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const AppStore = useStores();
  const [error, setError] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitFunction = () => {
    setIsLoading(true);
    console.log("clicked");
    if (
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      setError(true);
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setCreateError(true);
      setErrorMessage("Passwords do not match. Please re enter password");
      setIsLoading(false);
      return;
    }
    if (form.password.length < 5) {
      setCreateError(true);
      setErrorMessage("Password must be at least 5 characters long");
      setIsLoading(false);
      return;
    }
    if (!(/[a-zA-Z]/.test(form.password) && /\d/.test(form.password))) {
      setCreateError(true);
      setErrorMessage("Password must contain at least 1 letter and 1 number");
      setIsLoading(false);
      return;
    }
    AppStore.registerController(form.email, form.password).then((res: any) => {
      console.log(res);

      // success case:
      if (res?.status == 200) {
        setCreateError(false);
        setErrorMessage("");
        console.log(res);
        // logging the status
        const d = new Date();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const hour = d.getHours();
        const second = d.getSeconds();
        const formattedDate = `${month}/${day}/${year}`;
        const formattedTime = `${hour}:${second}`;
        const logData = {
          message: `${AppStore.getUserId()} registered for an account at ${formattedDate} ${formattedTime}`,
        };

        AppStore.createLogController(logData);
        navigate(LINKS.EMAILVERIFICATION, { state: { email: form.email } });
      }
      // email already exist or other errors
      else {
        setCreateError(true);
        setErrorMessage(
          "Error creating new user. Please try again or use a different email"
        );
        setIsLoading(false);
        return;
      }
    });
  };

  const theme = createTheme({
    // palette: {
    //   primary: {
    //     main: "#1976d2", // This is MUI's default primary color
    //     // You can add light, dark, contrastText, etc. if required.
    //   },
    // },
    // components: {
    //   MuiTypography: {
    //     defaultProps: {
    //       variantMapping: {
    //         h1: "h2",
    //         h2: "h3",
    //       },
    //     },
    //   },
    // },
  });

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      {/* <NoUserNavBar /> */}
      <Container maxWidth="xl" sx={{ width: "100%" }}>
        {createError && (
          <Alert severity="error" sx={{ marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Paper
          sx={{
            margin: "auto",
            marginTop: "70px",
            width: { sm: "100%", md: "40%" },
            borderRadius: "45px",
          }}
          elevation={4}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography
                variant="h2"
                sx={{
                  marginTop: "24px",
                  fontWeight: "500",
                }}
              >
                Register
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "40px" }}>
            <Grid item xs={12}>
              <LoginInput
                label="Email"
                placeholder="Enter your email address"
                formControlId="email"
                formValue={form.email || ""}
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
                formValue={form.password || ""}
                formData={form}
                setFormControlState={setForm}
                error={error}
                errorText="Password is required"
              />
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: "16px" }}>
            <Grid item xs={12}>
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter your password again"
                formControlId="confirmPassword"
                formValue={form.confirmPassword || ""}
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
                buttonText="Register"
                onClick={submitFunction}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              marginTop: "40px",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link
                to={LINKS.LOGIN}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography>
                  Don't have an account? Click here to{" "}
                  <span style={{ color: "#054be3" }}>login</span>
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

export default Register;
