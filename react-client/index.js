import React from "react";
import { render } from "react-dom";
import Router from "./src/components/Router";
import { browserHistory } from "react-router-dom";



render(<Router history={browserHistory}/>, document.getElementById("main"));