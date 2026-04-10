import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import arcadeTheme from "./theme/arcadeTheme.js";
import { ThemeProvider } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ThemeProvider theme={arcadeTheme}>
        <App />
      </ThemeProvider>
  </StrictMode>,
);
