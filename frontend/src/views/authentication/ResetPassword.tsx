import {
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import PasswordInput from "../../components/formComponents/controlled/PasswordInput";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
  });

  const [error, setError] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  const submitFunction = () => {
    if (form.password === "") {
      setError(true);
      return;
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    console.log(error);
  }, [error]);


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
                  Reset your password
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ marginTop: "40px" }}>
              <Grid item xs={12}>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your new password"
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
                <PrimaryButton buttonText="Reset Password" onClick={submitFunction} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ResetPassword;
