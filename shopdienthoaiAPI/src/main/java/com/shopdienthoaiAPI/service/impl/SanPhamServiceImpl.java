package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.DanhMuc;
import com.shopdienthoaiAPI.entity.SanPham;
import com.shopdienthoaiAPI.repository.DanhMucRepository;
import com.shopdienthoaiAPI.repository.SanPhamRepository;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements ISanPhamService {
    private final SanPhamRepository sanPhamRepository;
    private final DanhMucRepository danhMucRepository;

    @Override
    public List<SanPhamDto.Response> findAll() {
        return sanPhamRepository.findAll().stream()
                .map(sp -> new SanPhamDto.Response
                        (sp.getMaSanPham(), sp.getTenSanPham(), sp.getDanhMuc().getMaDanhMuc(),
                        sp.getGiaBan(), sp.getSoLuongTon(), sp.getHinhAnh(), sp.getMoTa(), sp.getNgayTao())).toList();
    }

    @Override
    public SanPhamDto.Response findSanPhamByMaSanPham(String maSanPham) {
        SanPham sp = sanPhamRepository.findByMaSanPham(maSanPham)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));
        return new SanPhamDto.Response(
                sp.getMaSanPham(),
                sp.getTenSanPham(),
                sp.getDanhMuc().getMaDanhMuc(),
                sp.getGiaBan(),
                sp.getSoLuongTon(),
                sp.getHinhAnh(),
                sp.getMoTa(),
                sp.getNgayTao()
        );
    }

    public String taoMaSanPham() {
        return sanPhamRepository.findTopByOrderByMaSanPhamDesc().map(
                sanPham -> {
                    String maSanPhamHienTai = sanPham.getMaSanPham();
                    int maSo = Integer.parseInt(maSanPhamHienTai.substring(2));
                    return String.format("SP%03d", maSo + 1);
                }).orElse("SP001");
    }

    @Override
    public void themSampham(SanPhamDto.Request sanPhamDto) {
        DanhMuc danhMuc = new DanhMuc();
        danhMuc.setMaDanhMuc(sanPhamDto.maDanhMuc());
        SanPham sanPham = new SanPham();
        sanPham.setMaSanPham (taoMaSanPham());
        sanPham.setTenSanPham (sanPhamDto.tenSanPham());
        sanPham.setDanhMuc(danhMuc);
        sanPham.setGiaBan (sanPhamDto.giaBan());
        sanPham.setSoLuongTon(sanPhamDto.soLuongTon());
        sanPham.setMoTa (sanPhamDto.moTa());
        sanPham.setNgayTao (Instant.now());
        sanPhamRepository.save(sanPham);
    }

    @Override
    public void suaSanPham(SanPhamDto.Request sanPhamDto) {
        DanhMuc danhMuc = danhMucRepository.findDanhMucsByMaDanhMuc((sanPhamDto.maDanhMuc()));
        SanPham sanPham = sanPhamRepository.findSanPhamsByMaSanPham(sanPhamDto.maSanPham());
        sanPham.setMaSanPham (sanPhamDto.maSanPham());
        sanPham.setTenSanPham (sanPhamDto.tenSanPham());
        sanPham.setDanhMuc(danhMuc);
        sanPham.setGiaBan (sanPhamDto.giaBan());
        sanPham.setSoLuongTon(sanPhamDto.soLuongTon());
        sanPham.setMoTa (sanPhamDto.moTa());
        sanPham.setNgayTao (Instant.now());
        sanPhamRepository.save(sanPham);
    }

    @Override
    public void xoaSanPham(String maSanPham) {
        SanPham sanPham = sanPhamRepository.findSanPhamsByMaSanPham(maSanPham);
        sanPhamRepository.delete(sanPham);
    }


}
