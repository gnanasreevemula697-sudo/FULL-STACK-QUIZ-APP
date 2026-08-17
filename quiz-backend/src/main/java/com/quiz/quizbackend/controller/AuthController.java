package com.quiz.quizbackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quiz.quizbackend.dto.AuthRequest;
import com.quiz.quizbackend.dto.AuthResponse;

@RestController
@RequestMapping("/admin")
public class AuthController {

    @Value("${admin.username:admin}")
    private String adminUsername;

    @Value("${admin.password:}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        String inputUser = authRequest.getUsername() != null ? authRequest.getUsername().trim() : "";
        String inputPassword = authRequest.getPassword() != null ? authRequest.getPassword() : "";

        if (adminUsername.equals(inputUser) && adminPassword.equals(inputPassword)) {
            return ResponseEntity.ok(new AuthResponse("mock-admin-session-token", adminUsername));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }
}
