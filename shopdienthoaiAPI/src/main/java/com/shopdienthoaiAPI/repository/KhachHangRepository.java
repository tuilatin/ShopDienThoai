package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KhachHangRepository extends JpaRepository<KhachHang, String> {
    Optional<KhachHang> findTopByOrderByMaKhachHangDesc();
}