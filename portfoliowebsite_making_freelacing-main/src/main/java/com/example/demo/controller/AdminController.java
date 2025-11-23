package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginReq) {
        User user = userRepository.findByEmailAndRole(loginReq.getEmail(), "admin");
        if (user != null && BCrypt.checkpw(loginReq.getPassword(), user.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Invalid admin credentials");
    }
}
