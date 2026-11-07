package com.shopdienthoaiAPI.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DangNhapRequestDto(
        @NotBlank(message = "Tên đăng nhập không được để trống.")
        @Size(max = 50, message = "Tên đăng nhập tối đa 50 ký tự.")
        String username,
        @NotBlank(message = "Mật khẩu không được để trống.")
        @Size(max = 20, message = "Mật khẩu tối đa 20 ký tự.")
        String password
) {
}
