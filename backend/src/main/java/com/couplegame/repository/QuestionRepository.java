package com.couplegame.repository;
import com.couplegame.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT DISTINCT q.category FROM Question q WHERE (:type IS NULL OR q.type = :type) ORDER BY q.category")
    List<String> findCategoriesByType(@Param("type") Question.QuestionType type);
}
