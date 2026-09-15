package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.DanhMucDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IDanhMucService {
    List<DanhMucDto.Response> findAll();
}
