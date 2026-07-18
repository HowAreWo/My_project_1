package com.couplegame.dto;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
public class LoginRequest {
    @NotBlank(message = "Username required")
    private String username;
    @NotBlank(message = "Password required")
    private String password;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
