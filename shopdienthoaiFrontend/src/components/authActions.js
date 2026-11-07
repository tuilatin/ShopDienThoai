import { redirect } from "react-router-dom";
import apiClient from "../api/apiClient";

export async function loginAction({ request }) {
  const loginFormData = await request.formData();
  const loginData = {
    username: String(loginFormData.get("username") ?? "").trim(),
    password: String(loginFormData.get("password") ?? ""),
  };

  try {
    const response = await apiClient.post("/auth/dangnhap", loginData);
    const { jwtToken, vaiTro } = response.data;
    sessionStorage.setItem("jwtToken", jwtToken);
    sessionStorage.setItem("vaiTro", vaiTro);
    window.dispatchEvent(new Event("authChanged"));
    return redirect(vaiTro === "ADMIN" ? "/admin" : "/");
  } catch (error) {
    return {
      success: false,
      errors:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Không thể đăng nhập. Vui lòng thử lại.",
    };
  }
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    username: String(data.get("username") ?? "").trim(),
    password: String(data.get("password") ?? ""),
    confirmPassword: String(data.get("confirmPassword") ?? ""),
    tenKhachHang: String(data.get("tenKhachHang") ?? "").trim(),
    soDienThoai: String(data.get("soDienThoai") ?? "").trim(),
  };

  if (registerData.password !== registerData.confirmPassword) {
    return { errors: "Mật khẩu xác nhận không khớp." };
  }

  try {
    await apiClient.post("/auth/dangky", registerData);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors:
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Không thể đăng ký. Vui lòng kiểm tra thông tin và thử lại.",
    };
  }
}
