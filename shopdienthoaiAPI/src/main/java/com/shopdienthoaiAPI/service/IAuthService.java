package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;

public interface IAuthService {
    void register(DangkyRequestDto requestDto);
    DangNhapResponseDto login(DangNhapRequestDto requestDto);
}
