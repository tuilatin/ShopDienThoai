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
  //liên quan tới hiển thị sản phẩm

  Page<SanPhamDto.Response> timKiemVaLoc(String maDanhMuc, String tenSanPham, Pageable pageable);
}
