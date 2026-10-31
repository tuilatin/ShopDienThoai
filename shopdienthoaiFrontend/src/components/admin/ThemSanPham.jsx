import React from "react";

export default function ThemSanPham(onCancel) {
  return (
    <div>
      <form className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div>Thông tin sản phẩm mới</div>

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
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </div>
          <div>
            <label
              htmlFor="maDanhMuc"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Mã danh mục:
            </label>
            <input
              type="text"
              id="maDanhMuc"
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
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
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
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
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            ></textarea>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
