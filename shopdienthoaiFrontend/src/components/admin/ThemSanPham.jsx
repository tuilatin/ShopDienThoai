import React from "react";

export default function ThemSanPham() {
  return (
    <div>
      <div>Thông tin sản phẩm mới</div>
      <form className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <label htmlFor="maSanPham">Mã sản phẩm:</label>
          <input type="text" id="maSanPham" />
        </div>
        <div>
          <label htmlFor="tenSanPham">Tên sản phẩm:</label>
          <input type="text" id="tenSanPham" />
        </div>
        <div>
          <label htmlFor="maDanhMuc">Mã danh mục:</label>
          <input type="text" id="maDanhMuc" />
        </div>
        <div>
          <label htmlFor="giaBan">Giá bán:</label>
          <input type="number" id="giaBan" />
        </div>
        <div>
          <label htmlFor="soLuongTon">Số lượng tồn:</label>
          <input type="number" id="soLuongTon" />
        </div>
        <div>
          <label htmlFor="hinhAnh">Hình ảnh:</label>
          <input type="file" id="hinhAnh" />
        </div>
        <div>
          <label htmlFor="moTa">Mô tả:</label>
          <textarea id="moTa"></textarea>
        </div>
      </form>
    </div>
  );
}
