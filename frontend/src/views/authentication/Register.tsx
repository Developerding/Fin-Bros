import {
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

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  const submitFunction = () => {
    console.log("clicked");
    if (
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      setError(true);
    }
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
        <NoUserNavBar />
        <Container maxWidth="xl" sx={{ width: "100%" }}>
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
                  sx={{ marginTop: "24px", fontWeight:"500" }}
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
                <PrimaryButton buttonText="Register" onClick={submitFunction} />
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
