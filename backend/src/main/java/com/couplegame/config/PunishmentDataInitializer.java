package com.couplegame.config;
import com.couplegame.service.PunishmentService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
@Component
public class PunishmentDataInitializer implements CommandLineRunner {
    private final PunishmentService punishmentService;
    public PunishmentDataInitializer(PunishmentService s) { this.punishmentService = s; }
    @Override public void run(String... args) { punishmentService.initDefaultPunishments(); }
}
