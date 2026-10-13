package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ISanPhamService {
  SanPhamDto.Response findSanPhamByMaSanPham(@Size(max = 5) String maSanPham);
  void themSampham(SanPhamDto.Request sanPhamDto);
  SanPhamDto.Response suaSanPham(String maSanPham, SanPhamDto.Request sanPhamDto);
  void xoaSanPham(String maSanPham);
  Page<SanPhamDto.Response> timKiemSanPhamTheoTen(@Size(max = 5) String maSanPham);
  Page<SanPhamDto.Response> locTheoDanhMucSanPham(String danhMuc);
  Page<SanPhamDto.Response> phanTrang(Pageable pageable);
  Page<SanPhamDto.Response> timKiemVaLoc(@Param("maDanhMuc") String maDanhMuc,
                             @Param("tenSanPham") String tenSanPham,
                             Pageable pageable);

}
