package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (userService.isEmailAlreadyUsed(user.getEmail())) {
            return new ResponseEntity<>("Email already in use", HttpStatus.CONFLICT);
        }
        if (userService.isPhoneNumberAlreadyUsed(user.getPhoneNumber())) {
            return new ResponseEntity<>("Phone number already in use", HttpStatus.CONFLICT);
        }
        Map<String, Object> response = userService.registerUserAndGenerateToken(user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
