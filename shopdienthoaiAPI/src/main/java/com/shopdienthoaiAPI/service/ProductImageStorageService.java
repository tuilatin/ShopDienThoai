package com.shopdienthoaiAPI.service;

import com.shopdienthoaiAPI.repository.SanPhamRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.time.Duration;
import java.time.Instant;
import java.util.stream.Stream;
import java.util.regex.Pattern;

@Slf4j
@Service
public class ProductImageStorageService {
    private static final Pattern MANAGED_FILE_NAME = Pattern.compile(
            "[0-9a-fA-F-]{36}\\.(jpg|png|gif)"
    );
    private static final Duration ORPHAN_RETENTION = Duration.ofHours(24);

    private final Path productImageDirectory;
    private final SanPhamRepository sanPhamRepository;

    public ProductImageStorageService(
            @Value("${app.upload-dir:uploads}") String uploadDirectory,
            SanPhamRepository sanPhamRepository
    ) {
        this.productImageDirectory = Paths.get(uploadDirectory)
                .toAbsolutePath()
                .normalize()
                .resolve("products")
                .normalize();
        this.sanPhamRepository = sanPhamRepository;
    }

    public boolean deleteManagedImage(String imageUrl) throws IOException {
        Path imagePath = getManagedPath(imageUrl);
        return imagePath != null && Files.deleteIfExists(imagePath);
    }

    public boolean isManagedImage(String imageUrl) {
        return getManagedPath(imageUrl) != null;
    }

    public String getImagePathSuffix(String imageUrl) {
        Path imagePath = getManagedPath(imageUrl);
        return imagePath == null
                ? null
                : "/uploads/products/" + imagePath.getFileName();
    }

    @Scheduled(fixedDelay = 3_600_000)
    public void cleanupOrphanedImages() {
        if (!Files.isDirectory(productImageDirectory)) {
            return;
        }

        Instant cutoff = Instant.now().minus(ORPHAN_RETENTION);
        try (Stream<Path> files = Files.list(productImageDirectory)) {
            files.filter(Files::isRegularFile)
                    .filter(path -> MANAGED_FILE_NAME.matcher(path.getFileName().toString()).matches())
                    .forEach(path -> cleanupIfOrphaned(path, cutoff));
        } catch (IOException exception) {
            log.error("Không thể quét thư mục ảnh sản phẩm: {}", productImageDirectory, exception);
        }
    }

    private void cleanupIfOrphaned(Path imagePath, Instant cutoff) {
        try {
            FileTime modifiedTime = Files.getLastModifiedTime(imagePath);
            if (modifiedTime.toInstant().isBefore(cutoff)) {
                String imageSuffix = "/uploads/products/" + imagePath.getFileName();
                if (!sanPhamRepository.existsByHinhAnhEndingWith(imageSuffix)) {
                    Files.deleteIfExists(imagePath);
                }
            }
        } catch (IOException | RuntimeException exception) {
            log.error("Không thể dọn ảnh mồ côi: {}", imagePath, exception);
        }
    }

    private Path getManagedPath(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) {
            return null;
        }

        String imagePath;
        try {
            imagePath = URI.create(imageUrl).getPath();
        } catch (IllegalArgumentException exception) {
            return null;
        }

        if (imagePath == null || !imagePath.startsWith("/uploads/products/")) {
            return null;
        }

        String fileName = imagePath.substring("/uploads/products/".length());
        if (!MANAGED_FILE_NAME.matcher(fileName).matches()) {
            return null;
        }

        Path resolvedPath = productImageDirectory.resolve(fileName).normalize();
        return resolvedPath.startsWith(productImageDirectory) ? resolvedPath : null;
    }
}
