package com.couplegame.repository;

import com.couplegame.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByType(Question.QuestionType type);
    List<Question> findByTypeAndLevel(Question.QuestionType type, Integer level);

    @Query(value = "SELECT * FROM questions WHERE type = ?1 ORDER BY RAND() LIMIT ?2", nativeQuery = true)
    List<Question> findRandomByType(Question.QuestionType type, int limit);
}
