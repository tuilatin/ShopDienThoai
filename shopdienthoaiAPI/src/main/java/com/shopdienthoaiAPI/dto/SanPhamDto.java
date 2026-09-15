package com.shopdienthoaiAPI.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    public record Request( String maSanPham, String tenSanPham, BigDecimal giaBan,
                           Integer soLuongTon, String moTa, Instant ngayTao) {}

    // Trả dữ liệu về cho Client / React
    public record Response(
            String maSanPham, String tenSanPham, BigDecimal giaBan,
            Integer soLuongTon, String moTa
    ) {}
}