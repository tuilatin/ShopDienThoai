package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    SanPhamDto.Response findSanPhamByMaSanPham(@Size(max = 5) String maSanPham);
    Optional<SanPham> findTopByOrderByMaSanPhamDesc();
}