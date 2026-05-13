package com.example.zapatillas;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final Map<String, UserDetails> users =
            new HashMap<>();

    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(
            PasswordEncoder passwordEncoder
    ) {

        this.passwordEncoder = passwordEncoder;

        // usuario por defecto
        addUser(
            "Piero",
            "user@gmail.com",
            "1234"
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        UserDetails user = users.get(username);

        if (user == null) {

            throw new UsernameNotFoundException(
                "Usuario no encontrado: " + username
            );
        }

        return user;
    }

    public void addUser(
            String name,
            String email,
            String password
    ) {

        users.put(email,

            User.builder()

                .username(email)

                .password(
                    passwordEncoder.encode(password)
                )

                .roles("USER")

                .build()
        );
    }
}