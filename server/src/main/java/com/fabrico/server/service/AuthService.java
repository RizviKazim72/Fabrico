package com.fabrico.server.service;

import com.fabrico.server.dto.AuthResponse;
import com.fabrico.server.dto.LoginRequest;
import com.fabrico.server.dto.RegisterRequest;
import com.fabrico.server.entity.Role;
import com.fabrico.server.entity.User;
import com.fabrico.server.repository.UserRepository;
import com.fabrico.server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Authentication Service
 * 
 * Business logic for user authentication
 * Handles:
 * 1. User Registration
 * 2. User Login
 * 3. JWT Token Generation
 * 
 * Flow Explanation:
 * 
 * REGISTRATION:
 * 1. Check if email already exists
 * 2. Hash password with BCrypt
 * 3. Save user to database
 * 4. Generate JWT token
 * 5. Return token + user info
 * 
 * LOGIN:
 * 1. Authenticate with email + password
 * 2. If valid, load user from database
 * 3. Generate JWT token
 * 4. Return token + user info
 */
@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    /**
     * Register New User
     * 
     * Step-by-step:
     * 1. Validate email not duplicate
     * 2. Create User object
     * 3. Hash password (BCrypt)
     * 4. Set default role (USER)
     * 5. Save to database
     * 6. Generate JWT token
     * 7. Build response
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash password
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(Role.USER); // Default role
        
        // Save to database
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser);
        
        // Build response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .message("Registration successful")
                .build();
    }
    
    /**
     * Login User
     * 
     * Step-by-step:
     * 1. Authenticate user (Spring Security checks password)
     * 2. If valid, load user from database
     * 3. Generate JWT token
     * 4. Build response
     * 
     * AuthenticationManager:
     * - Takes email + password
     * - Loads user from database (via UserDetailsService)
     * - Compares hashed passwords
     * - Throws exception if invalid
     */
    public AuthResponse login(LoginRequest request) {
        // Authenticate user (validates email + password)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Load user from database
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        
        // Build response
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Login successful")
                .build();
    }
}
