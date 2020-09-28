import React from "react";

import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import Dark from "./styles/themes/Dark";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles />
       <Layout>
          <Dashboard/>
       </Layout>
    </ThemeProvider>
  );
};

export default App;
