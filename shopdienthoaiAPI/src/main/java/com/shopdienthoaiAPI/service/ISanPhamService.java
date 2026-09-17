package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.SanPhamDto;

import java.util.List;


public interface ISanPhamService {
  List<SanPhamDto.Response> findAll();
}
