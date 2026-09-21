package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.entity.KhachHang;
import com.shopdienthoaiAPI.entity.TaiKhoan;
import com.shopdienthoaiAPI.repository.KhachHangRepository;
import com.shopdienthoaiAPI.repository.TaiKhoanRepository;
import com.shopdienthoaiAPI.service.IAuthService;
import jakarta.persistence.Table;

public class AuthServiceImpl implements IAuthService {
    private KhachHangRepository khachHangRepository;
    private TaiKhoanRepository taiKhoanRepository;

    private String generateCustomerId(){
        return khachHangRepository.findTopByMaKhachHangDesc()
                .map(khachHang -> {
                    String currentId = khachHang.getMaKhachHang();
                    int currentNumber = Integer.parseInt(currentId.substring(2));
                    return String.format("KH%03d", currentNumber + 1);
                        }).orElse("KH001");
    }

    private String generateAccountId(){
        return khachHangRepository.findTopByMaKhachHangDesc()
                .map(khachHang -> {
                    String currentId = khachHang.getMaKhachHang();
                    int currentNumber = Integer.parseInt(currentId.substring(2));
                    return String.format("TK%03d", currentNumber + 1);
                }).orElse("TK001");
    }

    @Override
    public void register(String username, String password) {
        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang(generateCustomerId());
        khachHangRepository.save(khachHang);

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(generateAccountId());
        taiKhoan.setKhachHang(khachHang);
        taiKhoan.setTenDangNhap(username);
        taiKhoan.setMatKhauHash(password);
        taiKhoanRepository.save(taiKhoan);
    }
}
