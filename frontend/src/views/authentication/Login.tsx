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
import validator from "validator";
import { useStores } from "../../stores";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const AppStore = useStores();
  const [error, setError] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", // This is MUI's default primary color
        // You can add light, dark, contrastText, etc. if required.
      },
    },
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

  const submitFunction = () => {
    console.log("clicked");
    if (validator.isEmail(form.email) || form.password === "") {
      setError(true);
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  // useEffect(() => {
  //   console.log(AppStore.getEmail());
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NoUserNavBar />
        <Container maxWidth="xl" sx={{ width: "100%" }}>
          <Paper
            sx={{
              margin: "auto",
              marginTop: "100px",
              width: { sm: "100%", md: "40%" },
              borderRadius: "10px",
            }}
            elevation={4}
          >
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xl={12}>
                <Typography
                  variant="h3"
                  sx={{ marginTop: "24px", fontSize: "30px" }}
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

            <Grid container>
              <Grid item xs={12}>
                <Link
                  to={LINKS.HOME_PAGE}
                  style={{ textDecoration: "none", color: "#054be3" }}
                >
                  <Typography
                    sx={{
                      textAlign: "right",
                      marginTop: "10px",
                      marginRight: "16px",
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
            >
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <PrimaryButton buttonText="Login" onClick={submitFunction} />
              </Grid>
            </Grid>

            <Grid
              container
              sx={{
                marginTop: "56px",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
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
      </ThemeProvider>
    </>
  );
};

export default Login;
