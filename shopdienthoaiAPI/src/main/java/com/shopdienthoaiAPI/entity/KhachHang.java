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

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "\"KhachHang\"")
public class KhachHang {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaKhachHang\"", nullable = false, length = 5)
    private String maKhachHang;

    @Size(max = 100)
    @NotNull
    @Column(name = "\"TenKhachHang\"", nullable = false, length = 100)
    private String tenKhachHang;

    @Size(max = 20)
    @NotNull
    @Column(name = "\"SoDienThoai\"", nullable = false, length = 20)
    private String soDienThoai;

    @Size(max = 100)
    @Column(name = "\"Email\"", length = 100)
    private String email;

    @Size(max = 255)
    @Column(name = "\"DiaChi\"")
    private String diaChi;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "\"NgayTao\"")
    private Instant ngayTao;

}