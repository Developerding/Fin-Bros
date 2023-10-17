import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import OutlinedButton from "../buttons/OutlinedButton";
import { Stack } from "@mui/material";
import { useStores } from "../../stores";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = () => {
  const AppStore = useStores();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenMenuDropDown = (
    event: React.MouseEvent<HTMLElement>,
    menuType: string
  ) => {
    setMenuDropdown(menuType);
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseMenuDropDown = () => {
    setAnchorElMenu(null);
  };

  const [menuDropdown, setMenuDropdown] = React.useState("");

  const handleLogOut = () => {
    AppStore.logout();
    window.location.reload();
  };

  const renderMenuType = (menuType: string) => {
    if (menuType === "portfolio") {
      return (
        <div>
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
        </div>
      );
    } else if (menuType === "stock") {
      return;
      <div>
        <MenuItem>Option 3</MenuItem>
        <MenuItem>Option 4</MenuItem>
      </div>;
    }
  };

  return (
    <AppBar
      position="static"
      style={{ width: "100%", backgroundColor: "#054be3" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* for hamburger menu */}

          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                width: "calc(100%/3)",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                // onMouseEnter={handleOpenNavMenu}
                // onMouseLeave={handleCloseNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="left"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Drawer>

            <Box
              sx={{
                // display: { xs: "flex", md: "none" },
                // ml: 3,
                alignItems: "center",
                display: "flex",
              }}
            >
              <img
                src="src/assets/img/finbros.png"
                style={{ width: "200px", height: "64px" }}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                width: "calc(100%/3)",
              }}
            ></Box>
          </Box>

          {/* Below is for fullwidth navbar */}

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          {/* logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}>
            <img
              src="src/assets/img/finbros.png"
              style={{ width: "170px", height: "64px" }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              // <div
              //   onMouseEnter={(e) => handleOpenMenuDropDown(e, "portfolio")}

              //   onMouseLeave={() => handleCloseMenuDropDown()}
              // >
              <Button
                key={page}
                onMouseEnter={(e) => handleOpenMenuDropDown(e, "portfolio")}
                // onMouseLeave={handleCloseMenuDropDown}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
              // </div>
            ))}

            <Menu
              anchorEl={anchorElMenu}
              keepMounted
              open={Boolean(anchorElMenu)}
              onClose={handleCloseMenuDropDown}
              // onMouseLeave={handleCloseMenuDropDown}
              MenuListProps={{
                onMouseLeave: handleCloseMenuDropDown,
              }}
            >
              {renderMenuType(menuDropdown)}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onMouseEnter={handleOpenUserMenu}
                // onClick={handleOpenUserMenu}
                // onMouseLeave={handleCloseUserMenu}
                sx={{ p: 0 }}
              >
                <AccountCircleIcon
                  style={{ height: "40px", width: "40px", color: "white" }}
                />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", width: "1000px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              MenuListProps={{
                onMouseLeave: handleCloseUserMenu,
              }}
              // onMouseLeave={handleCloseUserMenu}
            >
              <MenuItem
                key={"view_profile"}
                onClick={handleCloseUserMenu}
                sx={{ width: "250px" }}
              >
                <Box display="flex" alignItems="center">
                  <AccountCircleOutlinedIcon
                    sx={{ display: "inline", width: "35px", height: "35px" }}
                  />
                  <Typography
                    sx={{ display: "inline", ml: 3, fontSize: "16px" }}
                  >
                    View Profile
                  </Typography>
                </Box>
              </MenuItem>
              <Stack alignItems="center">
                <OutlinedButton buttonText="Logout" onClick={handleLogOut} />
              </Stack>
              {/* <Box
                sx={{
                  marginTop: "20px",

                  justifyContent: "center",
                }}
              >
                <OutlinedButton
                  buttonText="Logout"
                  onClick={() => handleLogOut}
                />
              </Box> */}
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
