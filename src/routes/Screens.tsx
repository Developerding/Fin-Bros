import { Routes, Route } from "react-router-dom";
import * as LINKS from "./links.ts";
import Rapie from "../components/sample/Rapie";
import Home from "../components/homepage/Home.tsx";

const Screens = () => {
  return (
    <Routes>
      <Route path={LINKS.HOME_PAGE} element={<Home />} />
      <Route path={LINKS.RAPIE_PAGE} element={<Rapie />} />
    </Routes>
  );
};

export default Screens;
