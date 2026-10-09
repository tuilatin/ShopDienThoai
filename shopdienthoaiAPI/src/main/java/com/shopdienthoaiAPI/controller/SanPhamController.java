package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
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


   @GetMapping("/{maSanPham}")
    public SanPhamDto.Response findSanPhamByMaSanPham(@PathVariable String maSanPham) {
        return sanPhamService.findSanPhamByMaSanPham(maSanPham);
    }

    @PostMapping
    public void themSampham(@RequestBody SanPhamDto.Request sanPhamDto) {
        sanPhamService.themSampham(sanPhamDto);
    }

    @PutMapping("/{maSanPham}")
    public ResponseEntity<Void> suaSanPham(@PathVariable String maSanPham, @RequestBody SanPhamDto.Request sanPhamDto) {
        sanPhamService.suaSanPham(new SanPhamDto.Request(
                maSanPham,
                sanPhamDto.tenSanPham(),
                sanPhamDto.maDanhMuc(),
                sanPhamDto.giaBan(),
                sanPhamDto.soLuongTon(),
                sanPhamDto.moTa(),
                sanPhamDto.ngayTao()
        )
        );
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{maSanPham}")
    public ResponseEntity<Void> delete(@PathVariable String maSanPham) {
        sanPhamService.xoaSanPham(maSanPham);
        return ResponseEntity.noContent().build();
    }
}

//user ở trang detail/sp001 user gửi put kèm requestbody
//trước tiên get sản phẩm