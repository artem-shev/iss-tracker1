import styled from 'styled-components';

export const StyledInfoPanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  background: white;
  padding: 16px;
  opacity: 0.5;
  border: 1px solid green;
  border-radius: 2px;
  color: navy;

  & :last-child {
    margin-top: 8px;
  }
`;

export const StyledPanelTitle = styled.p`
  font-weight: bold;
  color: dimgrey;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
`;

export const StyledButton = styled.button`
  margin-bottom: 16px;
  margin-left: auto;
`;

export const StyledWrapper = styled.div`
  display: flex;

  h4 {
    margin: 0;
  }
`;
