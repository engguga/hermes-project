package com.hermes.encurtador.repository;

import com.hermes.encurtador.entity.UrlEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<UrlEntity, Long> {
    Optional<UrlEntity> findByShortCode(String shortCode);
    List<UrlEntity> findAllByOrderByClickCountDesc(Pageable pageable);
}
