import React from "react";
import ReactDOM from "react-dom/client";
import "./owfont-regular.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Root />
);
