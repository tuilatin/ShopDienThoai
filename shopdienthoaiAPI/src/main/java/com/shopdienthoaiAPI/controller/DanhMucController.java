package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.dto.DanhMucDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.shopdienthoaiAPI.service.IDanhMucService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/DanhMuc")
@RequiredArgsConstructor
public class DanhMucController {

    private final IDanhMucService danhMucService;

    @GetMapping
    public ResponseEntity<List<DanhMucDto.Response>> getAllDanhMuc() {
        return ResponseEntity.ok(danhMucService.findAll());
    }

}
