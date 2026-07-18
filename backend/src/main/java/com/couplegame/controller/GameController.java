package com.couplegame.controller;
import com.couplegame.dto.ApiResponse;
import com.couplegame.model.Question;
import com.couplegame.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
@RestController @RequestMapping("/api/game")
public class GameController {
    private final QuestionService questionService;
    public GameController(QuestionService questionService) { this.questionService = questionService; }
    
    private Integer getIntParam(HttpServletRequest req, String name) {
        String v = req.getParameter(name);
        return v != null && !v.isEmpty() ? Integer.parseInt(v) : null;
    }
    private String getStrParam(HttpServletRequest req, String name) {
        String v = req.getParameter(name);
        return v != null && !v.isEmpty() ? v : null;
    }
    
    @GetMapping("/random")
    public ApiResponse<Map<String, Question>> getRandomPair(HttpServletRequest req) {
        try { return ApiResponse.success(questionService.getRandomPair(getIntParam(req,"level"), getStrParam(req,"category"))); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
    @GetMapping("/random/truth")
    public ApiResponse<Question> getRandomTruth(HttpServletRequest req) {
        try { return ApiResponse.success(questionService.getRandomQuestion(Question.QuestionType.TRUTH, getIntParam(req,"level"), getStrParam(req,"category"))); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
    @GetMapping("/random/dare")
    public ApiResponse<Question> getRandomDare(HttpServletRequest req) {
        try { return ApiResponse.success(questionService.getRandomQuestion(Question.QuestionType.DARE, getIntParam(req,"level"), getStrParam(req,"category"))); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
    @GetMapping("/categories")
    public ApiResponse<List<String>> getCategories(HttpServletRequest req) {
        String type = getStrParam(req, "type");
        Question.QuestionType qt = null;
        if (type != null) {
            try { qt = Question.QuestionType.valueOf(type.toUpperCase()); } catch (IllegalArgumentException e) {}
        }
        return ApiResponse.success(questionService.getCategories(qt));
    }
}
