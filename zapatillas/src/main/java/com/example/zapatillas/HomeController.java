package com.example.zapatillas;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class HomeController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @GetMapping("/")
    public String home(Model model) {

        List<Producto> productos = List.of(
            new Producto("Vortex Runner X1", "Running alto rendimiento", 180, "sinmarca.jpg"),
            new Producto("Apex Trainer", "Para gimnasio", 150, "sinmarca2.jpg"),
            new Producto("NeoFlow", "Casual moderno", 220, "sinmarca3.jpg")
        );

        model.addAttribute("productos", productos);

        return "index";
    }

    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        userDetailsService.addUser(email, password);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
