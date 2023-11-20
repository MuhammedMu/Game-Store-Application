import React from "react";
import { Outlet } from "react-router";
import { useContextGlobally } from "./StateProvider";
import Collector from "./Collector";

function ProtectedRoute() {
  const { isLoggedIn } = useContextGlobally();

  return isLoggedIn ? <Outlet /> : <Collector />;
}

export default ProtectedRoute;
