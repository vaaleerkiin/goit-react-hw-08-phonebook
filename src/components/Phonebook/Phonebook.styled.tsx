import styled from "@emotion/styled";

export const PhonebookWrap = styled.div`
  border: solid #000000 1px;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
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
    list-style: none;
    padding: 0;
    padding-left: 32px;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    li {
      width: 100%;
      hr {
        margin: 0;
      }
      div {
        width: 100%;
        padding-top: 16px;
        font-size: 32px;
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 16px;
        align-items: center;
      }
    }
  }
  p {
    padding: 0;

    margin: 0;

    font-size: 20px;
    font-weight: 500;
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
  flex-wrap: nowrap;
  gap: 16px;
  @media screen and (max-width: 500px) {
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column-reverse;
  }
  input::placeholder {
    color: black;
  }
`;
