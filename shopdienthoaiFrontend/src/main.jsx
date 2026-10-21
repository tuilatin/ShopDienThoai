import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DanhMucLoader } from "./components/Home.jsx";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { registerAction } from "./components/Register.jsx";
import { loginAction } from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminProducts from "./components/admin/AdminProducts.jsx";
import RequireAdmin from "./components/RequireAdmin.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const routeDenfinitions = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} loader={DanhMucLoader} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route
      path="/register"
      element={<Register />}
      action={registerAction}
      errorElement={<ErrorPage />}
    />
    <Route path="/cart" element={<Cart />} />
    <Route path="/chitietsanpham/:maSanPham" element={<ProductDetail />} />
    <Route element={<RequireAdmin />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="products" element={<AdminProducts />} />
      </Route>
    </Route>
  </Route>,
);

const appRouter = createBrowserRouter(routeDenfinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
);
