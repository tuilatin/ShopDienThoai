import apiClient from "../../api/apiClient";

export default function AdminProducts() {
  return (
    <>
      <div>Mã sản phẩm: {sanPham.maSanPham}</div>
      <div>Tên sản phẩm: {sanPham.tenSanPham}</div>
      <div>Mã danh mục: {sanPham.maDanhMuc}</div>
      <div>Giá bán: {sanPham.giaBan}</div>
      <div>Số lượng tồn: {sanPham.soLuongTon}</div>
      <div>Hình ảnh: {sanPham.hinhAnh}</div>
      <div>Mô tả: {sanPham.moTa}</div>
    </>
  );
}

export async function GetProducts() {
  const response = await apiClient.get("/sanpham");
  return response.data;
}
