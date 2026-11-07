package com.shopdienthoaiAPI.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class TaiKhoanDto {
    private TaiKhoanDto() {}

    public record ProfileResponse(
            String maTaiKhoan,
            String tenDangNhap,
            String vaiTro,
            String maKhachHang,
            String tenKhachHang,
            String soDienThoai,
            String email,
            String diaChi
    ) {}

    public record ProfileUpdateRequest(
            @NotBlank(message = "Họ tên không được để trống.")
            @Size(max = 100, message = "Họ tên tối đa 100 ký tự.")
            String tenKhachHang,
            @NotBlank(message = "Số điện thoại không được để trống.")
            @Pattern(
                    regexp = "^[0-9+()\\-\\s]{8,20}$",
                    message = "Số điện thoại không hợp lệ."
            )
            String soDienThoai,
            @Email(message = "Email không hợp lệ.")
            @Size(max = 100, message = "Email tối đa 100 ký tự.")
            String email,
            @Size(max = 255, message = "Địa chỉ tối đa 255 ký tự.")
            String diaChi
    ) {}
}