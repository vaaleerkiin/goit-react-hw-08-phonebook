import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "redux/Auth/operations";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "redux/store";

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: React.ReactNode;
  redirectTo: string;
}): React.ReactElement => {
  const { isLoading } = useGetUserQuery(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const shouldRedirect = !isLoggedIn && !isLoading;

  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : Component}</>;
};
