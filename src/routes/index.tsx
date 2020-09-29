import React from "react";
import {BrowserRouter} from "react-router-dom";

import AppRoutes from "./routes";

const Routes = () => (
   <BrowserRouter>
      <AppRoutes />
   </BrowserRouter>
);

export default Routes;
