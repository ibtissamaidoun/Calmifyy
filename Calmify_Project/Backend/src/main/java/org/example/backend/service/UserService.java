package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;



    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User saveUser(User user) {
        // Cryptage du mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public boolean isEmailAlreadyUsed(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    public boolean isPhoneNumberAlreadyUsed(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }
    // Nouvelle méthode pour inscrire un utilisateur et générer un token
    public Map<String, Object> registerUserAndGenerateToken(User user) {
        User savedUser = saveUser(user);
        String token = jwtUtil.generateToken(savedUser.getEmail()); // Utilisation correcte de jwtUtil

        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", token);
        return response;
    }

}
