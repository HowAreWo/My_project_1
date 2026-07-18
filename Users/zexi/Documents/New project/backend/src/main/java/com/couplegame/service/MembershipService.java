package com.couplegame.service;

import com.couplegame.model.*;
import com.couplegame.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    private static final Map<String, PlanInfo> PLANS = Map.of(
        "monthly_vip", new PlanInfo("月度VIP", new BigDecimal("19.90"), User.MembershipType.VIP, 30),
        "yearly_vip", new PlanInfo("年度VIP", new BigDecimal("99.00"), User.MembershipType.VIP, 365),
        "monthly_svip", new PlanInfo("月度SVIP", new BigDecimal("39.90"), User.MembershipType.SVIP, 30)
    );

    public List<Map<String, Object>> getPlans() {
        return PLANS.entrySet().stream().map(e -> {
            PlanInfo p = e.getValue();
            return Map.<String, Object>of(
                "id", e.getKey(),
                "name", p.name,
                "price", p.price,
                "level", p.level.name(),
                "days", p.days
            );
        }).toList();
    }

    public Order createOrder(User user, String planId) {
        PlanInfo plan = PLANS.get(planId);
        if (plan == null) throw new RuntimeException("无效的套餐");
        Order order = Order.builder()
            .user(user)
            .planName(plan.name)
            .amount(plan.price)
            .build();
        return orderRepository.save(order);
    }

    public Order payOrder(User user, Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("订单不存在"));
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("无权操作此订单");
        }
        if (order.getStatus() != Order.OrderStatus.PENDING) {
            throw new RuntimeException("订单状态异常");
        }

        // Mock payment success
        order.setStatus(Order.OrderStatus.PAID);
        order.setPaidAt(LocalDateTime.now());
        order.setTransactionId("MOCK_" + System.currentTimeMillis());
        orderRepository.save(order);

        // Upgrade membership
        PlanInfo plan = PLANS.values().stream()
            .filter(p -> p.name.equals(order.getPlanName()))
            .findFirst().orElseThrow();

        User u = order.getUser();
        u.setMembership(plan.level);
        LocalDateTime now = LocalDateTime.now();
        if (u.getMembershipExpireAt() != null && u.getMembershipExpireAt().isAfter(now)) {
            u.setMembershipExpireAt(u.getMembershipExpireAt().plusDays(plan.days));
        } else {
            u.setMembershipExpireAt(now.plusDays(plan.days));
        }
        userRepository.save(u);
        return order;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    private record PlanInfo(String name, BigDecimal price, User.MembershipType level, int days) {}
}
