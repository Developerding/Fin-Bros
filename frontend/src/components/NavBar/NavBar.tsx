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
import { ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import { useStores } from "../../stores";
import * as LINKS from "../../routes/links";
import { useNavigate } from "react-router";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";

const pages = ["Products", "Pricing", "Blog"];

const NavBar = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
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

  const handleNavigation = () => {
    navigate(LINKS.HOME_PAGE);
  };

  const handleLogOut = () => {
    AppStore.logout();
    window.location.reload();
  };

  const renderMenuType = (menuType: string) => {
    if (menuType === "portfolio") {
      return (
        <Paper style={{ width: "250px", height: "100%" }}>
          <MenuItem
            sx={{ height: "75px" }}
            onClick={() => {
              navigate(LINKS.VIEWPORTFOLIOS);
            }}
          >
            <ListItemIcon>
              <CalendarViewMonthIcon />
            </ListItemIcon>
            <ListItemText>View all portfolios</ListItemText>
          </MenuItem>

          <MenuItem
            sx={{ height: "75px" }}
            onClick={() => {
              navigate(LINKS.CREATE_PORTFOLIO);
            }}
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText>Create portfolio</ListItemText>
          </MenuItem>
        </Paper>
      );
    } else if (menuType === "stocks") {
      return (
        <Paper style={{ width: "250px", height: "100%" }}>
          <MenuItem sx={{ height: "75px" }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>Search Stock</ListItemText>
          </MenuItem>
        </Paper>
      );
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
                "& .MuiDrawer-paperAnchorLeft": {
                  width: "250px",
                },
              }}
            >
              <Typography
                textAlign={"center"}
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Portfolio
              </Typography>
              <MenuItem
                sx={{ height: "75px" }}
                onClick={() => {
                  navigate(LINKS.VIEWPORTFOLIOS);
                  handleCloseNavMenu();
                }}
              >
                <ListItemIcon>
                  <CalendarViewMonthIcon />
                </ListItemIcon>
                <ListItemText>View all portfolios</ListItemText>
              </MenuItem>

              <MenuItem
                sx={{ height: "75px" }}
                onClick={() => {
                  navigate(LINKS.CREATE_PORTFOLIO);
                  handleCloseNavMenu();
                }}
              >
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText>Create portfolio</ListItemText>
              </MenuItem>

              <Typography
                textAlign={"center"}
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  fontSize: "26px",
                }}
              >
                Stocks
              </Typography>

              <MenuItem sx={{ height: "75px" }}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText>Search Stock</ListItemText>
              </MenuItem>
            </Drawer>

            <Box
              sx={{
                // display: { xs: "flex", md: "none" },
                // ml: 3,
                alignItems: "center",
                display: "flex",
              }}
            >
              <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
                <img
                  src="/assets/img/finbros.png"
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
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}
            onClick={handleNavigation}
          >
            <div onClick={handleNavigation} style={{ cursor: "pointer" }}>
              <img
                src="/assets/img/finbros.png"
                style={{ width: "170px", height: "64px" }}
              />
            </div>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              style={{
                height: "67px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => handleOpenMenuDropDown(e, "portfolio")}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
                Portfolio
              </Typography>
            </Box>

            <Box
              style={{
                height: "67px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => handleOpenMenuDropDown(e, "stocks")}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
                Stocks
              </Typography>
            </Box>

            <Menu
              anchorEl={anchorElMenu}
              keepMounted
              open={Boolean(anchorElMenu)}
              onClose={handleCloseMenuDropDown}
              // onMouseLeave={handleCloseMenuDropDown}
              MenuListProps={{
                onMouseLeave: handleCloseMenuDropDown,
              }}
              sx={{
                "& .MuiMenu-list": {
                  padding: "0px",
                },
              }}
            >
              {renderMenuType(menuDropdown)}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
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
                onClick={() => {
                  handleCloseUserMenu();
                  navigate(LINKS.VIEWPROFILE);
                }}
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
