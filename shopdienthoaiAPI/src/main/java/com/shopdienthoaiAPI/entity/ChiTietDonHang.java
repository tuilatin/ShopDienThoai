package com.shopdienthoaiAPI.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "\"ChiTietDonHang\"")
public class ChiTietDonHang {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaChiTiet\"", columnDefinition = "char(5)", length = 5)
    private String maChiTiet;

    @NotNull
    @Column(name = "\"SoLuong\"", nullable = false)
    private Integer soLuong;

    @NotNull
    @Column(name = "\"DonGia\"", nullable = false, precision = 18, scale = 2)
    private BigDecimal donGia;

}