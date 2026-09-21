package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KhachHangRepository extends JpaRepository<KhachHang, String> {
    <Optional> KhachHang findTopByMaKhachHangDesc();
}