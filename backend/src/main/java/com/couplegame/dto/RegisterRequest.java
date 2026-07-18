package com.couplegame.dto;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
public class RegisterRequest {
    @NotBlank(message = "Username required")
    @Size(min = 3, max = 50)
    private String username;
    @NotBlank(message = "Password required")
    @Size(min = 6, max = 32)
    private String password;
    private String phone;
    private String nickname;
    private String gender;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
