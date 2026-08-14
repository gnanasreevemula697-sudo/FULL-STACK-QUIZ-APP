package com.quiz.quizbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quiz.quizbackend.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    boolean existsByNameIgnoreCase(String name);
}