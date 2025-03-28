import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import MovieProvider from "./context/MovieContext";
import "bootstrap/dist/css/bootstrap.min.css";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </StrictMode>
);
