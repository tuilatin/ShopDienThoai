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
@Table(name = "\"DonHang\"")
public class DonHang {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaDonHang\"", nullable = false, length = 5)
    private String maDonHang;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "\"NgayDatHang\"")
    private Instant ngayDatHang;

    @NotNull
    @Column(name = "\"TongTien\"", nullable = false, precision = 18, scale = 2)
    private BigDecimal tongTien;

    @Size(max = 50)
    @ColumnDefault("'Chờ xử lý'")
    @Column(name = "\"TrangThai\"", length = 50)
    private String trangThai;

    @Size(max = 255)
    @Column(name = "\"DiaChiGiaoHang\"")
    private String diaChiGiaoHang;

}