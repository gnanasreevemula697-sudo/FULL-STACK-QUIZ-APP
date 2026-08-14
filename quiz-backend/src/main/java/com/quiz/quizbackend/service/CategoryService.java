package com.quiz.quizbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quiz.quizbackend.entity.Category;
import com.quiz.quizbackend.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category addCategory(Category category) {

        if (category.getName() == null ||
                category.getName().trim().isEmpty()) {

            throw new RuntimeException("Category name is required");
        }

        category.setName(category.getName().trim());

        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new RuntimeException("Category already exists");
        }

        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category) {

        if (category.getId() == null) {
            throw new RuntimeException("Category ID is required");
        }

        if (category.getName() == null ||
                category.getName().trim().isEmpty()) {

            throw new RuntimeException("Category name is required");
        }

        category.setName(category.getName().trim());

        return categoryRepository.save(category);
    }

    public String deleteCategory(int id) {

        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found");
        }

        categoryRepository.deleteById(id);

        return "Category Deleted Successfully";
    }
}