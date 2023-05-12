import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReduxContextProvider } from "./redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReduxContextProvider>
    <App />
  </ReduxContextProvider>
);
