import apiClient from "@/api/apiClient";

export default function AdminProducts() {
  return (
    <>
      <div>Mã sản phẩm: sản phẩm 1</div>
      <div>Tên sản phẩm: SP001</div>
      <div>Mã danh mục: DM001</div>
      <div>Giá bán: 1000000vnđ</div>
      <div>Số lượng tồn: 10</div>
      <div>Hình ảnh: </div>
      <div>Mô tả: </div>
    </>
  );
}

export async function GetProducts() {
  const response = await apiClient.get("/sanpham");
  return response.data;
}
