package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.DangNhapRequestDto;
import com.shopdienthoaiAPI.dto.DangNhapResponseDto;
import com.shopdienthoaiAPI.dto.DangkyRequestDto;
import com.shopdienthoaiAPI.dto.TaiKhoanDto;
import com.shopdienthoaiAPI.entity.KhachHang;
import com.shopdienthoaiAPI.entity.TaiKhoan;
import com.shopdienthoaiAPI.repository.KhachHangRepository;
import com.shopdienthoaiAPI.repository.TaiKhoanRepository;
import com.shopdienthoaiAPI.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {
    private final KhachHangRepository khachHangRepository;
    private final TaiKhoanRepository taiKhoanRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServiceImpl jwtService;

    private String generateCustomerId() {
        return khachHangRepository.findTopByOrderByMaKhachHangDesc()
                .map(khachHang -> {
                    String currentId = khachHang.getMaKhachHang();
                    int currentNumber = Integer.parseInt(currentId.substring(2));
                    return String.format("KH%03d", currentNumber + 1);
                })
                .orElse("KH001");
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
    @Transactional
    public void register(DangkyRequestDto requestDto) {
        if (!requestDto.password().equals(requestDto.confirmPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Mật khẩu xác nhận không khớp."
            );
        }
        if (taiKhoanRepository.existsByTenDangNhap(requestDto.username())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Tên đăng nhập đã tồn tại."
            );
        }

        KhachHang khachHang = new KhachHang();
        khachHang.setMaKhachHang(generateCustomerId());
        khachHang.setTenKhachHang(requestDto.tenKhachHang().trim());
        khachHang.setSoDienThoai(requestDto.soDienThoai().trim());
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
        if (taiKhoan != null
                && "ACTIVE".equalsIgnoreCase(taiKhoan.getTrangThai())
                && passwordEncoder.matches(requestDto.password(), taiKhoan.getMatKhauHash())) {
            return new DangNhapResponseDto(
                    taiKhoan.getMaTaiKhoan(),
                    taiKhoan.getTenDangNhap(),
                    taiKhoan.getVaiTro(),
                    jwtService.generateToken(taiKhoan.getTenDangNhap())
            );
        }
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Tên đăng nhập hoặc mật khẩu không đúng"
        );
    }

    @Override
    @Transactional(readOnly = true)
    public TaiKhoanDto.ProfileResponse getProfile(String username) {
        return toProfile(findAccount(username));
    }

    @Override
    @Transactional
    public TaiKhoanDto.ProfileResponse updateProfile(
            String username,
            TaiKhoanDto.ProfileUpdateRequest request
    ) {
        TaiKhoan taiKhoan = findAccount(username);
        KhachHang khachHang = taiKhoan.getKhachHang();
        if (khachHang == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Tài khoản này không có hồ sơ khách hàng để cập nhật."
            );
        }

        khachHang.setTenKhachHang(request.tenKhachHang().trim());
        khachHang.setSoDienThoai(request.soDienThoai().trim());
        khachHang.setEmail(normalizeOptional(request.email()));
        khachHang.setDiaChi(normalizeOptional(request.diaChi()));
        khachHangRepository.save(khachHang);
        return toProfile(taiKhoan);
    }

    private TaiKhoan findAccount(String username) {
        TaiKhoan taiKhoan = taiKhoanRepository.findTaiKhoanByTenDangNhap(username);
        if (taiKhoan == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Không tìm thấy tài khoản."
            );
        }
        return taiKhoan;
    }

    private TaiKhoanDto.ProfileResponse toProfile(TaiKhoan taiKhoan) {
        KhachHang khachHang = taiKhoan.getKhachHang();
        return new TaiKhoanDto.ProfileResponse(
                taiKhoan.getMaTaiKhoan(),
                taiKhoan.getTenDangNhap(),
                taiKhoan.getVaiTro(),
                khachHang == null ? null : khachHang.getMaKhachHang(),
                khachHang == null ? null : khachHang.getTenKhachHang(),
                khachHang == null ? null : khachHang.getSoDienThoai(),
                khachHang == null ? null : khachHang.getEmail(),
                khachHang == null ? null : khachHang.getDiaChi()
        );
    }

    private String normalizeOptional(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
