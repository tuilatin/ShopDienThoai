package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IAuthService authService;

    @PostMapping("/dangky")
    public ResponseEntity<String> dangKyTaiKhoan(@RequestBody DangkyRequestDto dangkyRequestDto) {
        authService.register(dangkyRequestDto);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/dangnhap")
    public ResponseEntity<String> dangnhapTaiKhoan(@RequestBody DangNhapRequestDto dangnhapRequestDto) {
        if(authService.login(dangnhapRequestDto)){
            return ResponseEntity.ok("Đăng nhập thành công rồi bạn ơi");
        };

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên đăng nhập hoặc mật khẩu không đúng");

    }
}
