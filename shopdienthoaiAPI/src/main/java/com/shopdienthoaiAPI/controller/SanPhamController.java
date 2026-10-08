package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/chitietsanpham/{maSanPham}")
    public SanPhamDto.Response findSanPhamByMaSanPham(@PathVariable String maSanPham) {
        return sanPhamService.findSanPhamByMaSanPham(maSanPham);
    }

    @PostMapping("/themsampham")
    public void themSampham(@RequestBody SanPhamDto.Request sanPhamDto) {
        sanPhamService.themSampham(sanPhamDto);
    }

    @PutMapping("/chitietsanpham/{maSanPham}")
    public void suaSanPham(@PathVariable String maSanPham, @RequestBody SanPhamDto.Request sanPhamDto) {
        SanPhamDto.Response sanPhamResponse =  sanPhamService.findSanPhamByMaSanPham(maSanPham);
        SanPhamDto.Request sanPhamRequest =
                new SanPhamDto.Request(maSanPham,  sanPhamResponse.tenSanPham(), sanPhamResponse.maDanhMuc(),
                        sanPhamResponse.giaBan(), sanPhamResponse.soLuongTon(), sanPhamResponse.moTa(), sanPhamResponse.ngayTao());
        sanPhamService.suaSanPham(sanPhamRequest);
    }
}

//user ở trang detail/sp001 user gửi put kèm requestbody
//trước tiên get sản phẩm