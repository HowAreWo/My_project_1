package com.couplegame.config;
import com.couplegame.service.QuestionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
@Component
public class DataInitializer implements CommandLineRunner {
    private final QuestionService questionService;
    public DataInitializer(QuestionService questionService) { this.questionService = questionService; }
    @Override public void run(String... args) { questionService.initDefaultQuestions(); }
}
