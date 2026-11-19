import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import ThemSuaSanPham from "./ThemSuaSanPham";
export default function AdminProducts() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sanPhamDangSua, setSanPhamDangSua] = useState(null);
  const [sanPhams, setSanPhams] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/sanpham");
        setSanPhams(response.data.content);
        console.log("sanphamData= ", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //truyền xuống component con hàm này bằng props
  const onProductCreated = (newProduct) => {
    setSanPhams((preProducts) => [...preProducts, newProduct]);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        onClick={() => {
          setSanPhamDangSua(null);
          setIsFormOpen(true);
        }}
      >
        Thêm Sản Phẩm
      </button>
      {isFormOpen && (
        <ThemSuaSanPham
          maSanPhamMoiNhat={sanPhams.filter()}
          sanPhamDangSua={sanPhamDangSua}
          onCancel={() => setIsFormOpen(false)}
          onProductCreated={onProductCreated}
        />
      )}

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
                  src={`http://localhost:8081/uploads/${sanPham.hinhAnh}`}
                  alt={sanPham.tenSanPham}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-5 py-3">{sanPham.moTa}</td>
              <td className="px-5 py-3">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => {
                    //do dòng này nó mới chớp hiện cái form
                    setSanPhamDangSua(sanPham);
                    setIsFormOpen(true);
                  }}
                >
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
