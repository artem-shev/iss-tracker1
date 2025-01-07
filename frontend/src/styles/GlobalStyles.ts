import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  #root {
    padding: 20px;  
  }
  
  .leaflet-marker-icon {
    width: auto !important;
  }
`;

export default GlobalStyles;
