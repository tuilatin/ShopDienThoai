import axios from "axios";
import apiClient from "../../api/apiClient";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [sanPhams, setSanPhams] = useState([]);

  useEffect(() => {
    axios
      .get("/sanpham")
      .then((response) => {
        setSanPhams(response.data);
      })
      .catch((error) => {
        console.error("Lỗi tải sản phẩm: ", error);
      });
  }, []);

  return (
    <>
      <div>
        {sanPhams.map((sanPham) => (
          <div key={sanPham.maSanPham}>
            <div>Tên sản phẩm: {sanPham.tenSanPham}</div>
            <div>Mã danh mục: {sanPham.maDanhMuc}</div>
            <div>Giá bán: {sanPham.giaBan}</div>
            <div>Số lượng tồn: {sanPham.soLuongTon}</div>
            <div>Hình ảnh: {sanPham.hinhAnh}</div>
            <div>Mô tả: {sanPham.moTa}</div>
          </div>
        ))}
      </div>
    </>
  );
}
