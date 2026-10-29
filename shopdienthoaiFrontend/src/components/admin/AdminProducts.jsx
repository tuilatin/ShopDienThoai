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
              <th className="py-3 px-5">Mã đơn</th>
              <th className="py-3 px-5">Khách hàng</th>
              <th className="py-3 px-5">Tổng tiền</th>
              <th className="py-3 px-5">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            <tr>
              <td className="py-3 px-5 font-medium">#ORD-9821</td>
              <td className="py-3 px-5">Nguyễn Văn A</td>
              <td className="py-3 px-5">1,250,000 ₫</td>
              <td className="py-3 px-5">
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  Hoàn thành
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-5 font-medium">#ORD-9822</td>
              <td className="py-3 px-5">Trần Thị B</td>
              <td className="py-3 px-5">450,000 ₫</td>
              <td className="py-3 px-5">
                <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  Đang xử lý
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-5 font-medium">#ORD-9823</td>
              <td className="py-3 px-5">Lê Văn C</td>
              <td className="py-3 px-5">3,100,000 ₫</td>
              <td className="py-3 px-5">
                <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  Đã hủy
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
