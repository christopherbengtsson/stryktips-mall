import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { Application } from "./Application";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
