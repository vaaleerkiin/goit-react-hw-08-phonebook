import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from 'redux/Auth/operations';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoading } = useGetUserQuery();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const shouldRedirect = !isLoggedIn && !isLoading;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
