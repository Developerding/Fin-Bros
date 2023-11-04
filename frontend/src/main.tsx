import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// import "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap";

import "./main.css";
import { StoreProvider } from "./stores/index.tsx";
import { AppStore, store } from "./stores/AppStore.ts";
import { Store } from "@mui/icons-material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <StoreProvider store={new AppStore()}> */}
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
