import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import App from "./App";

import "./index.css";

const app = (
  <Router>
    <QueryParamProvider>
      <App />
    </QueryParamProvider>
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));
