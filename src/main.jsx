import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import arcadeTheme from "./theme/arcadeTheme.js";
import { ThemeProvider } from "@mui/material";
import RolProvider from "./context/RolContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ThemeProvider theme={arcadeTheme}>
        <RolProvider>
          <App />
        </RolProvider>
      </ThemeProvider>
  </StrictMode>,
);
