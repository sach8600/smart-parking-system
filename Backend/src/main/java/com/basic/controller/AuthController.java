package com.basic.controller;

import com.basic.dto.*;
import com.basic.entity.User;
import com.basic.exception.ResourceNotFoundException;
import com.basic.service.UserService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<?>> signup(@Valid @RequestBody SignupRequest req) {
        User created = userService.registerUser(req);
        ApiResponse<Object> resp = new ApiResponse<>(true, "User registered successfully", 
            new AuthResponse(created.getId(), created.getEmail(), created.getName()));
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<?>> signin(@Valid @RequestBody AuthRequest request) {
        User user = userService.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("Account not available"));
        boolean ok = userService.checkPassword(request.getPassword(), user.getPassword());
        if (!ok) {
            return ResponseEntity.status(401).body(new ApiResponse<>(false, "Invalid credentials"));
        }
        ApiResponse<AuthResponse> resp = new ApiResponse<>(true, "Login successful",
            new AuthResponse(user.getId(), user.getEmail(), user.getName()));
        return ResponseEntity.ok(resp);
    }
}
