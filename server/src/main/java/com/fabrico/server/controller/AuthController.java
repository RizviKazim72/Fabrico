package com.fabrico.server.controller;

import com.fabrico.server.dto.AuthResponse;
import com.fabrico.server.dto.LoginRequest;
import com.fabrico.server.dto.RegisterRequest;
import com.fabrico.server.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication REST Controller
 * 
 * Exposes HTTP endpoints for authentication
 * 
 * Endpoints:
 * POST /api/auth/register - Register new user
 * POST /api/auth/login    - Login existing user
 * 
 * Request Flow:
 * 1. Frontend sends POST request with JSON body
 * 2. @Valid validates request DTO
 * 3. Controller calls AuthService
 * 4. Service returns AuthResponse with JWT
 * 5. Controller sends response to frontend
 * 
 * Example Register Request:
 * POST http://localhost:8080/api/auth/register
 * {
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "password123",
 *   "phoneNumber": "1234567890"
 * }
 * 
 * Example Login Request:
 * POST http://localhost:8080/api/auth/login
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 * 
 * Response:
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "type": "Bearer",
 *   "userId": 1,
 *   "name": "John Doe",
 *   "email": "john@example.com",
 *   "role": "USER",
 *   "message": "Login successful"
 * }
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * Register New User
     * 
     * Validates:
     * - Name: 2-100 characters
     * - Email: Valid email format, unique
     * - Password: Minimum 6 characters
     * 
     * Returns:
     * - 201 CREATED with JWT token
     * - 400 BAD REQUEST if validation fails
     * - 409 CONFLICT if email already exists
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Login User
     * 
     * Validates:
     * - Email: Valid format
     * - Password: Not blank
     * 
     * Returns:
     * - 200 OK with JWT token
     * - 401 UNAUTHORIZED if credentials invalid
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Invalid email or password"));
        }
    }
    
    /**
     * Error Response DTO
     * Simple error message wrapper
     */
    record ErrorResponse(String message) {}
}
