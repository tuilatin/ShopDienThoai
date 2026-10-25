import apiClient from "../../api/apiClient";

export default function AdminProducts() {
  const [sanPhams, setSanPhams] = useState([]);

  useEffect(async () => {
    const response = await apiClient.get("/sanpham");
    setSanPhams(response.data);
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

export async function GetProducts() {}
