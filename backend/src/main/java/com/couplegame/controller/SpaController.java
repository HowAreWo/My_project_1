package com.couplegame.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class SpaController {
    @RequestMapping({"/play", "/register", "/membership", "/punish"})
    public String forward() { return "forward:/index.html"; }
}
