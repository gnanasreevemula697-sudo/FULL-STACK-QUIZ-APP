package com.quiz.quizbackend.controller;

import com.quiz.quizbackend.entity.Quiz;
import com.quiz.quizbackend.entity.QuestionWrapper;
import com.quiz.quizbackend.entity.Response;
import com.quiz.quizbackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.quiz.quizbackend.entity.QuizResult;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public String createQuiz(@RequestParam String category,
                             @RequestParam int numQ,
                             @RequestParam String title) {

        return quizService.createQuiz(category, numQ, title);
    }

    @GetMapping("get/{id}")
    public Quiz getQuiz(@PathVariable int id) {
        return quizService.getQuiz(id);
    }

    @GetMapping("getQuestions/{id}")
    public List<QuestionWrapper> getQuizQuestions(@PathVariable Integer id) {
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("submit/{id}")
    public Integer submitQuiz(@PathVariable Integer id,
                              @RequestBody List<Response> responses) {

        return quizService.calculateResult(id, responses);
    }
    @PostMapping("submitDetails/{id}")
    public QuizResult submitDetails(
            @PathVariable Integer id,
            @RequestBody List<Response> responses) {

        return quizService.getDetailedResult(id, responses);
    }
}