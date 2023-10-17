import {
  Container,
  Grid,
  Paper,
  Typography,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import { Email } from "@mui/icons-material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useLocation, useNavigate } from "react-router";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "";
  return (
    <>
      {/* <NoUserNavBar /> */}
      <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
        {/* <Paper
          sx={{
            margin: "auto",
            marginTop: "70px",
            width: { sm: "100%", md: "40%" },
            borderRadius: "45px",
          }}
          elevation={4}
        > */}

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
                    You are almost there!
                  </Typography>
                  <Typography>We sent an email to </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "#054be3", fontWeight: "600" }}
                  >
                    {email}
                  </Typography>
                  <Typography>
                    Just click on the link in that email to complete your
                    registration
                  </Typography>

                  <PrimaryButton
                    buttonText="Back to Login"
                    onClick={() => navigate("/login")}
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

export default EmailVerification;
