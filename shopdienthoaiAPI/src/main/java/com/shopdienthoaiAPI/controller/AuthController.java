package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private TaiKhoanRepository taiKhoanRepository;

  @PostMapping("/dangKy")
    public ResponseEntity<String> dangKyTaiKhoan(@RequestBody String tenDangNhap,
                                                 String matKhau){
        taiKhoanRepository
  }
}
