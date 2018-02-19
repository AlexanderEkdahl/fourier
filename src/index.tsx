import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { complexSignal } from "./signal";

ReactDOM.render(
  <App signal={complexSignal} />,
  document.getElementById('root')
);
