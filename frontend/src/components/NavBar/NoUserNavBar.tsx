import { AppBar, Box, Container, Toolbar } from "@mui/material";
import React from "react";
import OutlinedButton from "../buttons/OutlinedButton";
import { useNavigate } from "react-router";
import * as LINKS from "../../routes/links";

const NoUserNavBar = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(LINKS.HOME_PAGE);
  };
  return (
    <AppBar
      position="static"
      sx={{ width: "100%", backgroundColor: "#054be3" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                width: "calc(100%/3)",
              }}
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
                <img
                  src="src/assets/img/finbros.png"
                  style={{ width: "200px", height: "64px" }}
                />
              </div>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                width: "calc(100%/3)",
              }}
            >
              <OutlinedButton
                buttonText="Login"
                style={{
                  width: { xs: "100%", md: "158px" },
                  //   maxWidth: "120px",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                  color: "white",
                  borderColor: "white",
                }}
                onClick={() => navigate(LINKS.LOGIN)}
              />
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
                <img
                  src="src/assets/img/finbros.png"
                  style={{
                    width: "170px",
                    height: "64px",
                  }}
                />
              </div>
            </Box>
            <OutlinedButton
              buttonText="Login"
              style={{ borderColor: "white", color: "white" }}
              onClick={() => navigate(LINKS.LOGIN)}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NoUserNavBar;
