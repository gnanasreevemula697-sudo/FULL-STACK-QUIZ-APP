package com.quiz.quizbackend.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.quizbackend.entity.Question;
import com.quiz.quizbackend.entity.QuestionWrapper;
import com.quiz.quizbackend.entity.Quiz;
import com.quiz.quizbackend.entity.QuizResult;
import com.quiz.quizbackend.entity.Response;
import com.quiz.quizbackend.entity.ResultResponse;
import com.quiz.quizbackend.repository.QuestionRepository;
import com.quiz.quizbackend.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuizRepository quizRepository;

    public String createQuiz(String category, int numQ, String title) {

        List<Question> questions = questionRepository.findAll();

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);

        quizRepository.save(quiz);

        return "Success";
    }
    private List<Question> getQuestionsForQuiz(Integer id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz != null && quiz.getQuestions() != null && !quiz.getQuestions().isEmpty()) {
            return quiz.getQuestions();
        }
        return questionRepository.findAll();
    }

    public List<QuestionWrapper> getQuizQuestions(int id) {

        List<Question> questionsFromDB = getQuestionsForQuiz(id);
        List<QuestionWrapper> questionsForUser = new ArrayList<>();

        for (Question q : questionsFromDB) {
            QuestionWrapper qw = new QuestionWrapper(
                    q.getId(),
                    q.getQuestion(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4(),
                    q.getExplanation()
            );
            questionsForUser.add(qw);
        }

        return questionsForUser;
    }
    public Quiz getQuiz(int id) {
        return quizRepository.findById(id).orElse(new Quiz());
    }
    public Integer calculateResult(Integer id, List<Response> responses) {

        int right = 0;

        if (responses == null || responses.isEmpty()) return 0;

        for (Response r : responses) {
            if (r == null || r.getId() == null || r.getResponse() == null) continue;
            Question q = questionRepository.findById(r.getId()).orElse(null);
            if (q == null) continue;
            if (r.getResponse().equals(q.getCorrectAnswer())) {
                right++;
            }
        }

        return right;
    }
    public QuizResult getDetailedResult(
        Integer id,
        List<Response> responses) {

    List<ResultResponse> resultList = new ArrayList<>();

    int score = 0;

    for (Response response : responses) {

        Question question = questionRepository
                .findById(response.getId())
                .orElse(null);

        if (question == null) {
            continue;
        }

        String userAnswer = response.getResponse();

        boolean correct =
                userAnswer != null &&
                userAnswer.equals(question.getCorrectAnswer());

        if (correct) {
            score++;
        }

        resultList.add(
                new ResultResponse(
                        question.getId(),
                        question.getQuestion(),
                        userAnswer,
                        question.getCorrectAnswer(),
                        question.getExplanation(),
                        correct
                )
        );
    }

    return new QuizResult(
            score,
            resultList.size(),
            resultList
    );
}
}