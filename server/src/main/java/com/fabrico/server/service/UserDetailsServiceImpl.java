package com.fabrico.server.service;

import com.fabrico.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Custom UserDetailsService Implementation
 * 
 * Required by Spring Security for authentication
 * 
 * Purpose:
 * - Load user from database by email (username)
 * - Used by:
 *   1. AuthenticationManager during login
 *   2. JwtAuthenticationFilter during request validation
 * 
 * Flow:
 * 1. Spring Security needs to load user
 * 2. Calls loadUserByUsername(email)
 * 3. We query database
 * 4. Return User (implements UserDetails)
 * 5. Spring Security validates password/authorities
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }
}
