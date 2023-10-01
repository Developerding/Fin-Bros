import { Routes, Route } from "react-router-dom";
import * as LINKS from "./links.ts";
import Rapie from "../components/sample/Rapie";
import Home from "../views/Home.tsx";
import Testing from "../views/Testing.tsx";
import Login from "../views/authentication/Login.tsx";
import Register from "../views/authentication/Register.tsx";

const Screens = () => {
  return (
    <Routes>
      <Route path={LINKS.HOME_PAGE} element={<Home />} />
      <Route path={LINKS.RAPIE_PAGE} element={<Rapie />} />
      <Route path={LINKS.TESTING} element={<Testing />} />
      <Route path={LINKS.LOGIN} element={<Login />} />
      <Route path={LINKS.REGISTER} element={<Register />} />
    </Routes>
  );
};

export default Screens;
