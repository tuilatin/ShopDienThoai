package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.service.JwtService;

public class JwtServiceImpl implements JwtService {
    @Override
    public String generateToken(DangNhapRequestDto requestDto) {

        return "";
    }

    @Override
    public DangNhapResponseDto validateToken(String token) {
        return null;
    }

}
