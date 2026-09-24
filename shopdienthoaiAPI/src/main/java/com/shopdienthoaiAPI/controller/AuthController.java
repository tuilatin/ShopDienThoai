package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.service.IAuthService;
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
    private final IAuthService authService;

    @PostMapping("/dangKy")
    public ResponseEntity<String> dangKyTaiKhoan(@RequestBody DangkyRequestDto dangkyRequestDto) {
        authService.register(dangkyRequestDto);
        return ResponseEntity.ok("Đăng ký thành công");
    }
}
