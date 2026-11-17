import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { deleteUnattachedProductImage } from "../../api/productImage";

export default function ThemSanPham({ onCancel, onProductCreated }) {
  const [danhMucs, setDanhMucs] = useState([]);

  useEffect(() => {
    const getDanhMucs = async () => {
      try {
        const response = await apiClient.get("/danhmuc");
        setDanhMucs(response.data);
      } catch (error) {
        console.error("Không thể lấy danh mục", error);
      }
    };

    getDanhMucs();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const fields = new FormData(event.currentTarget);
    const imageFile = fields.get("hinhAnh");

    try {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);

      const uploadResponse = await apiClient.post(
        "/sanpham/upload-image",
        uploadData,
      );

      const response = await apiClient.post("/sanpham", {
        tenSanPham: String(fields.get("tenSanPham") ?? "").trim(),
        maDanhMuc: String(fields.get("maDanhMuc") ?? ""),
        giaBan: Number(fields.get("giaBan")),
        soLuongTon: Number(fields.get("soLuongTon")),
        moTa: String(fields.get("moTa") ?? "").trim(),
        hinhAnh: uploadResponse.data.url,
      });
      onProductCreated(response.data);
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  }

  return (
    <div>
      <form
        className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div>Thông tin sản phẩm mới</div>
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label htmlFor="tenSanPham" className="">
              Tên sản phẩm
            </label>
            <input
              id="tenSanPham"
              name="tenSanPham"
              type="text"
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="maDanhMuc"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Danh mục
              <select name="maDanhMuc" id="maDanhMuc">
                <option value="">Chọn danh mục</option>
                {danhMucs.map((danhMuc) => (
                  <option key={danhMuc.maDanhMuc} value={danhMuc.maDanhMuc}>
                    {danhMuc.tenDanhMuc}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Giá bán</label>
            <input
              type="text"
              id="giaBan"
              name="giaBan"
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Số lượng</label>
            <input
              type="text"
              id="soLuongTon"
              name="soLuongTon"
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Hình ảnh</label>
            <input type="file" id="hinhAnh" name="hinhAnh" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Mô tả</label>
            <input
              type="text"
              id="moTa"
              name="moTa"
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        <div className="flex gap-10 mt-5">
          <button
            className="border-2 border-blue-500 hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            Lưu sản phẩm
          </button>
          <button
            className="border-2 border-red-500 hover:bg-red-600 cursor-pointer"
            type="button"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
