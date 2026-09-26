package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;

public interface IAuthService {
    void register(DangkyRequestDto requestDto);
    Boolean login(DangNhapRequestDto requestDto);
}
