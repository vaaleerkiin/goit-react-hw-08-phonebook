import styled from '@emotion/styled';
import { Form } from 'formik';

export const PhonebookWrap = styled.div`
  border: solid ${props => props.theme.colors.black} 1px;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
  }

  h2 {
    font-size: 32px;
    margin-left: auto;
    margin-right: auto;
  }
  ul {
    padding: 0;
    padding-left: 32px;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    li {
      font-size: 32px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      gap: 16px;
      align-items: center;
    }
  }
  p {
    padding: 0;

    margin: 0;

    font-size: 20px;
    font-weight: 500;
  }
`;

export const Forms = styled(Form)`
  border: solid ${props => props.theme.colors.black} 1px;

  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  overflow: hidden;
  label {
    font-size: 24px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  button {
    border: solid ${props => props.theme.colors.black} 1px;
    background-color: ${props => props.theme.colors.white};
    border-radius: 5px;
    overflow: hidden;
    padding: 8px;

    :active {
      background-color: ${props => props.theme.colors.bgColor};
    }
  }
  input {
    font-size: 24px;
    width: 400px;
    height: 32px;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  span {
    font-size: 20px;
    font-weight: 500;
  }
`;
export const FormsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input::placeholder {
    color: black;
  }
`;
