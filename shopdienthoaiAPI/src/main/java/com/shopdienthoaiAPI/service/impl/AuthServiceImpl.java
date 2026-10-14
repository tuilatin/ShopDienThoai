package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.entity.KhachHang;
import com.shopdienthoaiAPI.entity.TaiKhoan;
import com.shopdienthoaiAPI.repository.KhachHangRepository;
import com.shopdienthoaiAPI.repository.TaiKhoanRepository;
import com.shopdienthoaiAPI.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    private final KhachHangRepository khachHangRepository;
    private final TaiKhoanRepository taiKhoanRepository;
    private final PasswordEncoder passwordEncoder;

    private String generateCustomerId(){
        return khachHangRepository.findTopByOrderByMaKhachHangDesc()
                .map(khachHang -> {
                    String currentId = khachHang.getMaKhachHang();
                    int currentNumber = Integer.parseInt(currentId.substring(2));
                    return String.format("KH%03d", currentNumber + 1);
                        }).orElse("KH001");
    }

private String generateAccountId() {
    return taiKhoanRepository.findTopByOrderByMaTaiKhoanDesc()
            .map(taiKhoan -> {
                String currentId = taiKhoan.getMaTaiKhoan();
                int currentNumber = Integer.parseInt(currentId.substring(2));
                return String.format("TK%03d", currentNumber + 1);
            })
            .orElse("TK001");
}

    @Override
    public void register(DangkyRequestDto requestDto) {
        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang(generateCustomerId());
        khachHangRepository.save(khachHang);

        TaiKhoan taiKhoan = new TaiKhoan();
        taiKhoan.setMaTaiKhoan(generateAccountId());
        taiKhoan.setKhachHang(khachHang);
        taiKhoan.setTenDangNhap(requestDto.username());
        taiKhoan.setMatKhauHash(passwordEncoder.encode(requestDto.password()));
        taiKhoan.setVaiTro("CUSTOMER");
        taiKhoan.setTrangThai("ACTIVE");
        taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public DangNhapResponseDto login(DangNhapRequestDto requestDto) {
        TaiKhoan taiKhoan = taiKhoanRepository.findTaiKhoanByTenDangNhap(requestDto.username());
        if(taiKhoan != null && passwordEncoder.matches(requestDto.password(), taiKhoan.getMatKhauHash())) {
            return new DangNhapResponseDto(taiKhoan.getMaTaiKhoan()
                    ,taiKhoan.getTenDangNhap(),
                    taiKhoan.getVaiTro());
        }else {
            return;
        }
    }


}
