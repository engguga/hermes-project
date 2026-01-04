package com.hermes.encurtador.controller;

import com.hermes.encurtador.dto.UrlRequest;
import com.hermes.encurtador.entity.UrlEntity;
import com.hermes.encurtador.service.ShortenerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UrlController {
    private final ShortenerService service;

    @PostMapping("/api/v1/shorten")
    public ResponseEntity<String> shorten(@RequestBody UrlRequest request) {
        return ResponseEntity.ok(service.shortenUrl(request.getUrl()));
    }

    // Redirecionamento agora na raiz para o link ficar menor!
    @GetMapping("/{code}")
    public ResponseEntity<Void> redirect(@PathVariable String code) {
        try {
            String originalUrl = service.getOriginalUrl(code);
            return ResponseEntity.status(302).location(URI.create(originalUrl)).build();
        } catch (Exception e) {
            return ResponseEntity.status(302).location(URI.create("http://localhost:5173/?error=notfound")).build();
        }
    }

    @GetMapping("/api/v1/analytics/top")
    public ResponseEntity<List<UrlEntity>> getTop() {
        return ResponseEntity.ok(service.getTopLinks());
    }
}
