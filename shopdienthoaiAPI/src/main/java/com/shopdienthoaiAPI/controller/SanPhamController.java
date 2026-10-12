package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;
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


   @GetMapping("/{maSanPham}")
    public SanPhamDto.Response findSanPhamByMaSanPham(@PathVariable String maSanPham) {
        return sanPhamService.findSanPhamByMaSanPham(maSanPham);
    }

    @PostMapping
    public void themSampham(@RequestBody SanPhamDto.Request sanPhamDto) {
        sanPhamService.themSampham(sanPhamDto);
    }

    @PutMapping("/{maSanPham}")
    public ResponseEntity<SanPhamDto.Response> suaSanPham(@PathVariable String maSanPham, @RequestBody SanPhamDto.Request sanPhamDto) {
        SanPhamDto.Response data = sanPhamService.suaSanPham( maSanPham, sanPhamDto);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{maSanPham}")
    public ResponseEntity<Void> delete(@PathVariable String maSanPham) {
        sanPhamService.xoaSanPham(maSanPham);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/timkiem", params = "tenSanPham")
    public ResponseEntity<List<SanPhamDto.Response>> timTheoTenSanPham(@RequestParam(required = false) String tenSanPham) {
        return ResponseEntity.ok(sanPhamService.timKiemSanPhamTheoTen(tenSanPham));
    }

    @GetMapping(value = "/timkiem", params = "maDanhMuc")
    public ResponseEntity<List<SanPhamDto.Response>> locTheoDanhMucSanPham(@RequestParam(required = false) String maDanhMuc) {
        return ResponseEntity.ok(sanPhamService.locTheoDanhMucSanPham(maDanhMuc));
    }

    @GetMapping("/phanTrang")
    public Page<SanPhamDto.Response> phanTrang(@PageableDefault(
            page = 0,
            size = 3
    ) Pageable pageable) {
        return sanPhamService.phanTrang(pageable);
    }
}

//user ở trang detail/sp001 user gửi put kèm requestbody
//trước tiên get sản phẩm