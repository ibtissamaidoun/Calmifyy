package org.example.backend.controller;

import jakarta.validation.Valid;
import org.example.backend.model.User;
import org.example.backend.service.UserService;
import org.example.backend.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
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
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        // Extraire l'email et le mot de passe de l'utilisateur
        String email = loginUser.getEmail();
        String password = loginUser.getPassword();

        // Authentifier l'utilisateur via le service
        User authenticatedUser = userService.authenticateUser(email, password);

        if (authenticatedUser == null) {
            // Si l'authentification échoue, retourner une réponse UNAUTHORIZED
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }

        // Générer un token pour l'utilisateur authentifié
        String token = userService.generateTokenForUser(authenticatedUser);

        // Construire la réponse
        Map<String, Object> response = new HashMap<>();
        response.put("user", authenticatedUser);
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String token) {
        // Optionnel : Invalider le token en l'ajoutant à une liste noire
        String jwtToken = token.replace("Bearer ", ""); // Supprime le préfixe "Bearer "
        jwtUtil.addToBlacklist(jwtToken);

        // Réponse de succès
        return new ResponseEntity<>("Déconnexion réussie", HttpStatus.OK);
    }


}
