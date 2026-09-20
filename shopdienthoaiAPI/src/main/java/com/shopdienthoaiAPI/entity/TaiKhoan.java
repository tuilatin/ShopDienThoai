package com.shopdienthoaiAPI.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "\"TaiKhoan\"")
public class TaiKhoan {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaTaiKhoan\"", nullable = false, length = 5)
    private String maTaiKhoan;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"MaKhachHang\"")
    private KhachHang maKhachHang;

    @Size(max = 50)
    @NotNull
    @Column(name = "\"TenDangNhap\"", nullable = false, length = 50)
    private String tenDangNhap;

    @Size(max = 255)
    @NotNull
    @Column(name = "\"MatKhauHash\"", nullable = false)
    private String matKhauHash;

    @Size(max = 20)
    @NotNull
    @ColumnDefault("'CUSTOMER'")
    @Column(name = "\"VaiTro\"", nullable = false, length = 20)
    private String vaiTro;

    @Size(max = 20)
    @NotNull
    @ColumnDefault("'ACTIVE'")
    @Column(name = "\"TrangThai\"", nullable = false, length = 20)
    private String trangThai;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "\"NgayTao\"")
    private Instant ngayTao;

}