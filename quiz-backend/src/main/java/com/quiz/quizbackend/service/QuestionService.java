package com.quiz.quizbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.quiz.quizbackend.entity.Question;
import com.quiz.quizbackend.repository.QuestionRepository;
import com.quiz.quizbackend.repository.QuizRepository;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

   public List<Question> getAllQuestions() {
    return questionRepository.findAll();
}

public List<Question> getQuestionsByCategory(Integer categoryId) {
    return questionRepository.findByCategoryId(categoryId);
}
    public Question getQuestionById(int id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Question not found with id: " + id));
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public String updateQuestion(Question question) {
        questionRepository.save(question);
        return "Question Updated Successfully";
    }

    @Transactional
    public String deleteQuestion(int id) {
        if (!questionRepository.existsById(id)) {
            throw new IllegalArgumentException("Question not found with id: " + id);
        }

        // First remove question reference from quiz_questions
        quizRepository.deleteQuestionReference(id);

        // Then delete question
        questionRepository.deleteById(id);

        return "Question Deleted Successfully";
    }
}
