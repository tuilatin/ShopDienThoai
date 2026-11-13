import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import ThemSanPham from "./ThemSanPham";
export default function AdminProducts() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [sanPhams, setSanPhams] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/sanpham");
        setSanPhams(response.data.content);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setIsAddProduct(true);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        onClick={handleAddProduct}
      >
        Thêm Sản Phẩm
      </button>
      {isAddProduct && <ThemSanPham onCancel={() => setIsAddProduct(false)} />}

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <th className="px-5 py-3">Mã sản phẩm</th>
            <th className="px-5 py-3">Tên sản phẩm</th>
            <th className="px-5 py-3">Mã danh mục</th>
            <th className="px-5 py-3">Tên danh mục</th>
            <th className="px-5 py-3">Giá bán</th>
            <th className="px-5 py-3">Số lượng tồn</th>
            <th className="px-5 py-3">Hình ảnh</th>
            <th className="px-5 py-3">Mô tả</th>
            <th className="px-5 py-3">Hành động</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-sm">
          {sanPhams.map((sanPham) => (
            <tr key={sanPham.maSanPham}>
              <td className="px-5 py-3">{sanPham.maSanPham}</td>
              <td className="px-5 py-3">{sanPham.tenSanPham}</td>
              <td className="px-5 py-3">{sanPham.maDanhMuc}</td>
              <td className="px-5 py-3">{sanPham.tenDanhMuc}</td>
              <td className="px-5 py-3">{sanPham.giaBan}</td>
              <td className="px-5 py-3">{sanPham.soLuongTon}</td>
              <td className="px-5 py-3">
                <img
                  src={sanPham.hinhAnh}
                  alt={sanPham.tenSanPham}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-5 py-3">{sanPham.moTa}</td>
              <td className="px-5 py-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Sửa
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
