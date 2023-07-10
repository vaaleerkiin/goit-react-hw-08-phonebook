import { Layout } from "antd";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
const { Header, Footer, Content } = Layout;

export const StyledHeader = styled(Header)`
  background-color: #001529;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 64px;
  gap: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const StyledContent = styled(Content)`
  background-color: #e3e3e3;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 16px;
  padding-top: 80px;
  min-height: calc(100vh - 152px);
`;

export const StyledFooter = styled(Footer)`
  height: 88px;
  background-color: #001529;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 6px;
`;

export const Link = styled(NavLink)`
  color: currentColor;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  &:hover,
  &.active {
    color: #1677ff;
  }
  @media screen and (max-width: 375px) {
    display: none;
  }
`;

export const ButtonLink = styled(NavLink)`
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  font-size: 16px;
  height: 32px;
  padding: 4px 15px;
  border-radius: 6px;
  color: currentColor;
  text-decoration: none;
  display: flex;
  max-height: 32px;
  justify-content: center;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  :hover {
    color: #fff;
    background-color: #4096ff;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const Auth = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const Username = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: white;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
