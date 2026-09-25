package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    Optional<TaiKhoan> findTopByOrderByMaTaiKhoanDesc();
}