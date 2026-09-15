package com.shopdienthoaiAPI.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "\"DanhMuc\"")
public class DanhMuc {
    @Id
    @Size(max = 5)
    @Column(name = "\"MaDanhMuc\"", nullable = false, length = 5)
    private String maDanhMuc;

    @Size(max = 100)
    @NotNull
    @Column(name = "\"TenDanhMuc\"", nullable = false, length = 100)
    private String tenDanhMuc;

    @Size(max = 255)
    @Column(name = "\"MoTa\"")
    private String moTa;

}