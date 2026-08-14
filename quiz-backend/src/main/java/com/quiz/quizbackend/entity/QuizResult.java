package com.quiz.quizbackend.entity;

import java.util.List;

public class QuizResult {

    private int score;
    private int totalQuestions;
    private List<ResultResponse> results;

    public QuizResult() {
    }

    public QuizResult(int score, int totalQuestions, List<ResultResponse> results) {
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.results = results;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public List<ResultResponse> getResults() {
        return results;
    }

    public void setResults(List<ResultResponse> results) {
        this.results = results;
    }
}