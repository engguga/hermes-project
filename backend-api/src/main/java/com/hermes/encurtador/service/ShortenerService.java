package com.hermes.encurtador.service;

import com.hermes.encurtador.entity.UrlEntity;
import com.hermes.encurtador.repository.UrlRepository;
import com.hermes.encurtador.exception.UrlNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShortenerService {
    private final UrlRepository repository;
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    @Transactional
    public String shortenUrl(String originalUrl) {
        UrlEntity url = repository.save(UrlEntity.builder().originalUrl(originalUrl).clickCount(0).build());
        String code = encode(url.getId());
        url.setShortCode(code);
        return code;
    }

    public String getOriginalUrl(String code) {
        UrlEntity url = repository.findByShortCode(code)
                .orElseThrow(() -> new UrlNotFoundException("Link path not found in Hermes archives"));
        url.setClickCount(url.getClickCount() + 1);
        repository.save(url);
        return url.getOriginalUrl();
    }

    public List<UrlEntity> getTopLinks() {
        return repository.findAllByOrderByClickCountDesc(PageRequest.of(0, 5));
    }

    private String encode(Long id) {
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(ALPHABET.charAt((int) (id % 62)));
            id /= 62;
        }
        return sb.reverse().toString();
    }
}
