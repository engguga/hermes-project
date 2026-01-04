package com.hermes.encurtador.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "urls")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UrlEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String originalUrl;
    @Column(unique = true)
    private String shortCode;
    private LocalDateTime createdAt;
    private int clickCount;
    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
