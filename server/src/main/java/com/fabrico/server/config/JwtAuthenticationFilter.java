package com.fabrico.server.config;

import com.fabrico.server.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT Authentication Filter
 * 
 * This filter intercepts EVERY incoming request
 * 
 * Flow:
 * 1. Client sends request with Authorization header
 *    Example: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * 
 * 2. Filter extracts JWT token from header
 * 
 * 3. Validates token using JwtUtil
 * 
 * 4. If valid, loads user from database
 * 
 * 5. Sets authentication in SecurityContext
 *    (Spring Security now knows who the user is)
 * 
 * 6. Request proceeds to controller
 * 
 * Why OncePerRequestFilter?
 * - Ensures filter runs only once per request
 * - Even if request is forwarded internally
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        
        // Step 1: Get Authorization header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        // Step 2: Check if header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // No token found, continue without authentication
            filterChain.doFilter(request, response);
            return;
        }
        
        // Step 3: Extract token (remove "Bearer " prefix)
        jwt = authHeader.substring(7);
        
        try {
            // Step 4: Extract email from token
            userEmail = jwtUtil.extractUsername(jwt);
            
            // Step 5: Check if user is not already authenticated
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                
                // Step 6: Load user details from database
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                
                // Step 7: Validate token
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    
                    // Step 8: Create authentication object
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    
                    // Step 9: Set additional details
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    
                    // Step 10: Set authentication in context
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Token is invalid, continue without authentication
            logger.error("Cannot set user authentication: {}", e);
        }
        
        // Step 11: Continue with the request
        filterChain.doFilter(request, response);
    }
}
