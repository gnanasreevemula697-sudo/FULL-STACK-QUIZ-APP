package com.quiz.quizbackend.entity;

public class ResultResponse {

    private Integer id;
    private String question;
    private String userAnswer;
    private String correctAnswer;
    private String explanation;
    private boolean correct;

    public ResultResponse() {
    }

    public ResultResponse(Integer id, String question, String userAnswer,
                          String correctAnswer, String explanation, boolean correct) {
        this.id = id;
        this.question = question;
        this.userAnswer = userAnswer;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.correct = correct;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
}