import { CssBaseline, ThemeProvider } from "@mui/material";
import Screens from "./routes/Screens";
import theme from "./theme/theme";
import { useStores } from "./stores";
import NavBar from "./components/NavBar/NavBar";
import NoUserNavBar from "./components/NavBar/NoUserNavBar";

function App() {
  const AppStore = useStores();
  const isLoggedIn = AppStore.getIsLoggedIn();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoggedIn ? <NavBar /> : <NoUserNavBar />}
        <Screens />
      </ThemeProvider>
    </>
  );
}

export default App;
