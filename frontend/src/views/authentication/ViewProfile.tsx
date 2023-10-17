import {
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import NoUserNavBar from "../../components/NavBar/NoUserNavBar";
import { Email } from "@mui/icons-material";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useLocation, useNavigate } from "react-router";
import * as LINKS from "../../routes/links";
import { useStores } from "../../stores";
import { useEffect, useState } from "react";

export const ViewProfile = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(AppStore.getEmail());
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (email: string) => {
    setIsLoading(true);
    console.log(email);
    AppStore.resetPasswordController(email).then((res) => {
      setIsLoading(false);
      AppStore.logout();
      navigate(LINKS.CHANGE_PASSWORD);
    });
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: "4%" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Card sx={{ borderRadius: "5%", padding: 3 }}>
              <CardContent>
                <Grid item>
                  <Typography
                    textAlign={"center"}
                    variant="h2"
                    sx={{ marginBottom: "24px", fontWeight: "500" }}
                  >
                    View Profile
                  </Typography>
                </Grid>

                <Typography component="div" sx={{ fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>User ID:</Box>
                  {AppStore.getUserId()}
                </Typography>
                <Divider />
                <Typography component="div" sx={{ mt: 3, fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>Email:</Box>
                  {AppStore.getEmail()}
                </Typography>
                <Divider />
                <Typography component="div" sx={{ mt: 3, fontSize: "20px" }}>
                  <Box sx={{ fontWeight: 700 }}>Password:</Box>
                  <PrimaryButton
                    style={{ marginLeft: 0 }}
                    buttonText="Change Password"
                    onClick={() => handleClick(email)}
                    isLoading={isLoading}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewProfile;
