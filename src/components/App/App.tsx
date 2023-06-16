import { Navigate, Route, Routes } from "react-router-dom";
import { SharedLayout } from "components/SharedLayout/SharedLayout";
import { useGetUserQuery } from "redux/Auth/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoonLoader from "react-spinners/MoonLoader";
import { PrivateRoute } from "components/PrivateRoute";
import { RestrictedRoute } from "components/RestrictedRoute";
import { lazy } from "react";
const Phonebook = lazy(() => import("pages/Phonebook"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

export const App: React.FC = () => {
  const { isLoading } = useGetUserQuery(null);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "#001529",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoonLoader size={50} color=" #1677ff" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Navigate to="contacts" />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute component={<Phonebook />} redirectTo="/login" />
              }
            ></Route>
            <Route
              path="login"
              element={
                <RestrictedRoute component={<Login />} redirectTo="/contacts" />
              }
            ></Route>
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={<Register />}
                  redirectTo="/contacts"
                />
              }
            ></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </>
  );
};
