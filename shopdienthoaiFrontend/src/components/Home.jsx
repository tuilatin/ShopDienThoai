import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const danhMucs = useLoaderData();
  if (!Array.isArray(danhMucs)) {
    return <div>Lỗi tải danh mục</div>;
  }
  return (
    <>
      <Link to="/login"  className={({ isActive }) =>
                    isActive ? `underline` : ""
                  }>Đăng nhập</Link>
      <div className="App">
        {danhMucs.length === 0 ? (
          <p>Không có danh mục nào.</p>
        ) : (
          <ul>
            {danhMucs.map((danhMuc) => (
              <li key={danhMuc.maDanhMuc}>
                <p>Mã danh mục: {danhMuc.maDanhMuc}</p>
                <p>Tên danh mục: {danhMuc.tenDanhMuc}</p>
                <p>Mô tả: {danhMuc.moTa}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

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
