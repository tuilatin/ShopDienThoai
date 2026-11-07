package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.DanhMuc;
import com.shopdienthoaiAPI.entity.SanPham;
import com.shopdienthoaiAPI.repository.DanhMucRepository;
import com.shopdienthoaiAPI.repository.SanPhamRepository;
import com.shopdienthoaiAPI.service.ISanPhamService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class SanPhamServiceImpl implements ISanPhamService {
    private final SanPhamRepository sanPhamRepository;
    private final DanhMucRepository danhMucRepository;


    public Page<SanPhamDto.Response> convertToPageSanPhamResponse(Page<SanPham> sanPhams){
        return sanPhams.map(sp -> new SanPhamDto.Response(
                sp.getMaSanPham(),
                sp.getTenSanPham(),
                sp.getDanhMuc() == null ? null : sp.getDanhMuc().getMaDanhMuc(),
                sp.getGiaBan(),
                sp.getSoLuongTon(),
                sp.getHinhAnh(),
                sp.getMoTa(),
                sp.getNgayTao()
        ));
    }

    public SanPhamDto.Response convertToSanPhamDto(SanPham sp){
        return new SanPhamDto.Response(  sp.getMaSanPham(),
                sp.getTenSanPham(),
                sp.getDanhMuc() == null ? null : sp.getDanhMuc().getMaDanhMuc(),
                sp.getGiaBan(),
                sp.getSoLuongTon(),
                sp.getHinhAnh(),
                sp.getMoTa(),
                sp.getNgayTao());
    }

    @Override
    public Page<SanPhamDto.Response> timKiemVaLoc(String maDanhMuc, String tenSanPham, Pageable pageable) {
        Page<SanPham> sanPhams = sanPhamRepository.timKiemVaLoc(maDanhMuc, tenSanPham, pageable);
                return convertToPageSanPhamResponse(sanPhams);
    }

    @Override
    public SanPhamDto.Response findSanPhamByMaSanPham(String maSanPham) {
        return convertToSanPhamDto(timSanPham(maSanPham));
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
        DanhMuc danhMuc = timDanhMuc(sanPhamDto.maDanhMuc());
        SanPham sanPham = new SanPham();
        sanPham.setMaSanPham (taoMaSanPham());
        sanPham.setTenSanPham (sanPhamDto.tenSanPham());
        sanPham.setDanhMuc(danhMuc);
        sanPham.setGiaBan (sanPhamDto.giaBan());
        sanPham.setSoLuongTon(sanPhamDto.soLuongTon());
        sanPham.setHinhAnh (sanPhamDto.hinhAnh());
        sanPham.setMoTa (sanPhamDto.moTa());
        sanPham.setNgayTao (Instant.now());
        sanPhamRepository.save(sanPham);
    }

    @Override
    public SanPhamDto.Response suaSanPham(String maSanPham,SanPhamDto.Request sanPhamDto) {
        DanhMuc danhMuc = timDanhMuc(sanPhamDto.maDanhMuc());
        SanPham sanPham = timSanPham(maSanPham);
        sanPham.setMaSanPham (maSanPham);
        sanPham.setTenSanPham (sanPhamDto.tenSanPham());
        sanPham.setDanhMuc(danhMuc);
        sanPham.setGiaBan (sanPhamDto.giaBan());
        sanPham.setSoLuongTon(sanPhamDto.soLuongTon());
        sanPham.setHinhAnh(sanPhamDto.hinhAnh());
        sanPham.setMoTa (sanPhamDto.moTa());
        SanPham sanPhamDaLuu = sanPhamRepository.save(sanPham);
        return convertToSanPhamDto(sanPhamDaLuu);
    }

    @Override
    public void xoaSanPham(String maSanPham) {
        sanPhamRepository.delete(timSanPham(maSanPham));
    }

    private SanPham timSanPham(String maSanPham) {
        return sanPhamRepository.findByMaSanPham(maSanPham)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy sản phẩm"));
    }

    private DanhMuc timDanhMuc(String maDanhMuc) {
        if (maDanhMuc == null || maDanhMuc.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Mã danh mục không được để trống.");
        }
        return danhMucRepository.findById(maDanhMuc)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Không tìm thấy danh mục."));
    }

}
