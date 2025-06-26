package lt.techin.booksDB.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


// nurodo kad cia beanas (ensusije tiesiogiai su Spring Sec)
@Configuration
// nurodo kad cia SecurityFilterChain - Spring Sec konfiguracija
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            //ijungtas by default ir
            // uzkomentuot nepades, reikia disablint
            // DISABLE ONLY FOR DEV PURPOSES!!!!!
            .csrf(c -> c.disable())
            .httpBasic(Customizer.withDefaults())
            .formLogin(Customizer.withDefaults())

            // cia galime nurody kas turi prieiga prie kokiu kokiu metodu ir prie kokiu endpointu
            .authorizeHttpRequests(authorize ->
                    authorize
                            // === ADMIN-ONLY ENDPOINTS ===
                            // Admins can manage servicers (Create, Update, Delete)
                            .requestMatchers(HttpMethod.POST, "/api/servicers").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/servicers/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/servicers/**").hasRole("ADMIN")

                            // Admins can manage mechanics (Create, Update, Delete)
                            .requestMatchers(HttpMethod.POST, "/api/mechanics").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.PUT, "/api/mechanics/**").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE, "/api/mechanics/**").hasRole("ADMIN")

                            // === AUTHENTICATED USER ENDPOINTS (USER and ADMIN) ===
                            // Any logged-in user can view servicers and mechanics
                            .requestMatchers(HttpMethod.GET, "/api/servicers/**", "/api/mechanics/**").authenticated()

                            // Any logged-in user can rate a mechanic (create a review)
                            .requestMatchers(HttpMethod.POST, "/api/mechanics/*/reviews").authenticated()


                            // === PUBLIC ENDPOINTS ===
                            // Anyone can register a new user account
                            .requestMatchers(HttpMethod.POST, "/api/users").permitAll()

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
