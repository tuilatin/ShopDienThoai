package com.shopdienthoaiAPI.repository;

import com.shopdienthoaiAPI.entity.DanhMuc;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
    DanhMuc findDanhMucsByMaDanhMuc(@Size(max = 5) String maDanhMuc);
}