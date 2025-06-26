package lt.techin.booksDB.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .cors().and()
            .csrf(c -> c.disable())
            .exceptionHandling(exceptions -> exceptions
                    .authenticationEntryPoint((request, response, authException) -> {
                      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                    })
            )
            .httpBasic(Customizer.withDefaults())
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(authorize ->
                    authorize
                            // === PUBLIC ENDPOINTS ===
                            // --- THIS IS THE FIX ---
                            // Anyone must be able to POST to /api/users to register.
                            .requestMatchers(HttpMethod.POST, "/api/users").permitAll()

                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // For CORS pre-flight
                            .requestMatchers("/api/auth/**").permitAll() // For any other potential auth routes

                            // === AUTHENTICATED USER ENDPOINTS ===
                            .requestMatchers(HttpMethod.GET, "/api/servicers/**", "/api/mechanics/**").authenticated()
                            .requestMatchers(HttpMethod.POST, "/api/mechanics/*/reviews").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/user").authenticated()

                            // === ADMIN-ONLY ENDPOINTS ===
                            .requestMatchers(HttpMethod.POST, "/api/servicers", "/api/mechanics").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/servicers/**", "/api/mechanics/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/servicers/**", "/api/mechanics/**").hasRole("ADMIN")

                            // All other requests must be authenticated
                            .anyRequest().authenticated()
            );

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}