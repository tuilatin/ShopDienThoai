import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { Form } from "react-router-dom";

export default function ThemSanPham({ onCancel, onProductCreated }) {
  const [danhMucs, setDanhMucs] = useState([]);
  const [preview, setPreview] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!sessionStorage.getItem("jwtToken")) {
      setSubmitError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const data = {
      tenSanPham: formData.get("tenSanPham"),
      maDanhMuc: formData.get("maDanhMuc"),
      giaBan: Number(formData.get("giaBan")),
      soLuongTon: Number(formData.get("soLuongTon")),
      hinhAnh: formData.get("hinhAnh"),
      moTa: formData.get("moTa"),
      ngayTao: new Date().toISOString(),
    };

    try {
      await apiClient.post("/sanpham", data);
      onProductCreated();
    } catch (error) {
      console.error("Error adding product:", error);

      setSubmitError(
        error.response?.data?.message ||
          "Không thể thêm sản phẩm. Vui lòng thử lại.",
      );
    }
  };

  useEffect(() => {
    const taiDanhMuc = async () => {
      try {
        const response = await apiClient.get("/danhmuc");
        setDanhMucs(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    taiDanhMuc();
  }, []);

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div>Thông tin sản phẩm mới</div>
        {submitError && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            {submitError}
          </p>
        )}

        <div className="flex">
          <div>
            <label
              htmlFor="tenSanPham"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Tên sản phẩm:
            </label>
            <input
              type="text"
              id="tenSanPham"
              name="tenSanPham"
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </div>
          <div>
            <label
              htmlFor="maDanhMuc"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Danh mục
              <select
                name="maDanhMuc"
                id=""
                className="rounded border border-slate-300 px-3 py-2 font-normal disabled:bg-slate-100"
              >
                {danhMucs.map((danhMuc) => (
                  <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label
              htmlFor="giaBan"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Giá bán:
            </label>
            <input
              type="number"
              id="giaBan"
              name="giaBan"
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </div>
          <div>
            <label
              htmlFor="soLuongTon"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Số lượng tồn:
            </label>
            <input
              type="number"
              id="soLuongTon"
              name="soLuongTon"
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </div>
          <div>
            <label
              htmlFor="hinhAnh"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Hình ảnh:
            </label>
            <input
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              accept="image/"
              onChange={handleImageChange}
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />

            {preview && <img src={preview} alt="Preview" width="200" />}
          </div>
          <div>
            <label
              htmlFor="moTa"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Mô tả:
            </label>
            <textarea
              id="moTa"
              name="moTa"
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            ></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            Hủy
          </button>
        </div>
      </Form>
    </div>
  );
}
