import styled from '@emotion/styled';
import { Form } from 'formik';

export const PhonebookWrap = styled.div`
  border: dashed ${props => props.theme.colors.black} 1px;
  width: 700px;

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
  button {
    border: solid ${props => props.theme.colors.black} 1px;
    background-color: ${props => props.theme.colors.white};
    border-radius: 8px;
    overflow: hidden;
    padding: 8px;

    :active {
      background-color: ${props => props.theme.colors.bgColor};
    }
  }
  h2 {
    font-size: 32px;
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
    font-size: 24px;
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
