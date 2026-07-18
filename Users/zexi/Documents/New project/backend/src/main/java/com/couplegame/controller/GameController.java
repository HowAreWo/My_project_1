package com.couplegame.controller;

import com.couplegame.dto.ApiResponse;
import com.couplegame.model.Question;
import com.couplegame.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final QuestionService questionService;

    @GetMapping("/random")
    public ApiResponse<Map<String, Question>> getRandomPair() {
        try {
            return ApiResponse.success(questionService.getRandomPair());
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }

    @GetMapping("/random/truth")
    public ApiResponse<Question> getRandomTruth() {
        try {
            return ApiResponse.success(questionService.getRandomQuestion(Question.QuestionType.TRUTH));
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }

    @GetMapping("/random/dare")
    public ApiResponse<Question> getRandomDare() {
        try {
            return ApiResponse.success(questionService.getRandomQuestion(Question.QuestionType.DARE));
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }
}
