import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function SuaSanPham({
  sanPham,
  onCancel,
  onProductUpdated,
}) {
  const [danhMucs, setDanhMucs] = useState([]);
  const [tenSanPham, setTenSanPham] = useState(sanPham.tenSanPham ?? "");
  const [maDanhMuc, setMaDanhMuc] = useState(sanPham.maDanhMuc ?? "");
  const [giaBan, setGiaBan] = useState(String(sanPham.giaBan ?? ""));
  const [soLuongTon, setSoLuongTon] = useState(
    String(sanPham.soLuongTon ?? ""),
  );
  const [moTa, setMoTa] = useState(sanPham.moTa ?? "");
  const hinhAnh = sanPham.hinhAnh ?? "";
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get("/danhmuc")
      .then((response) => {
        if (isMounted) {
          setDanhMucs(response.data);
        }
      })
      .catch((error) => {
        console.error("Lỗi tải danh mục:", error);
        if (isMounted) {
          setErrorMessage("Không tải được danh mục. Vui lòng thử lại.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!sessionStorage.getItem("jwtToken")) {
      setErrorMessage("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      return;
    }

    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
      setErrorMessage("Ảnh không được vượt quá 5 MB.");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = hinhAnh;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        const uploadResponse = await apiClient.post(
          "/sanpham/upload-image",
          uploadData,
        );
        imageUrl = uploadResponse.data.url;
      }

      await apiClient.put(`/sanpham/${sanPham.maSanPham}`, {
        tenSanPham: tenSanPham.trim(),
        maDanhMuc,
        giaBan: Number(giaBan),
        soLuongTon: Number(soLuongTon),
        hinhAnh: imageUrl || null,
        moTa: moTa.trim(),
      });
      onProductUpdated();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      setErrorMessage(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Không thể cập nhật sản phẩm. Vui lòng thử lại.",
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
      <h2 className="mb-4 text-xl font-semibold">
        Sửa sản phẩm {sanPham.maSanPham}
      </h2>

      {errorMessage && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Tên sản phẩm
          <input
            value={tenSanPham}
            onChange={(event) => setTenSanPham(event.target.value)}
            maxLength={150}
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Danh mục
          <select
            value={maDanhMuc}
            onChange={(event) => setMaDanhMuc(event.target.value)}
            required
            disabled={danhMucs.length === 0}
            className="rounded border border-slate-300 px-3 py-2 font-normal disabled:bg-slate-100"
          >
            <option value="">Chọn danh mục</option>
            {danhMucs.map((danhMuc) => (
              <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                {danhMuc.tenDanhMuc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Giá bán (₫)
          <input
            type="number"
            value={giaBan}
            onChange={(event) => setGiaBan(event.target.value)}
            min="1"
            step="0.01"
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Số lượng tồn
          <input
            type="number"
            value={soLuongTon}
            onChange={(event) => setSoLuongTon(event.target.value)}
            min="0"
            step="1"
            required
            className="rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          Hình ảnh sản phẩm (JPG, PNG hoặc GIF; tối đa 5 MB)
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
            className="rounded border border-slate-300 px-3 py-2 font-normal"
          />
          {(preview || hinhAnh) && (
            <img
              src={preview ?? hinhAnh}
              alt={`Ảnh ${tenSanPham}`}
              className="mt-2 h-32 w-32 rounded object-cover"
            />
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium sm:col-span-2">
          Mô tả
          <textarea
            value={moTa}
            onChange={(event) => setMoTa(event.target.value)}
            rows={4}
            className="resize-y rounded border border-slate-300 px-3 py-2 font-normal"
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting || danhMucs.length === 0}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
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
