package com.example.zapatillas;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final Map<String, UserDetails> users = new HashMap<>();

    public CustomUserDetailsService() {

        // Usuario por defecto
        addUser("Piero", "user", "password");

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

    // REGISTRAR USUARIO
    public void addUser(String name, String email, String password) {

    users.put(email,

        User.withDefaultPasswordEncoder()

            .username(email)

            .password(password)

            .roles("USER")

            .build()
    );
}
}