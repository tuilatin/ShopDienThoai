import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DanhMucLoader } from "./components/Home.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routeDenfinitions = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} loader={DanhMucLoader} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>,
);

const appRouter = createBrowserRouter(routeDenfinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
