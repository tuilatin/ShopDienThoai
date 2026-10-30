import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ThemSanPham from "./ThemSanPham";

export default function AdminProducts() {
  const [sanPhams, setSanPhams] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);

  const taiDanhSachSanPham = async () => {
    try {
      const response = await apiClient.get("/sanpham");
      setSanPhams(response.data.content ?? []);
    } catch (error) {
      console.error("Lỗi tải sản phẩm: ", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    apiClient
      .get("/sanpham")
      .then((response) => {
        if (isMounted) {
          setSanPhams(response.data.content ?? []);
        }
      })
      .catch((error) => {
        console.error("Lỗi tải sản phẩm: ", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
        <button
          type="button"
          onClick={() => setIsAddProduct(true)}
          aria-expanded={isAddProduct}
          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 cursor-pointer mb-4"
        >
          Thêm sản phẩm
        </button>
        {isAddProduct && (
          <ThemSanPham
            onCancel={() => setIsAddProduct(false)}
            onProductCreated={() => {
              setIsAddProduct(false);
              taiDanhSachSanPham();
            }}
          />
        )}

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-5">Mã sản phẩm</th>
              <th className="py-3 px-5">Tên sản phẩm</th>
              <th className="py-3 px-5">Mã danh mục</th>
              <th className="py-3 px-5">Giá bán</th>
              <th className="py-3 px-5">Số lượng tồn</th>
              <th className="py-3 px-5">Hình ảnh</th>
              <th className="py-3 px-5">Mô tả</th>
              <th className="py-3 px-5">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {sanPhams.map((sanPham) => (
              <tr key={sanPham.maSanPham} className="border-b border-slate-200">
                <td className="py-3 px-5 font-medium">{sanPham.maSanPham}</td>
                <td className="py-3 px-5 font-medium">{sanPham.tenSanPham}</td>
                <td className="py-3 px-5">{sanPham.maDanhMuc}</td>
                <td className="py-3 px-5">
                  {sanPham.giaBan.toLocaleString()} ₫
                </td>
                <td className="py-3 px-5">{sanPham.soLuongTon}</td>
                <td className="py-3 px-5">
                  <img
                    src={sanPham.hinhAnh}
                    alt={sanPham.tenSanPham}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-3 px-5">{sanPham.moTa}</td>
                <td className="py-3 px-5 flex">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                    Sửa
                  </button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
