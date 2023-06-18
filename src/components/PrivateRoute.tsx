import { Navigate } from "react-router-dom";
import { useGetUserQuery } from "redux/Auth/operations";
import { useSelector } from "react-redux";
import React from "react";
import { RootState } from "redux/store";

interface IProps {
  component: React.ReactNode;
  redirectTo: string;
}

export const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  redirectTo = "/",
}): React.ReactElement => {
  const { isLoading } = useGetUserQuery();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const shouldRedirect = !isLoggedIn && !isLoading;

  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : Component}</>;
};
