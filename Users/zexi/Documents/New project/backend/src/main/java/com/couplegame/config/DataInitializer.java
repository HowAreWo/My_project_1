package com.couplegame.config;

import com.couplegame.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final QuestionService questionService;

    @Override
    public void run(String... args) {
        questionService.initDefaultQuestions();
    }
}
