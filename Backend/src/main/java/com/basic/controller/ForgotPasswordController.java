package com.basic.controller;

import com.basic.dto.ApiResponse;
import com.basic.service.UserService;
import com.basic.repository.UserRepository;
import com.basic.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<?>> verifyEmail(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean exists = userRepository.findByEmail(email.toLowerCase()).isPresent();
        return ResponseEntity.ok(new ApiResponse<>(true, "Email check", Map.of("exists", exists)));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Object>> resetPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("newPassword");
        return userRepository.findByEmail(email.toLowerCase())
                .map(user -> {
                    userService.updatePassword(user, newPassword);
                    return ResponseEntity.ok(new ApiResponse<>(true, "Password reset successful"));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(new ApiResponse<>(false, "Email not found")));
    }
}
