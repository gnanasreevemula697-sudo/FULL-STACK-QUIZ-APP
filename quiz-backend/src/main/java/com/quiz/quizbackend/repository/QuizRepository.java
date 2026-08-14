package com.quiz.quizbackend.repository;

import com.quiz.quizbackend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM quiz_questions WHERE questions_id = ?1", nativeQuery = true)
    void deleteQuestionReference(int id);

}