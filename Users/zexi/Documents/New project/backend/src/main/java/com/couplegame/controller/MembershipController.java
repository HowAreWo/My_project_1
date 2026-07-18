package com.couplegame.controller;

import com.couplegame.dto.ApiResponse;
import com.couplegame.model.*;
import com.couplegame.service.MembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService membershipService;

    @GetMapping("/plans")
    public ApiResponse<List<Map<String, Object>>> getPlans() {
        return ApiResponse.success(membershipService.getPlans());
    }

    @PostMapping("/order")
    public ApiResponse<Order> createOrder(@AuthenticationPrincipal User user,
                                           @RequestParam String planId) {
        try {
            return ApiResponse.success(membershipService.createOrder(user, planId));
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }

    @PostMapping("/pay/{orderId}")
    public ApiResponse<Order> payOrder(@AuthenticationPrincipal User user,
                                        @PathVariable Long orderId) {
        try {
            return ApiResponse.success(membershipService.payOrder(user, orderId));
        } catch (RuntimeException e) {
            return ApiResponse.error(400, e.getMessage());
        }
    }

    @GetMapping("/orders")
    public ApiResponse<List<Order>> myOrders(@AuthenticationPrincipal User user) {
        return ApiResponse.success(membershipService.getUserOrders(user.getId()));
    }

    @GetMapping("/status")
    public ApiResponse<Map<String, Object>> myStatus(@AuthenticationPrincipal User user) {
        return ApiResponse.success(Map.of(
            "membership", user.getMembership().name(),
            "expireAt", user.getMembershipExpireAt() != null ? user.getMembershipExpireAt().toString() : null
        ));
    }
}
