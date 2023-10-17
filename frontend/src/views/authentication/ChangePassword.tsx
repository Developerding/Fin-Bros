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
import { useLocation, useNavigate } from "react-router";
import * as LINKS from "../../routes/links";
import { useStores } from "../../stores";
import { useState } from "react";

export const ChangePassword = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const email = AppStore.getEmail() || "";
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = () => {
    setIsLoading(true);
    console.log("clicked");
    AppStore.logout();
    setIsLoading(false);
    window.location.href = LINKS.HOME_PAGE;
  };

  return (
    <>
      {/* <NoUserNavBar /> */}
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
                  {/* 
                    <Typography
                      variant="h3"
                      sx={{ color: "#054be3", fontWeight: "600" }}
                    >
                      
                    </Typography> */}
                  <Typography>We sent password reset email to </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "#054be3", fontWeight: "600" }}
                  >
                    {email}
                  </Typography>
                  <Typography>
                    Simply follow the steps within the email to reset your
                    password.
                  </Typography>

                  <PrimaryButton
                    buttonText="Logout"
                    onClick={handleLogOut}
                    isLoading={isLoading}
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

export default ChangePassword;
