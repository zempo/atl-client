import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { UserContextProvider as UserProvider } from "./Contexts/UserContext";
import { ScriptsContextProvider as ScriptsProvider } from "./Contexts/ScriptsContext";
import "@fortawesome/fontawesome-free/css/all.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <UserProvider>
    <ScriptsProvider>
      <App />
    </ScriptsProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
