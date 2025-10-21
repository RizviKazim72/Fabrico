package com.fabrico.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Authentication Response DTO
 * 
 * Response sent to frontend after successful login/registration
 * Contains JWT token and user information
 * 
 * Frontend stores this token in localStorage
 * Token is sent in Authorization header for protected API calls
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    
    @Builder.Default
    private String type = "Bearer";
    
    private Long userId;
    private String name;
    private String email;
    private String role;
    private String message;
}
