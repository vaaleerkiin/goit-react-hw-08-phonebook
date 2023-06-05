import styled from '@emotion/styled';

export const Container = styled.section`
  border: solid ${props => props.theme.colors.black} 1px;
  max-width: 500px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
`;
