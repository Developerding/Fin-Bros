import { Routes, Route } from "react-router-dom";
import * as LINKS from "./links.ts";
import Rapie from "../components/sample/Rapie";
import Home from "../views/Home.jsx";
// import CreatePortfolio from "../views/CreatePortfolio.tsx";  this is the old UI
import Testing from "../views/Testing.tsx";
import Login from "../views/authentication/Login.tsx";
import Register from "../views/authentication/Register.tsx";
import ViewPortfolios from "../views/ViewPortfolios.tsx";
import EditPortfolio from "../views/EditPortfolio.tsx";
import ViewPortfolioDetails from "../views/ViewPortfolioDetails.tsx";
import EmailVerification from "../views/authentication/EmailVerification.tsx";
import PasswordReset from "../views/authentication/PasswordReset.tsx";
import PasswordEmail from "../views/authentication/PasswordEmail.tsx";
import ViewProfile from "../views/authentication/ViewProfile.tsx";
import ChangePassword from "../views/authentication/ChangePassword.tsx";
import CreatePortfolio from "../views/CreatePortfolio.tsx";
import IndivStock from "../views/IndivStock.tsx";

const Screens = () => {
  return (
    <Routes>
      <Route path={LINKS.HOME_PAGE} element={<Home />} />
      <Route path={LINKS.RAPIE_PAGE} element={<Rapie />} />
      {/* <Route
        path={LINKS.CREATE_PORTFOLIO}
        element={<CreatePortfolio />}
      ></Route> */}
      <Route path={LINKS.TESTING} element={<Testing />} />
      <Route path={LINKS.LOGIN} element={<Login />} />
      <Route path={LINKS.REGISTER} element={<Register />} />
      <Route path={LINKS.VIEWPORTFOLIOS} element={<ViewPortfolios />} />
      <Route path={LINKS.EDIT_PORTFOLIO} element={<EditPortfolio />} />
      <Route
        path={LINKS.VIEW_PORTFOLIO_DETAILS}
        element={<ViewPortfolioDetails />}
      />
      <Route path={LINKS.EMAILVERIFICATION} element={<EmailVerification />} />
      <Route path={LINKS.PASSWORDRESET} element={<PasswordReset />} />
      <Route path={LINKS.PASSWORDEMAIL} element={<PasswordEmail />} />
      <Route path={LINKS.VIEWPROFILE} element={<ViewProfile />} />
      <Route path={LINKS.CHANGE_PASSWORD} element={<ChangePassword />} />
      <Route path={LINKS.CREATE_PORTFOLIO} element={<CreatePortfolio />} />
      <Route path={LINKS.INDIV_STOCK} element={<IndivStock />} />
    </Routes>
  );
};

export default Screens;
