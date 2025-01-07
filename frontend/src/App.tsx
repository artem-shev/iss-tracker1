import React from 'react';
import Providers from 'components/Providers';
import Tracker from 'components/Tracker';
import GlobalStyles from 'styles/GlobalStyles';

const App = () => (
  <Providers>
    <GlobalStyles />
    <Tracker />
  </Providers>
);

export default App;
