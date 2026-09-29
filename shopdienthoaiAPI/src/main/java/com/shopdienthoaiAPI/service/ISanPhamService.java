package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import jakarta.validation.constraints.Size;

import java.util.List;


public interface ISanPhamService {
  List<SanPhamDto.Response> findAll();
  SanPhamDto.Response findSanPhamByMaSanPham(@Size(max = 5) String maSanPham);
}
