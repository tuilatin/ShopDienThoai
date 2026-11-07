package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.dto.TaiKhoanDto;
import com.shopdienthoaiAPI.service.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final IAuthService authService;

    @PostMapping("/dangky")
    public ResponseEntity<String> dangKyTaiKhoan(@Valid @RequestBody DangkyRequestDto dangkyRequestDto) {
        authService.register(dangkyRequestDto);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    @PostMapping("/dangnhap")
    public ResponseEntity<DangNhapResponseDto> dangnhapTaiKhoan(
            @Valid @RequestBody DangNhapRequestDto dangnhapRequestDto
    ) {
        DangNhapResponseDto data = authService.login(dangnhapRequestDto);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/me")
    public ResponseEntity<TaiKhoanDto.ProfileResponse> getProfile(Authentication authentication) {
        return ResponseEntity.ok(authService.getProfile(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<TaiKhoanDto.ProfileResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody TaiKhoanDto.ProfileUpdateRequest request
    ) {
        return ResponseEntity.ok(authService.updateProfile(authentication.getName(), request));
    }
}
