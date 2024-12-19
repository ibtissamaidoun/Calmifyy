package org.example.backend.service;

import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.util.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;



import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public User authenticateUser(String email, String password) {
        // Rechercher l'utilisateur par email
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElse(null);
    }
    public String generateTokenForUser(User user) {
        // Appeler jwtUtil pour générer un token
        return jwtUtil.generateToken(user.getEmail());
    }
    public String generateResetToken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new IllegalArgumentException("User with email not found");
        }

        // Générer un token (JWT ou UUID)
        return jwtUtil.generateToken(email); // Utilisation de JwtUtil existant
    }
    public void resetPassword(String token, String newPassword) {
        // Décoder et valider le token
        String email = jwtUtil.validateTokenAndGetEmail(token);
        if (email == null) {
            throw new IllegalArgumentException("Invalid or expired token");
        }

        // Récupérer l'utilisateur par email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Mettre à jour le mot de passe
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }


}
