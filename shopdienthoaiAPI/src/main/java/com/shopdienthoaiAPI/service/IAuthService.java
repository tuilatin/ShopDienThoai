package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.dto.TaiKhoanDto;

public interface IAuthService {
    void register(DangkyRequestDto requestDto);
    DangNhapResponseDto login(DangNhapRequestDto requestDto);
    TaiKhoanDto.ProfileResponse getProfile(String username);
    TaiKhoanDto.ProfileResponse updateProfile(
            String username,
            TaiKhoanDto.ProfileUpdateRequest request
    );
}
