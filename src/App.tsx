import React from "react";

import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Dark from "./styles/themes/Dark";

import Routes from "./routes";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
