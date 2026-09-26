package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.entity.TaiKhoan;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    Optional<TaiKhoan> findTopByOrderByMaTaiKhoanDesc();
    TaiKhoan findTaiKhoanByTenDangNhap(@Size(max = 50) @NotNull String tenDangNhap);
}