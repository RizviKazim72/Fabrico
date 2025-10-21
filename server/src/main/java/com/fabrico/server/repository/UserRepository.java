package com.fabrico.server.repository;

import com.fabrico.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * User Repository
 * 
 * Data Access Layer for User entity
 * Provides database operations without writing SQL
 * 
 * JpaRepository gives us:
 * - save(), findById(), findAll(), delete()
 * - And custom queries below
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     * Used for:
     * - Login (check if email exists)
     * - Registration (check duplicate email)
     * - JWT filter (load user details)
     * 
     * Spring Data JPA automatically generates SQL:
     * SELECT * FROM users WHERE email = ?
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if email already exists
     * Used during registration to prevent duplicates
     * 
     * SQL: SELECT COUNT(*) > 0 FROM users WHERE email = ?
     */
    boolean existsByEmail(String email);
}
