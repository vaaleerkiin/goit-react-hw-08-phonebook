import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import React from "react";

export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactNode;
  redirectTo: string;
}): React.ReactElement => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <>{isLoggedIn ? <Navigate to={redirectTo} /> : Component}</>;
};
