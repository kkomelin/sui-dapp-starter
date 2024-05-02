import React from "react";
import App from "./App.tsx";
import { reactRender } from "@/helpers/misc.ts";
import "./index.css";

reactRender(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
