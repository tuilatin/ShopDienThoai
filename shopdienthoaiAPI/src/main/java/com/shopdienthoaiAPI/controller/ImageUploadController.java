package com.shopdienthoaiAPI.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
public class ImageUploadController {
    private static final long MAX_FILE_SIZE = 5L * 1024 * 1024;
    private static final long MAX_IMAGE_PIXELS = 20_000_000L;
    private static final Map<String, ImageFormat> ALLOWED_FORMATS = Map.of(
            MediaType.IMAGE_JPEG_VALUE, new ImageFormat("jpg", "JPEG"),
            MediaType.IMAGE_PNG_VALUE, new ImageFormat("png", "PNG"),
            MediaType.IMAGE_GIF_VALUE, new ImageFormat("gif", "GIF")
    );

    private final Path uploadDirectory;

    public ImageUploadController(@Value("${app.upload-dir:uploads}") String uploadDirectory) {
        this.uploadDirectory = Paths.get(uploadDirectory)
                .toAbsolutePath()
                .normalize()
                .resolve("products")
                .normalize();
    }

    @PostMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ImageUploadResponse uploadImage(@RequestPart("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vui lòng chọn ảnh.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE, "Ảnh không được vượt quá 5 MB.");
        }

        String contentType = file.getContentType();
        ImageFormat format = contentType == null ? null : ALLOWED_FORMATS.get(contentType);
        if (format == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Chỉ chấp nhận ảnh JPG, PNG hoặc GIF."
            );
        }

        try {
            validateImage(file, format);
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File tải lên không phải ảnh hợp lệ.",
                    exception
            );
        }

        String fileName = UUID.randomUUID() + "." + format.extension();
        Path destination = uploadDirectory.resolve(fileName).normalize();
        if (!destination.startsWith(uploadDirectory)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên file ảnh không hợp lệ.");
        }

        try {
            Files.createDirectories(uploadDirectory);
            try (var inputStream = file.getInputStream()) {
                Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException exception) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Không thể lưu ảnh sản phẩm.",
                    exception
            );
        }

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/products/")
                .path(fileName)
                .toUriString();
        return new ImageUploadResponse(imageUrl);
    }

    private void validateImage(MultipartFile file, ImageFormat expectedFormat) throws IOException {
        try (var inputStream = file.getInputStream();
             ImageInputStream imageInput = ImageIO.createImageInputStream(inputStream)) {
            if (imageInput == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File tải lên không phải ảnh hợp lệ.");
            }

            Iterator<ImageReader> readers = ImageIO.getImageReaders(imageInput);
            if (!readers.hasNext()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File tải lên không phải ảnh hợp lệ.");
            }

            ImageReader reader = readers.next();
            try {
                reader.setInput(imageInput, true, true);
                if (!expectedFormat.readerName().equalsIgnoreCase(reader.getFormatName())) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Định dạng nội dung ảnh không khớp với file."
                    );
                }

                int width = reader.getWidth(0);
                int height = reader.getHeight(0);
                if (width <= 0 || height <= 0 || (long) width * height > MAX_IMAGE_PIXELS) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Kích thước ảnh vượt quá giới hạn cho phép."
                    );
                }
            } finally {
                reader.dispose();
            }
        }
    }

    public record ImageUploadResponse(String url) {}

    private record ImageFormat(String extension, String readerName) {}
}
