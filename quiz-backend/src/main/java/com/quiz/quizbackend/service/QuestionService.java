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

    private void validateQuestion(Question question) {
        if (question == null) {
            throw new IllegalArgumentException("Question data is required");
        }
        if (question.getQuestion() == null || question.getQuestion().trim().isEmpty()) {
            throw new IllegalArgumentException("Question text is required");
        }
        if (question.getOption1() == null || question.getOption1().trim().isEmpty() ||
            question.getOption2() == null || question.getOption2().trim().isEmpty() ||
            question.getOption3() == null || question.getOption3().trim().isEmpty() ||
            question.getOption4() == null || question.getOption4().trim().isEmpty()) {
            throw new IllegalArgumentException("All four options (Option 1, 2, 3, 4) are required");
        }
        if (question.getCorrectAnswer() == null || question.getCorrectAnswer().trim().isEmpty()) {
            throw new IllegalArgumentException("Correct answer is required");
        }
        String correct = question.getCorrectAnswer().trim();
        String op1 = question.getOption1().trim();
        String op2 = question.getOption2().trim();
        String op3 = question.getOption3().trim();
        String op4 = question.getOption4().trim();
        if (!correct.equals(op1) && !correct.equals(op2) && !correct.equals(op3) && !correct.equals(op4)) {
            throw new IllegalArgumentException("Correct answer must match one of the four options");
        }
        if (question.getCategory() == null || question.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category is required");
        }
    }

    public Question addQuestion(Question question) {
        validateQuestion(question);
        return questionRepository.save(question);
    }

    public String updateQuestion(Question question) {
        if (question.getId() == null || !questionRepository.existsById(question.getId())) {
            throw new IllegalArgumentException("Question not found with id: " + (question != null ? question.getId() : "null"));
        }
        validateQuestion(question);
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
