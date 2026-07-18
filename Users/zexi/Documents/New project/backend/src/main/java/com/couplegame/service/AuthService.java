package com.couplegame.service;

import com.couplegame.dto.*;
import com.couplegame.model.User;
import com.couplegame.repository.UserRepository;
import com.couplegame.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }
        User user = User.builder()
            .username(req.getUsername())
            .password(passwordEncoder.encode(req.getPassword()))
            .phone(req.getPhone())
            .nickname(req.getNickname() != null ? req.getNickname() : req.getUsername())
            .gender(req.getGender())
            .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        return buildResponse(user, token);
    }

    public LoginResponse login(LoginRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
            .orElseThrow(() -> new RuntimeException("用户不存在"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        String token = jwtUtil.generateToken(user.getId(), user.getUsername());
        return buildResponse(user, token);
    }

    private LoginResponse buildResponse(User user, String token) {
        return LoginResponse.builder()
            .token(token)
            .userId(user.getId())
            .username(user.getUsername())
            .nickname(user.getNickname())
            .membership(user.getMembership().name())
            .build();
    }
}
