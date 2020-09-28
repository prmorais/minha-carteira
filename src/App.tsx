import React from "react";

import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import Dark from "./styles/themes/Dark";
// import Dashboard from "./pages/Dashboard";
import List from "./pages/List";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Dark}>
      <GlobalStyles />
       <Layout>
          {/*<Dashboard/>*/}
          <List />
       </Layout>
    </ThemeProvider>
  );
};

export default App;
