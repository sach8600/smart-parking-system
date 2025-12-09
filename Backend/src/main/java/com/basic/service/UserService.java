package com.basic.service;

import com.basic.dto.SignupRequest;
import com.basic.entity.User;
import com.basic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(SignupRequest req) {
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail().toLowerCase());
        u.setCity(req.getCity() == null || req.getCity().isBlank() ? "Unknown" : req.getCity());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        return userRepository.save(u);
    }

    public Optional<User> findByEmail(String email) {
        if (email == null) return Optional.empty();
        return userRepository.findByEmail(email.toLowerCase());
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // helper: update password (used by forgot password flow)
    public void updatePassword(User user, String rawPassword) {
        user.setPassword(passwordEncoder.encode(rawPassword));
        userRepository.save(user);
    }
}
