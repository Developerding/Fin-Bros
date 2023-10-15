import { Routes, Route } from "react-router-dom";
import * as LINKS from "./links.ts";
import Rapie from "../components/sample/Rapie";
import Home from "../views/Home.tsx";
import CreatePortfolio from "../views/CreatePortfolio.tsx";
import Testing from "../views/Testing.tsx";
import Login from "../views/authentication/Login.tsx";
import Register from "../views/authentication/Register.tsx";
import ViewPortfolios from "../views/ViewPortfolios.tsx";
import EditPortfolio from "../views/EditPortfolio.tsx";
import ViewPortfolioDetails from "../views/ViewPortfolioDetails.tsx";
import ForgotPassword from "../views/authentication/ForgotPassword.tsx";
import ResetPassword from "../views/authentication/ResetPassword.tsx";

const Screens = () => {
  return (
    <Routes>
      <Route path={LINKS.HOME_PAGE} element={<Home />} />
      <Route path={LINKS.RAPIE_PAGE} element={<Rapie />} />
      <Route
        path={LINKS.CREATE_PORTFOLIO}
        element={<CreatePortfolio />}
      ></Route>
      <Route path={LINKS.TESTING} element={<Testing />} />
      <Route path={LINKS.LOGIN} element={<Login />} />
      <Route path={LINKS.REGISTER} element={<Register />} />
      <Route path={LINKS.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={LINKS.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={LINKS.VIEWPORTFOLIOS} element={<ViewPortfolios />} />
      <Route path={LINKS.EDIT_PORTFOLIO} element={<EditPortfolio />} />
      <Route path={LINKS.VIEW_PORTFOLIO_DETAILS} element={<ViewPortfolioDetails />} />
    </Routes>
  );
};

export default Screens;
