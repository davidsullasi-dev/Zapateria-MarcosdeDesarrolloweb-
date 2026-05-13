package com.example.zapatillas;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
        .authorizeHttpRequests(auth -> auth

            .requestMatchers(
                "/",
                "/login",
                "/register",
                "/css/**",
                "/js/**",
                "/img/**"
            ).permitAll()

            .anyRequest().authenticated()
        )

        // LOGIN
        .formLogin(form -> form

            .loginPage("/login")

            .defaultSuccessUrl("/", true)

            .permitAll()
        )

        // LOGOUT
        .logout(logout -> logout

            .logoutSuccessUrl("/")

            .permitAll()
        )

        .csrf(csrf -> csrf.disable());

    return http.build();
}
}