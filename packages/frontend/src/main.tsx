import App from "@/App.tsx";
import { reactRender } from "@/helpers/misc.ts";
import SuiProvider from "@/providers/SuiProvider.tsx";
import React from "react";
import "./index.css";

reactRender(
  <React.StrictMode>
    <SuiProvider>
      <App />
    </SuiProvider>
  </React.StrictMode>
);
