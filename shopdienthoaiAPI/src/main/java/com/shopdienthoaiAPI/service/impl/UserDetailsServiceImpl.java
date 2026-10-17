package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.entity.TaiKhoan;
import com.shopdienthoaiAPI.repository.TaiKhoanRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final TaiKhoanRepository taikhoanRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TaiKhoan taiKhoan = taikhoanRepository.findTaiKhoanByTenDangNhap(username);
        if (taiKhoan == null) {
            throw new UsernameNotFoundException("Không tìm thấy tài khoản");
        }

        return User.withUsername(taiKhoan.getTenDangNhap())
                .password(taiKhoan.getMatKhauHash())
                .authorities("ROLE_" + taiKhoan.getVaiTro())
                .build();
    }
}
