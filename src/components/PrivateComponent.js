/** @format */

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateComponent = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("users");
  return auth ? <Outlet /> : navigate("/signup");
};

export default PrivateComponent;
