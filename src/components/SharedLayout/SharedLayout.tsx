import {
  StyledHeader,
  StyledContent,
  StyledFooter,
  Link,
  Nav,
  Auth,
  ButtonLink,
  Username,
} from "./SharedLayout.styled";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useLogoutMutation } from "redux/Auth/operations";
import { DocsModal } from "components/DocsModal/DocsModal";
import MoonLoader from "react-spinners/MoonLoader";
import { RootState } from "redux/store";

export const SharedLayout = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.auth.user.email);
  const [Logout, { isUninitialized, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error("Fail");
    }
  }, [isError, isUninitialized]);

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      toast.success("Success");
    }
  }, [isSuccess, isUninitialized]);

  return (
    <>
      <StyledHeader>
        <Nav>
          <Link to="/contacts">Contacts</Link>
        </Nav>
        <Auth>
          {isLoggedIn ? (
            <>
              <Username>{email}</Username>
              <Button type="primary" size="large" onClick={Logout}>
                LogOut
              </Button>
            </>
          ) : (
            <>
              <ButtonLink to="/login">LogIn</ButtonLink>
              <ButtonLink to="/register">Register</ButtonLink>
            </>
          )}
        </Auth>
      </StyledHeader>
      <StyledContent>
        <Suspense fallback={<MoonLoader size={50} color=" #1677ff" />}>
          <Outlet />
        </Suspense>
      </StyledContent>
      <StyledFooter>
        <DocsModal />
      </StyledFooter>
    </>
  );
};
