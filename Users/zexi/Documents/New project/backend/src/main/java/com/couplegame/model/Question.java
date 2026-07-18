package com.couplegame.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Column(nullable = false, length = 500)
    private String content;

    @Column(nullable = false)
    private Integer level = 1;

    @Column(length = 50)
    private String category;

    public enum QuestionType {
        TRUTH, DARE
    }
}
