package com.shopdienthoaiAPI.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "\"SanPham\"")
public class SanPham {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaSanPham\"", nullable = false, length = 5)
    private String maSanPham;

    @Size(max = 150)
    @NotNull
    @Column(name = "\"TenSanPham\"", nullable = false, length = 150)
    private String tenSanPham;

    @NotNull
    @Column(name = "\"GiaBan\"", nullable = false, precision = 18, scale = 2)
    private BigDecimal giaBan;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "\"SoLuongTon\"", nullable = false)
    private Integer soLuongTon;

    @Size(max = 500)
    @Column(name = "\"HinhAnh\"", length = 500)
    private String hinhAnh;

    @Column(name = "\"MoTa\"", length = Integer.MAX_VALUE)
    private String moTa;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "\"NgayTao\"")
    private Instant ngayTao;

}