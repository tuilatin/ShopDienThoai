import apiClient from "./api/apiClient";
import { useLoaderData, useRouteError } from "react-router-dom";
import "./App.css";

function App() {
  const products = useLoaderData();
  return (
    <>
      <p>Ma danh muc: {products.maDanhMuc}</p>
      <p>Ten danh muc: {products.tenDanhMuc}</p>
      <p>Mo ta: {products.moTa}</p>
    </>
  );
}

export default App;

export async function DanhMucLoader() {
  try {
    const response = await apiClient.get("/DanhMuc");
    return response.data;
  } catch (error) {
    console.error("Error fetching danh mục:", error);
    throw error;
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : "Không thể tải dữ liệu.";

  return <p role="alert">Đã xảy ra lỗi: {message}</p>;
}
