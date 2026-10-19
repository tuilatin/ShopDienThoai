package com.shopdienthoaiAPI.config;

import com.shopdienthoaiAPI.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

//.csrf(csrf -> csrf.ignoringRequestMatchers("/api/v1/auth/**"))
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .addFilterBefore
                        (jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        ))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                        "/api/v1/auth/dangky",
                "/api/v1/auth/dangnhap",
                "/swagger-ui/**",
                "/v3/api-docs/**"
            ).permitAll()
            .requestMatchers(HttpMethod.POST, "/api/v1/sanpham").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/sanpham/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/sanpham/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
        )
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
}