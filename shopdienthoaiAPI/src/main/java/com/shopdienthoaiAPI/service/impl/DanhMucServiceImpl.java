package com.shopdienthoaiAPI.service.impl;

import com.shopdienthoaiAPI.dto.DanhMucDto;
import com.shopdienthoaiAPI.repository.DanhMucRepository;
import com.shopdienthoaiAPI.service.IDanhMucService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DanhMucServiceImpl implements IDanhMucService {
    private final DanhMucRepository danhMucRepository;


    @Override
    public List<DanhMucDto.Response> findAll() {
        return danhMucRepository.findAll().stream()
                .map(dm -> new DanhMucDto.Response(dm.getMaDanhMuc(), dm.getTenDanhMuc(), dm.getMoTa()))
                .toList()
        ;
    }
}
