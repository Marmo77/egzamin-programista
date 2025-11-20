import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <SpeedInsights />
        <Toaster duration={3000} position="top-right" richColors={true} />{" "}
        {/*Toaster: https://sonner.emilkowal.ski/ */}
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
