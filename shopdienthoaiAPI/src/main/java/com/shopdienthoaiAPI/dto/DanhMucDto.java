package com.shopdienthoaiAPI.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DanhMucDto {

    public record Request(@NotBlank(message = "Mã danh mục không được để trống")
                          @Size(max = 5, message = "Mã danh mục tối đa 5 ký tự")
                          String maDanhMuc,

                          @NotBlank(message = "Tên danh mục không được để trống")
                          @Size(max = 100, message = "Tên danh mục tối đa 100 ký tự")
                          String tenDanhMuc,

                          @Size(max = 255, message = "Mô tả tối đa 255 ký tự")
                          String moTa) {}

    // Trả dữ liệu về cho Client / React
    public record Response(
            String maDanhMuc,
            String tenDanhMuc,
            String moTa
    ) {}

}
