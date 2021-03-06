import React from "react";
import Aside from "../Aside";
import Content from "../Content";
import MainHeader from "../MainHeader";

import { Grid } from "./style";

const Layout: React.FC = ({children}) => {
  return (
    <Grid>
      <Aside />
      <MainHeader />
       <Content>
          { children }
       </Content>
    </Grid>
  );
};

export default Layout;
