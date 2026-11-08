package com.shopdienthoaiAPI.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import lombok.Value;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * DTO for {@link com.shopdienthoaiAPI.entity.SanPham}
 */
@Value
public class SanPhamDto{
    public record Request(
            @NotBlank(message = "Tên sản phẩm không được để trống.")
            @Size(max = 150, message = "Tên sản phẩm tối đa 150 ký tự.")
            String tenSanPham,
            @NotBlank(message = "Vui lòng chọn danh mục.")
            @Size(max = 5, message = "Mã danh mục tối đa 5 ký tự.")
            String maDanhMuc,
            @NotNull(message = "Giá bán không được để trống.")
            @DecimalMin(value = "0.01", message = "Giá bán phải lớn hơn 0.")
            @Digits(integer = 16, fraction = 2, message = "Giá bán tối đa 16 chữ số nguyên và 2 chữ số thập phân.")
            BigDecimal giaBan,
            @NotNull(message = "Số lượng tồn không được để trống.")
            @Min(value = 0, message = "Số lượng tồn không được âm.")
            Integer soLuongTon,
            @Size(max = 500, message = "Đường dẫn ảnh tối đa 500 ký tự.")
            String hinhAnh,
            String moTa,
            Instant ngayTao
    ) {}

    // Trả dữ liệu về cho Client / React
    public record Response(
            String maSanPham, String tenSanPham, String maDanhMuc,String tenDanhMuc, BigDecimal giaBan,
            Integer soLuongTon, String hinhAnh, String moTa, Instant ngayTao
    ) {}
}