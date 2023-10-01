import { CssBaseline, ThemeProvider } from "@mui/material";
import Screens from "./routes/Screens";
import theme from "./theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Screens />
      </ThemeProvider>
    </>
  );
}

export default App;
