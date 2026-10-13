package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.dto.SanPhamDto;
import com.shopdienthoaiAPI.entity.SanPham;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SanPhamRepository extends JpaRepository<SanPham, String> {
    SanPhamDto.Response findSanPhamByMaSanPham(@Size(max = 5) String maSanPham);
    Optional<SanPham> findTopByOrderByMaSanPhamDesc();
    Optional<SanPham> findByMaSanPham(String maSanPham);
    SanPham findSanPhamsByMaSanPham(@Size(max = 5) String maSanPham);

    List<SanPham> findSanPhamsByTenSanPham(@Size(max = 150) @NotNull String tenSanPham);

    List<SanPham> findSanPhamsByTenSanPhamContains(@Size(max = 150) @NotNull String tenSanPham);

    @Query("""
        select sp from SanPham sp
            where (:maDanhMuc is null or sp.danhMuc.maDanhMuc = :maDanhMuc)
                and (:tenSanPham is null
                    or lower(sp.tenSanPham) like lower(concat('%', :tenSanPham, '%')))
    """
    )
    Page<SanPham> timKiemVaLoc(@Param("maDanhMuc") String maDanhMuc,
                               @Param("tenSanPham") String tenSanPham,
                               Pageable pageable);


}