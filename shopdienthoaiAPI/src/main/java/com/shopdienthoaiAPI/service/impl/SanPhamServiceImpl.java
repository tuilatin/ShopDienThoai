package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.repository.SanPhamRepository;
import com.shopdienthoaiAPI.service.IDanhMucService;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements ISanPhamService {
    private final SanPhamRepository sanPhamRepository;

    @Override
    public List<SanPhamDto.Response> findAll() {
        return sanPhamRepository.findAll().stream()
                .map(sp -> new SanPhamDto.Response
                        (sp.getMaSanPham(), sp.getTenSanPham(),
                                sp.getGiaBan(), sp.getSoLuongTon(), sp.getMoTa())).toList();
    }
}
