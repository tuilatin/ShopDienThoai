import { useState, useEffect, use } from "react";
import apiClient from "../../api/apiClient";
import { deleteUnattachedProductImage } from "../../api/productImage";
//form này cả thêm cả sửa sản phẩm
export default function ThemSanPham({
  maSanPhamMoiNhat,
  sanPhamDangSua,
  onCancel,
  onProductCreated,
}) {
  const [maDanhMuc, setMaDanhMuc] = useState(sanPhamDangSua?.maDanhMuc ?? "");
  const [danhMucs, setDanhMucs] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(() => {
    if (!sanPhamDangSua?.hinhAnh) return "";
    return `http://localhost:8081/uploads/${sanPhamDangSua.hinhAnh}`;
  });

  useEffect(() => {
    //nếu chưa có ảnh thì không cần làm gì
    if (!previewUrl) return;
    //gọi hàm cleanUp trước khi chạy lại với URL mới, hoặc khi component bị gỡ khỏi trang
    return () => URL.revokeObjectURL(previewUrl);
    //chạy effect khi component được render lần đầu và khi previewUrl thay đổi
  }, [[previewUrl]]);

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

      console.log("Trả về imageUrl", uploadResponse.data);
      var response;
      {
        sanPhamDangSua == null
          ? (response = await apiClient.post("/sanpham", {
              tenSanPham: String(fields.get("tenSanPham") ?? "").trim(),
              maDanhMuc: String(fields.get("maDanhMuc") ?? ""),
              giaBan: Number(fields.get("giaBan")),
              soLuongTon: Number(fields.get("soLuongTon")),
              moTa: String(fields.get("moTa") ?? "").trim(),
              hinhAnh: uploadResponse.data.url,
            }))
          : (response = await apiClient.put("/sanpham", {
              tenSanPham: String(fields.get("tenSanPham") ?? "").trim(),
              maDanhMuc: String(fields.get("maDanhMuc") ?? ""),
              giaBan: Number(fields.get("giaBan")),
              soLuongTon: Number(fields.get("soLuongTon")),
              moTa: String(fields.get("moTa") ?? "").trim(),
              hinhAnh: uploadResponse.data.url,
            }));
      }
      // const response = await apiClient.post("/sanpham", {
      //   tenSanPham: String(fields.get("tenSanPham") ?? "").trim(),
      //   maDanhMuc: String(fields.get("maDanhMuc") ?? ""),
      //   giaBan: Number(fields.get("giaBan")),
      //   soLuongTon: Number(fields.get("soLuongTon")),
      //   moTa: String(fields.get("moTa") ?? "").trim(),
      //   hinhAnh: uploadResponse.data.url,
      // });
      console.log("res.data =", response.data);
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
              Mã sản phẩm
            </label>
            <input
              id="maSanPham"
              name="maSanPham"
              type="text"
              disabled
              defaultValue={sanPhamDangSua?.maSanPham ?? maSanPhamMoiNhat ?? ""}
              className="w-40 rounded-md border-2 border-blue-500 bg-gray-200 px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tenSanPham" className="">
              Tên sản phẩm
            </label>
            <input
              id="tenSanPham"
              name="tenSanPham"
              type="text"
              defaultValue={sanPhamDangSua?.tenSanPham ?? ""}
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="maDanhMuc"
              className="flex flex-col gap-1 text-sm font-medium"
            >
              Danh mục
              <select
                name="maDanhMuc"
                id="maDanhMuc"
                value={maDanhMuc}
                onChange={(event) => setMaDanhMuc(event.target.value)}
              >
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
              defaultValue={sanPhamDangSua?.giaBan ?? ""}
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Số lượng</label>
            <input
              type="text"
              id="soLuongTon"
              name="soLuongTon"
              defaultValue={sanPhamDangSua?.soLuongTon ?? ""}
              className="w-40 rounded-md border-2 border-blue-500 bg-white px-1 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Hình ảnh</label>
            <input
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              //gợi hộp thoại chọn file chỉ hiển thị các loại ảnh như PNG, JPG, GIF
              accept="image/*"
              //chạy hàm bên trong khi người dùng thay đổi lựa chọn file
              onChange={(event) => {
                //event.target là ô chọn file
                //event.target.files lấy file đầu tiên được chọn nếu có ?. giúp tránh lỗi nếu files không có giá trị
                const file = event.target.files?.[0];
                //nếu có file thì tạo URL để trình duyệt hiển thị nội dung file cục bộ
                setPreviewUrl(
                  file
                    ? URL.createObjectURL(file)
                    : sanPhamDangSua?.hinhAnh
                      ? `http://localhost:8081/uploads/${sanPhamDangSua.hinhAnh}`
                      : "",
                );
              }}
            />
            {previewUrl != "" && (
              <img
                src={previewUrl}
                alt="ảnh xem trước"
                className="w-30 h-30 object-cover"
              />
            )}
            {sanPhamDangSua?.hinhAnh && (
              <p className="text-sm text-gray-600">{sanPhamDangSua.hinhAnh}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Mô tả</label>
            <input
              type="text"
              id="moTa"
              name="moTa"
              defaultValue={sanPhamDangSua?.moTa ?? ""}
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
