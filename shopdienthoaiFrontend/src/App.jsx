import { useLoaderData } from "react-router-dom";
import "./App.css";

function App() {
  const danhMucs = useLoaderData();
  if (!Array.isArray(danhMucs)) {
    return <div>Lỗi tải danh mục</div>;
  }
  return (
    <div className="App">
      {danhMucs.length === 0 ? (
        <p>Không có danh mục nào.</p>
      ) : (
        <ul>
          {danhMucs.map((danhMuc, index) => (
            <li
              key={`${danhMuc.maDanhMuc ?? danhMuc.id ?? "danh-muc"}-${index}`}
            >
              <p>Mã danh mục: {danhMuc.maDanhMuc}</p>
              <p>Tên danh mục: {danhMuc.tenDanhMuc}</p>
              <p>Mô tả: {danhMuc.moTa}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

export async function DanhMucLoader() {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/DanhMuc`, {
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Không thể tải danh mục (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching danh mục:", error);
    throw error;
  }
}
