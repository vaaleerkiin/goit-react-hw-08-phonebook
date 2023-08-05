import {
  StyledHeader,
  StyledContent,
  StyledFooter,
  Link,
  Nav,
  Auth,
  ButtonLink,
  Username,
  UserAvatar,
  ButtonAvatar,
} from "./SharedLayout.styled";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useLogoutMutation } from "redux/Auth/operations";

import MoonLoader from "react-spinners/MoonLoader";
import { RootState } from "redux/store";
import { PhonebookAvatar } from "components/Phonebook/PhonebookAvatar";
const defaultAvatar =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E";
interface IProps {
  refetch: () => void;
}

export const SharedLayout: React.FC<IProps> = ({ refetch }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email, avatarURL } = useSelector(
    (state: RootState) => state.auth.user
  );
  const [Logout, { isUninitialized, isSuccess, isError }] = useLogoutMutation();

  const toogleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

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
              {avatarURL && (
                <ButtonAvatar onClick={toogleModal}>
                  <UserAvatar
                    src={
                      avatarURL === defaultAvatar
                        ? defaultAvatar
                        : `https://phonebook-0e5s.onrender.com/${avatarURL}`
                    }
                  />
                </ButtonAvatar>
              )}
              <Button type="primary" size="large" onClick={() => Logout()}>
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
        <PhonebookAvatar
          open={isModalOpen}
          toogleModal={toogleModal}
          refetch={refetch}
        />
      </StyledHeader>
      <StyledContent>
        <Suspense fallback={<MoonLoader size={50} color=" #1677ff" />}>
          <Outlet />
        </Suspense>
      </StyledContent>
      <StyledFooter>
        <a
          href="https://github.com/vaaleerkiin/goit-react-hw-08-phonebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/vaaleerkiin/goit-react-hw-08-phonebook
        </a>
      </StyledFooter>
    </>
  );
};
