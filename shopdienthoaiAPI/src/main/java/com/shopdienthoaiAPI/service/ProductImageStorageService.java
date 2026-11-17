package com.shopdienthoaiAPI.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class ProductImageStorageService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    public String uploadImage(MultipartFile file) throws IOException {

        //1. Kiểm tra file
        if(file == null || file.isEmpty()) {
            throw new RuntimeException("Vui lòng chọn ảnh");
        }

        //2. Kiểm tra loại file
        String contentType = file.getContentType();

        if(contentType == null || !contentType.startsWith("image/")) {
            throw new RuntimeException("File không phải ảnh");
        }

        //3. Tạo thư mục nếu chưa tồn tại

        //4. Tạo tên file mới tránh trùng lặp
        //Lấy phần mở rộng của file
        String originalFilename = file.getOriginalFilename();
        if(originalFilename == null || !originalFilename.contains(".")) {
            throw new RuntimeException("Tên file không hợp lệ");
        }

        String extensions = originalFilename.substring(originalFilename.lastIndexOf("."));
        extensions = extensions.toLowerCase();
        if(!extensions.matches("\\.(jpg|jpeg|png|gif)")) {
            throw new RuntimeException("Định dạng không được hỗ trợ");
        }

        String fileName = UUID.randomUUID() + extensions;

        //5. Lưu ảnh
        Path directory = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(directory);
        Path targetPath = directory.resolve(fileName);

        Files.copy(file.getInputStream(), targetPath,  StandardCopyOption.REPLACE_EXISTING);

        //7. Trả về đường dẫn ảnh
        return fileName;
    }

}
