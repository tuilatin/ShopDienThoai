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
    boolean existsByHinhAnhEndingWith(String imagePathSuffix);

    //liên quan tới hiển thị san pham
    //muốn tùy chon query ta lọc theo ma danh mục và tên sản phẩm
    //bắt đầu bằng annotation @..eu
    //rồi so sánh madanhmuc và tensanpham
    //lúc đó ta truyền 2 param là madanhmuc va tenSanPham

    @Query("""
    select sp from SanPham sp
    where (:maDanhMuc = '' or sp.danhMuc.maDanhMuc = :maDanhMuc) and 
          (:tenSanPham = '' or lower(sp.tenSanPham) like lower(concat('%', :tenSanPham, '%')) ) 
""")
    Page<SanPham> timKiemVaLoc(@Param("maDanhMuc") String maDanhMuc,
                               @Param("tenSanPham")String tenSanPham, Pageable pageable);

}