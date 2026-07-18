package com.couplegame.controller;
import com.couplegame.dto.*;
import com.couplegame.service.AuthService;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }
    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest req) {
        try { return ApiResponse.success("Registered successfully", authService.register(req)); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        try { return ApiResponse.success("Login successful", authService.login(req)); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
}
