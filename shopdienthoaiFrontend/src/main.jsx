import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { DanhMucLoader, ErrorBoundary } from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routeDenfinitions = createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
    loader={DanhMucLoader}
    errorElement={<ErrorBoundary />}
  />,
);

const appRouter = createBrowserRouter(routeDenfinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
