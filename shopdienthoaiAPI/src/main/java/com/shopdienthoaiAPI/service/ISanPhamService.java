package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import com.shopdienthoaiAPI.repository.SanPhamRepository;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ISanPhamService {
  List<SanPhamDto.Response> findAll();
}
