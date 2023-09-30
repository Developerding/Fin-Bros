import { Routes, Route } from "react-router-dom";
import * as LINKS from "./links.ts";
import Rapie from "../components/sample/Rapie";
import Home from "../views/Home.tsx";
import NavBar from "../components/NavBar/NavBar";
import CreatePortfolio from '../views/CreatePortfolio.tsx'

const Screens = () => {
  return (
    <Routes>
      <Route path={LINKS.HOME_PAGE} element={<Home />} />
      <Route path={LINKS.RAPIE_PAGE} element={<Rapie />} />
      <Route path={LINKS.TESTING} element={<NavBar />} />
      <Route path={LINKS.CREATE_PORTFOLIO} element={<CreatePortfolio />}></Route>
    </Routes>
  );
};

export default Screens;
