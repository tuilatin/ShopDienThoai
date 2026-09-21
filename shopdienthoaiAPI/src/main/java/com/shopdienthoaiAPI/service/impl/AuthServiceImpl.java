package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.entity.KhachHang;
import com.shopdienthoaiAPI.repository.KhachHangRepository;
import com.shopdienthoaiAPI.service.IAuthService;

public class AuthServiceImpl implements IAuthService {
    private KhachHangRepository khachHangRepository;

    private String generateCustomerId(){
        return khachHangRepository.findTopByMaKhachHangDesc()
                .map();
    }

    @Override
    public void register(String username, String password) {
        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang();
    }
}
