import React from "react";
import ReactDOM from "react-dom";
import RootApp from "./App";
import reducer, { initialState } from "./files/reducer";
import { StateProvider } from "./files/StateProvider";
import * as serviceWorker from "./serviceWorker";

let RootDirectory = document.getElementById("Root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <RootApp />
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);

serviceWorker.register();
