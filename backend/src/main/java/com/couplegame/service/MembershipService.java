package com.couplegame.service;
import com.couplegame.model.*;
import com.couplegame.repository.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
@Service
public class MembershipService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    public MembershipService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository; this.userRepository = userRepository;
    }
    private static final Map<String, Object[]> PLANS = Map.of(
        "monthly_vip", new Object[]{"Monthly VIP", new BigDecimal("19.90"), User.MembershipType.VIP, 30},
        "yearly_vip", new Object[]{"Yearly VIP", new BigDecimal("99.00"), User.MembershipType.VIP, 365},
        "monthly_svip", new Object[]{"Monthly SVIP", new BigDecimal("39.90"), User.MembershipType.SVIP, 30}
    );
    public List<Map<String,Object>> getPlans() {
        List<Map<String,Object>> list = new ArrayList<>();
        for (Map.Entry<String, Object[]> e : PLANS.entrySet()) {
            Object[] p = e.getValue();
            list.add(Map.of("id",e.getKey(),"name",(String)p[0],"price",(BigDecimal)p[1],"level",((User.MembershipType)p[2]).name(),"days",(Integer)p[3]));
        }
        return list;
    }
    public Order createOrder(User user, String planId) {
        Object[] plan = PLANS.get(planId);
        if (plan == null) throw new RuntimeException("Invalid plan");
        Order order = new Order();
        order.setUser(user);
        order.setPlanName((String)plan[0]);
        order.setAmount((BigDecimal)plan[1]);
        return orderRepository.save(order);
    }
    public Order payOrder(User user, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        if (!order.getUser().getId().equals(user.getId())) throw new RuntimeException("Access denied");
        if (order.getStatus() != Order.OrderStatus.PENDING) throw new RuntimeException("Invalid order status");
        order.setStatus(Order.OrderStatus.PAID);
        order.setPaidAt(LocalDateTime.now());
        order.setTransactionId("MOCK_" + System.currentTimeMillis());
        orderRepository.save(order);
        for (Object[] p : PLANS.values()) {
            if (((String)p[0]).equals(order.getPlanName())) {
                User u = order.getUser();
                u.setMembership((User.MembershipType)p[2]);
                LocalDateTime now = LocalDateTime.now();
                if (u.getMembershipExpireAt() != null && u.getMembershipExpireAt().isAfter(now))
                    u.setMembershipExpireAt(u.getMembershipExpireAt().plusDays((Integer)p[3]));
                else u.setMembershipExpireAt(now.plusDays((Integer)p[3]));
                userRepository.save(u);
                break;
            }
        }
        return order;
    }
    public List<Order> getUserOrders(Long userId) { return orderRepository.findByUserId(userId); }
}
