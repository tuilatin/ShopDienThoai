import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

const initialForm = {
  tenSanPham: "",
  maDanhMuc: "",
  giaBan: "",
  soLuongTon: "",
  moTa: "",
};

export default function AddProduct({ onCancel, onProductCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [danhMucs, setDanhMucs] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const taiDanhMuc = async () => {
      try {
        const response = await apiClient.get("/danhmuc");
        setDanhMucs(response.data);
      } catch (error) {
        console.error("Lỗi tải danh mục: ", error);
        setErrorMessage("Không tải được danh mục. Vui lòng thử tải lại trang.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    taiDanhMuc();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await apiClient.post("/sanpham", {
        tenSanPham: formData.tenSanPham.trim(),
        maDanhMuc: formData.maDanhMuc,
        giaBan: Number(formData.giaBan),
        soLuongTon: Number(formData.soLuongTon),
        moTa: formData.moTa.trim(),
      });
      onProductCreated();
    } catch (error) {
      console.error("Lỗi thêm sản phẩm: ", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Không thể thêm sản phẩm. Vui lòng kiểm tra thông tin và thử lại.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold">Thông tin sản phẩm mới</h2>

      {errorMessage && (
        <p role="alert" className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Tên sản phẩm
          <input
            name="tenSanPham"
            value={formData.tenSanPham}
            onChange={handleChange}
            maxLength={150}
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
            placeholder="Nhập tên sản phẩm"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Danh mục
          <select
            name="maDanhMuc"
            value={formData.maDanhMuc}
            onChange={handleChange}
            required
            disabled={isLoadingCategories || danhMucs.length === 0}
            className="rounded border border-slate-300 px-3 py-2 font-normal disabled:bg-slate-100"
          >
            <option value="">
              {isLoadingCategories ? "Đang tải danh mục..." : "Chọn danh mục"}
            </option>
            {danhMucs.map((danhMuc) => (
              <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                {danhMuc.tenDanhMuc}
              </option>
            ))}
          </select>
          {!isLoadingCategories && danhMucs.length === 0 && !errorMessage && (
            <span className="text-xs font-normal text-amber-700">
              Chưa có danh mục để chọn.
            </span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Giá bán (₫)
          <input
            name="giaBan"
            type="number"
            value={formData.giaBan}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
            placeholder="Ví dụ: 15000000"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Số lượng tồn
          <input
            name="soLuongTon"
            type="number"
            value={formData.soLuongTon}
            onChange={handleChange}
            min="0"
            step="1"
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
            placeholder="Nhập số lượng"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          Mô tả
          <textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleChange}
            rows={4}
            className="resize-y rounded border border-slate-300 px-3 py-2 font-normal"
            placeholder="Nhập mô tả sản phẩm (không bắt buộc)"
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting || isLoadingCategories || danhMucs.length === 0}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded border border-slate-300 px-4 py-2 hover:bg-slate-50 disabled:opacity-60"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
