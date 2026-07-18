package com.couplegame.repository;
import com.couplegame.model.Punishment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface PunishmentRepository extends JpaRepository<Punishment, Long> {
    @Query("SELECT DISTINCT p.category FROM Punishment p ORDER BY p.category")
    List<String> findAllCategories();
    @Query("SELECT DISTINCT p.category FROM Punishment p WHERE (:level IS NULL OR p.level = :level) ORDER BY p.category")
    List<String> findCategoriesByLevel(@Param("level") Integer level);
}
