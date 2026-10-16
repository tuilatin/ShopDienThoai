package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;

public interface JwtService {
    String generateToken(String tenDangNhap);
    DangNhapResponseDto validateToken(String token);

}
