import {
  StyledHeader,
  StyledContent,
  StyledFooter,
  Link,
  Nav,
  Auth,
  ButtonLink,
  Username,
} from './SharedLayout.styled';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import { useLogoutMutation } from 'redux/Auth/operations';
export const SharedLayout = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.user.name);
  const [Logout, { isUninitialized, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    if (!isUninitialized && isError) {
      toast.error('Fail');
    }
  }, [isError, isUninitialized]);

  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      toast.success('Success');
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
              <Username>{username}</Username>
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
        <Outlet />
      </StyledContent>
      <StyledFooter>Footer</StyledFooter>
    </>
  );
};
