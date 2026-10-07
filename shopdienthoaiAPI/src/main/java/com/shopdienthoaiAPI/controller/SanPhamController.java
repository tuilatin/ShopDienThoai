package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sanpham")
@RequiredArgsConstructor
public class SanPhamController {

    private final ISanPhamService sanPhamService;

    @GetMapping
    public ResponseEntity<List<SanPhamDto.Response>> findAll() {
        return ResponseEntity.ok(sanPhamService.findAll());
    }

    @GetMapping("/chitietsanpham/{maSanPham}")
    public SanPhamDto.Response findSanPhamByMaSanPham(@PathVariable String maSanPham) {
        return sanPhamService.findSanPhamByMaSanPham(maSanPham);
    }

    @PostMapping("/themsampham")
    public void themSampham(@RequestBody SanPhamDto.Request sanPhamDto) {
         sanPhamService.themSampham(sanPhamDto);
    }

    @PutMapping(/suasam)
}
