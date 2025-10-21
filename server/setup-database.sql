-- Fabrico Database Setup Script
-- Run this script to create database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS fabrico_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE fabrico_db;

-- Show created database
SELECT 'Database fabrico_db created successfully!' AS Status;

-- Note: Tables will be auto-created by Hibernate when you run the Spring Boot application
-- spring.jpa.hibernate.ddl-auto=update setting creates tables automatically

-- If you want to create users table manually (optional):
-- CREATE TABLE users (
--     id BIGINT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(100) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     phone_number VARCHAR(20),
--     role VARCHAR(20) NOT NULL DEFAULT 'USER',
--     created_at DATETIME NOT NULL,
--     updated_at DATETIME,
--     PRIMARY KEY (id),
--     UNIQUE KEY uk_email (email)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
