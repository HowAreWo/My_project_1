package com.couplegame.controller;
import com.couplegame.dto.ApiResponse;
import com.couplegame.model.Punishment;
import com.couplegame.service.PunishmentService;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
@RestController @RequestMapping("/api/punishment")
public class PunishmentController {
    private final PunishmentService punishmentService;
    public PunishmentController(PunishmentService s) { this.punishmentService = s; }
    
    private Integer getInt(HttpServletRequest r, String n) { String v = r.getParameter(n); return v != null && !v.isEmpty() ? Integer.parseInt(v) : null; }
    private String getStr(HttpServletRequest r, String n) { String v = r.getParameter(n); return v != null && !v.isEmpty() ? v : null; }
    
    @GetMapping("/random")
    public ApiResponse<Punishment> getRandom(HttpServletRequest req) {
        try { return ApiResponse.success(punishmentService.getRandom(getInt(req,"level"), getStr(req,"category"))); }
        catch (RuntimeException e) { return ApiResponse.error(400, e.getMessage()); }
    }
    @GetMapping("/categories")
    public ApiResponse<List<String>> getCategories(HttpServletRequest req) {
        return ApiResponse.success(punishmentService.getCategories(getInt(req,"level")));
    }
}
