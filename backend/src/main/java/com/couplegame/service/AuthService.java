package com.couplegame.service;
import com.couplegame.dto.*;
import com.couplegame.model.User;
import com.couplegame.repository.UserRepository;
import com.couplegame.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository; this.passwordEncoder = passwordEncoder; this.jwtUtil = jwtUtil;
    }
    public LoginResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) throw new RuntimeException("Username already exists");
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setNickname(req.getNickname() != null ? req.getNickname() : req.getUsername());
        user.setGender(req.getGender());
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        return buildResponse(user, token);
    }
    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByUsername(req.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) throw new RuntimeException("Wrong password");
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        return buildResponse(user, token);
    }
    private LoginResponse buildResponse(User user, String token) {
        return new LoginResponse(token, user.getId(), user.getUsername(), user.getNickname(), user.getMembership().name());
    }
}
