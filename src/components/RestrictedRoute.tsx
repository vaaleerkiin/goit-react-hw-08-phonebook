import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import React from "react";

interface IProps {
  component: React.ReactNode;
  redirectTo: string;
}

export const RestrictedRoute: React.FC<IProps> = ({
  component: Component,
  redirectTo = "/",
}): React.ReactElement => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <>{isLoggedIn ? <Navigate to={redirectTo} /> : Component}</>;
};
