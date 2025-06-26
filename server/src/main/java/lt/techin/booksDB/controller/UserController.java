package lt.techin.booksDB.controller;

import lt.techin.booksDB.model.User;
import lt.techin.booksDB.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserController(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(userService.findAllUsers());
  }

  @PostMapping("/users")
  public ResponseEntity<User> addUser(@RequestBody User user) {

    // cia reikes panaudoti
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    User savedUser = userService.saveUser(user);

    return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(savedUser.getId())
                            .toUri()
            )
            .body(savedUser);

  }

  @GetMapping("/user")
  public ResponseEntity<User> getAuthenticatedUser(@AuthenticationPrincipal User user) {
    // The 'user' parameter is automatically populated by Spring Security
    // with the details of the user who made the request.
    // If the request was not authenticated, Spring Security would have already
    // returned a 401 error before this method was even called.
    return ResponseEntity.ok(user);
  }
}
