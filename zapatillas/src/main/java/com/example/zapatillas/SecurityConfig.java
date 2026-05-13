package com.example.zapatillas;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // PASSWORD ENCODER
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    // SECURITY
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

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

            .formLogin(form -> form

                .loginPage("/login")

                .defaultSuccessUrl("/", true)

                .permitAll()
            )

            .logout(logout -> logout

                .logoutSuccessUrl("/")

                .permitAll()
            )

            .csrf(csrf -> csrf.disable());

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