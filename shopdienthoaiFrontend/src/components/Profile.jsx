import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const initialProfile = {
  maTaiKhoan: "",
  tenDangNhap: "",
  vaiTro: "",
  maKhachHang: null,
  tenKhachHang: "",
  soDienThoai: "",
  email: "",
  diaChi: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    apiClient
      .get("/auth/me")
      .then((response) => {
        if (isMounted) {
          setProfile({ ...initialProfile, ...response.data });
        }
      })
      .catch((error) => {
        console.error("Lỗi tải hồ sơ:", error);
        if (isMounted) {
          setErrorMessage(
            error.response?.data?.message ||
              error.response?.data?.detail ||
              "Không thể tải thông tin tài khoản.",
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiClient.put("/auth/me", {
        tenKhachHang: profile.tenKhachHang.trim(),
        soDienThoai: profile.soDienThoai.trim(),
        email: profile.email.trim(),
        diaChi: profile.diaChi.trim(),
      });
      setProfile({ ...initialProfile, ...response.data });
      setSuccessMessage("Đã cập nhật thông tin tài khoản.");
    } catch (error) {
      console.error("Lỗi cập nhật hồ sơ:", error);
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.detail ||
          "Không thể cập nhật hồ sơ. Vui lòng thử lại.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="mx-auto max-w-2xl p-6">Đang tải hồ sơ...</p>;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-5 text-2xl font-bold">Thông tin tài khoản</h1>
      {errorMessage && (
        <p role="alert" className="mb-4 rounded bg-red-50 p-3 text-red-700">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p role="status" className="mb-4 rounded bg-green-50 p-3 text-green-700">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-slate-200 bg-white p-5"
      >
        <label className="flex flex-col gap-1 text-sm font-medium">
          Tên đăng nhập
          <input
            value={profile.tenDangNhap}
            readOnly
            className="rounded border border-slate-300 bg-slate-100 px-3 py-2 font-normal"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Vai trò
          <input
            value={profile.vaiTro}
            readOnly
            className="rounded border border-slate-300 bg-slate-100 px-3 py-2 font-normal"
          />
        </label>

        {profile.maKhachHang ? (
          <>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Họ và tên
              <input
                name="tenKhachHang"
                value={profile.tenKhachHang}
                onChange={handleChange}
                maxLength={100}
                required
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Số điện thoại
              <input
                name="soDienThoai"
                type="tel"
                value={profile.soDienThoai}
                onChange={handleChange}
                minLength={8}
                maxLength={20}
                pattern="[0-9+()\-\s]{8,20}"
                required
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                maxLength={100}
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium">
              Địa chỉ
              <textarea
                name="diaChi"
                value={profile.diaChi}
                onChange={handleChange}
                maxLength={255}
                rows={3}
                className="resize-y rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </>
        ) : (
          <p className="rounded bg-slate-50 p-3 text-sm text-slate-600">
            Tài khoản này chưa liên kết hồ sơ khách hàng.
          </p>
        )}
      </form>
    </main>
  );
}
