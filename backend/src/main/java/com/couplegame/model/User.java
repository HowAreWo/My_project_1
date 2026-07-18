package com.couplegame.model;
import javax.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false, length = 50)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, length = 20)
    private String phone;
    @Column(length = 100)
    private String nickname;
    @Column(length = 10)
    private String gender;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private MembershipType membership = MembershipType.FREE;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    private LocalDateTime membershipExpireAt;
    @PrePersist protected void onCreate() { createdAt = LocalDateTime.now(); }
    public enum MembershipType { FREE, VIP, SVIP }
    public User() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
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
    public MembershipType getMembership() { return membership; }
    public void setMembership(MembershipType membership) { this.membership = membership; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getMembershipExpireAt() { return membershipExpireAt; }
    public void setMembershipExpireAt(LocalDateTime membershipExpireAt) { this.membershipExpireAt = membershipExpireAt; }
}
