package com.couplegame.model;
import javax.persistence.*;
@Entity @Table(name = "questions")
public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private QuestionType type;
    @Column(nullable = false, length = 500)
    private String content;
    @Column(nullable = false)
    private Integer level = 1;
    @Column(length = 50)
    private String category;
    public enum QuestionType { TRUTH, DARE }
    public Question() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public QuestionType getType() { return type; }
    public void setType(QuestionType type) { this.type = type; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
