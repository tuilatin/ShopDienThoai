package com.shopdienthoaiAPI.controller;

import com.shopdienthoaiAPI.service.ProductImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.shopdienthoaiAPI.repository.SanPhamRepository;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sanpham")
@RequiredArgsConstructor
public class ImageUploadController {
    private final ProductImageStorageService productImageStorageService;

    @PostMapping("/upload-image")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return Map.of("url", productImageStorageService.uploadImage(file));
    }
}
