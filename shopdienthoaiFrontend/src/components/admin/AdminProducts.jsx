import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import apiClient from "../../api/apiClient";
import { getProductImageUrl } from "../../lib/productImageUrl";
import ThemSuaSanPham from "./ThemSuaSanPham";
export default function AdminProducts() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sanPhamDangSua, setSanPhamDangSua] = useState(null);
  const [sanPhams, setSanPhams] = useState([]);
  const [tuKhoa, setTuKhoa] = useState("");
  const [danhMucs, setDanhMucs] = useState([]);
  const [maDanhMuc, setMaDanhMuc] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/sanpham", {
          params: {
            size: 5,
          },
        });
        const danhMucs = await apiClient.get("/danhmuc");
        setSanPhams(response.data.content);
        setDanhMucs(danhMucs.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //truyền xuống component con hàm này bằng props
  const onProductCreated = (sanPhamTruyenVao) => {
    setSanPhams((products) => {
      const productExists = products.some(
        (product) => product.maSanPham == sanPhamTruyenVao.maSanPham,
      );

      if (productExists) {
        return products.map((product) =>
          product.maSanPham == sanPhamTruyenVao.maSanPham
            ? sanPhamTruyenVao
            : product,
        );
      }
      return [...products, sanPhamTruyenVao];
    });
  };

  const deleteProduct = async (masanpham) => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm có mã "${masanpham}" không?`,
    );
    if (!confirmed) return;
    try {
      await apiClient.delete(`/sanpham/${masanpham}`);
      (setSanPhams((products) =>
        products.filter((product) => product.maSanPham !== masanpham),
      ),
        console.log("Xóa sản phẩm có mã số " + masanpham + " thành công"));
    } catch (error) {
      console.log("Lỗi khi xóa sản phẩm ", error);
    }
  };

  const searchProduct = async () => {
    try {
      const response = await apiClient.get("/sanpham", {
        params: {
          tenSanPham: tuKhoa,
          maDanhMuc: maDanhMuc,
          page: 0,
          size: 5,
        },
      });
      setSanPhams(response.data.content);
    } catch (error) {
      console.log("Tìm kiếm thất bại", error);
    }
  };

  const sanPhamMoiNhat = sanPhams.reduce((max, sp) => {
    if (!max) return sp;

    return sp.maSanPham.localeCompare(max.maSanPham, undefined, {
      numeric: true,
    }) > 0
      ? sp
      : max;
  }, null);

  const maMoiNhat = sanPhamMoiNhat?.maSanPham ?? null;
  const maTiepTheo = maMoiNhat
    ? `SP${String(Number(maMoiNhat.slice(2)) + 1).padStart(3, "0")}`
    : "SP001";

  return (
    <>
      <div className="flex flex-col items-start gap-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => {
            setSanPhamDangSua(null);
            setIsFormOpen(true);
          }}
        >
          Thêm Sản Phẩm
        </button>
        <p>Form tìm kiếm</p>
        <div className="flex mb-4 gap-3">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="border-2 border-amber-400 w-80 p-2 rounded"
            onChange={(event) => setTuKhoa(event.target.value)}
          />

          <select
            name="maDanhMuc"
            id="maDanhMuc"
            className="rounded border-2 border-amber-200 bg-amber-100"
            onChange={(event) => setMaDanhMuc(event.target.value)}
          >
            <option value="">Chọn danh mục</option>
            {danhMucs.map((danhMuc) => (
              <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                {danhMuc.tenDanhMuc}
              </option>
            ))}
          </select>

          <button
            className="bg-cyan-500 w-20 rounded
           hover:bg-amber-700 cursor-pointer"
            onClick={() => searchProduct()}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      {isFormOpen && (
        <ThemSuaSanPham
          key={sanPhamDangSua?.maSanPham ?? "them-moi"}
          maSanPhamMoiNhat={maTiepTheo}
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
                  src={getProductImageUrl(sanPham.hinhAnh)}
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
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                  onClick={() => deleteProduct(sanPham.maSanPham)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <nav
          aria-label="Điều hướng trang sản phẩm"
          className="flex items-center justify-self-center gap-1.5"
        >
          <button
            type="button"
            aria-label="Trang đầu"
            className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Trang trước"
            className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronLeft size={18} />
          </button>

          <label className="ml-1 flex items-center gap-1 text-sm font-medium text-slate-600">
            <input
              type="number"
              min="1"
              defaultValue="1"
              aria-label="Số trang"
              className="h-9 w-12 rounded-lg border border-blue-200 bg-blue-50 text-center font-semibold text-blue-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <span aria-hidden="true">/ 20</span>
          </label>

          <button
            type="button"
            aria-label="Trang tiếp theo"
            className="ml-1 grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronRight size={18} />
          </button>
          <button
            type="button"
            aria-label="Trang cuối"
            className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            <ChevronsRight size={18} />
          </button>
        </nav>
      </div>
    </>
  );
}
