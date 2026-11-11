import { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";
import { deleteUnattachedProductImage } from "../../api/productImage";

export default function ThemSanPham({ onCancel, onProductCreated }) {
  return (
    <div>
      <form className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div>Thông tin sản phẩm mới</div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="">Tên sản phẩm</label>
            <input
              type="text"
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
