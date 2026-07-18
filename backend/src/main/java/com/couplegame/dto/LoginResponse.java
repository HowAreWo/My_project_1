package com.couplegame.dto;
public class LoginResponse {
    private String token;
    private Long userId;
    private String username;
    private String nickname;
    private String membership;
    public LoginResponse() {}
    public LoginResponse(String token, Long userId, String username, String nickname, String membership) {
        this.token = token; this.userId = userId; this.username = username; this.nickname = nickname; this.membership = membership;
    }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
    public String getMembership() { return membership; }
    public void setMembership(String membership) { this.membership = membership; }
}
