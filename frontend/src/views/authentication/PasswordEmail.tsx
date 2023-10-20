import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Alert,
  AlertTitle,
} from "@mui/material";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import { Email } from "@mui/icons-material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useNavigate } from "react-router";
import LoginInput from "../../components/formComponents/controlled/LoginInput";
import validator from "validator";
import { useState, useEffect } from "react";
import { useStores } from "../../stores";
import * as LINKS from "../../routes/links";

export const PasswordEmail = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const AppStore = useStores();
  const [error, setError] = useState(false);

  const submitFunction = () => {
    setIsLoading(true);
    if (!validator.isEmail(form.email)) {
      setError(true);
      setIsLoading(false);
      return;
    }
    AppStore.resetPasswordController(form.email).then((res: any) => {
      console.log(res);
      setIsLoading(false);

      //success case:
      if (res?.status == 200) {
        console.log(res);
        const email = form.email;
        navigate(LINKS.PASSWORDRESET, { state: { email: email } });
      }

      // error handling:
      else {
        setSubmitError(true);
        setErrorMessage("Error generating email link to change password");
        return;
      }
    });
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <>
      {/* <NoUserNavBar /> */}
      <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
        {submitError && (
          <Alert severity="error" sx={{ marginTop: "20px" }}>
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 3 }}
        >
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
                    isLoading={isLoading}
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
