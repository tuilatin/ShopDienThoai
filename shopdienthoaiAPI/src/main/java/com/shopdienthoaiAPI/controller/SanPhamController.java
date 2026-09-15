package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/SanPham")
@RequiredArgsConstructor
public class SanPhamController {

    private final ISanPhamService sanPhamService;

    @GetMapping
    public ResponseEntity<List<SanPhamDto.Response>> findAll() {
        return ResponseEntity.ok(sanPhamService.findAll());
    }
}
