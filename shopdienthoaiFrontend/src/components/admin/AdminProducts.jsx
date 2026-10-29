import axios from "axios";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [sanPhams, setSanPhams] = useState([]);

  useEffect(() => {
    apiClient
      .get("/sanpham")
      .then((response) => {
        console.log(response.data);
        setSanPhams(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi tải sản phẩm: ", error);
      });
  }, []);

  return (
    <>
      <div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-5">Mã sản phẩm</th>
              <th className="py-3 px-5">Tên sản phẩm</th>
              <th className="py-3 px-5">Mã danh mục</th>
              <th className="py-3 px-5">Giá bán</th>
              <th className="py-3 px-5">Số lượng tồn</th>
              <th className="py-3 px-5">Hình ảnh</th>
              <th className="py-3 px-5">Mô tả</th>
              <th className="py-3 px-5">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">

              sanPhams.map((sanPham) => (
                <tr key={sanPham.id}>
                  <td className="py-3 px-5 font-medium">{sanPham.maSanPham}</td>
              <td className="py-3 px-5 font-medium">#ORD-9821</td>
              <td className="py-3 px-5">Nguyễn Văn A</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">1,250,000 ₫</td>)
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
