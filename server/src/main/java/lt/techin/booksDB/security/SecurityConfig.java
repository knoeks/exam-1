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

            // --- FIX 1: REMOVE formLogin AND ADD PROPER EXCEPTION HANDLING FOR A REST API ---
            .exceptionHandling(exceptions -> exceptions
                    .authenticationEntryPoint((request, response, authException) -> {
                      // This sends a 401 Unauthorized error instead of redirecting to a login page.
                      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                    })
            )

            // This enables the "Authorization: Basic ..." header check. This is correct.
            .httpBasic(Customizer.withDefaults())

            // --- FIX 2: TELL SPRING SECURITY TO BE STATELESS ---
            // This is crucial for REST APIs that don't use server-side sessions.
            .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // --- Your authorization rules remain the same. They are correct. ---
            .authorizeHttpRequests(authorize ->
                    authorize
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                            // Ensure your registration endpoint is public
                            .requestMatchers(HttpMethod.POST, "/api/register").permitAll() // Assuming this is your reg endpoint

                            // === ADMIN-ONLY ENDPOINTS ===
                            .requestMatchers(HttpMethod.POST, "/api/servicers", "/api/mechanics").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/servicers/**", "/api/mechanics/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/servicers/**", "/api/mechanics/**").hasRole("ADMIN")

                            // === AUTHENTICATED USER ENDPOINTS (USER and ADMIN) ===
                            .requestMatchers(HttpMethod.GET, "/api/servicers/**", "/api/mechanics/**").authenticated()
                            .requestMatchers(HttpMethod.POST, "/api/mechanics/*/reviews").authenticated()
                            .requestMatchers(HttpMethod.GET, "/api/user").authenticated() // Endpoint for login verification

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