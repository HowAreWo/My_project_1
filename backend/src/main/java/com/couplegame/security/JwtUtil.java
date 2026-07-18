package com.couplegame.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor(
        "couple-game-secret-key-2024-very-long-secure-key!!".getBytes(StandardCharsets.UTF_8));
    private final long expiration = 7 * 24 * 60 * 60 * 1000L;
    public String generateToken(Long userId, String username) {
        return Jwts.builder().setSubject(userId.toString()).claim("username", username)
            .setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(key).compact();
    }
    public Long getUserIdFromToken(String token) {
        return Long.parseLong(Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).getBody().getSubject());
    }
    public boolean validateToken(String token) {
        try { Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token); return true; }
        catch (JwtException e) { return false; }
    }
}
