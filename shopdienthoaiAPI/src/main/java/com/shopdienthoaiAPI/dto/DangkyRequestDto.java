package com.shopdienthoaiAPI.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DangkyRequestDto(
        @NotBlank(message = "Tên đăng nhập không được để trống.")
        @Size(min = 3, max = 50, message = "Tên đăng nhập phải từ 3 đến 50 ký tự.")
        String username,
        @NotBlank(message = "Mật khẩu không được để trống.")
        @Size(min = 8, max = 20, message = "Mật khẩu phải từ 8 đến 20 ký tự.")
        String password,
        @NotBlank(message = "Vui lòng xác nhận mật khẩu.")
        String confirmPassword,
        @NotBlank(message = "Họ tên không được để trống.")
        @Size(max = 100, message = "Họ tên tối đa 100 ký tự.")
        String tenKhachHang,
        @NotBlank(message = "Số điện thoại không được để trống.")
        @Pattern(
                regexp = "^[0-9+()\\-\\s]{8,20}$",
                message = "Số điện thoại không hợp lệ."
        )
        String soDienThoai
) {
}
