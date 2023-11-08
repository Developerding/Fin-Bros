import React, { useEffect } from "react";
import { useStores } from "../stores";
import { useNavigate } from "react-router";
import * as LINKS from "../routes/links";

export const Auth = () => {
  const AppStore = useStores();
  const navigate = useNavigate();
  useEffect(() => {
    if (!AppStore.getIsLoggedIn()) {
      navigate(LINKS.HOME_PAGE);
      return;
    }
  }, []);
  return null;
};
