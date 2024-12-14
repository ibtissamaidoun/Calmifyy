package org.example.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    public SecretKey getSigningKey() {
        // Décoder la clé si elle est encodée en Base64
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .signWith(getSigningKey()) // Utiliser une clé suffisamment longue
                .compact();
    }

    public boolean validateToken(String token, String email) {
        String subject = extractEmail(token);
        return (subject.equals(email) && !isTokenExpired(token));
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        // Si la clé est encodée en Base64, la décoder
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Jwts.parser()
                .setSigningKey(decodedKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
