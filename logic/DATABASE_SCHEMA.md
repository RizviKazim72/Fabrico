# Database Schema Documentation 🗄️

Complete database structure and relationships for Fabrico e-commerce platform.

---

## 📊 Database Overview

**Database Name:** `fabrico_db`  
**Database Type:** MySQL 8.x  
**ORM:** Hibernate/JPA  
**Connection URL:** `jdbc:mysql://localhost:3306/fabrico_db`

---

## 🔧 Configuration

### Spring Boot Configuration (`application.properties`)

```properties
# Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/fabrico_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

**DDL Auto Modes:**
- `update`: Creates/updates tables automatically (Development)
- `create`: Drops and recreates tables each time (Testing)
- `validate`: Only validates schema, no changes (Production)
- `none`: No action

---

## 📋 Tables

### 1. Users Table

**Purpose:** Store user account information

**Table Name:** `users`

**Schema:**
```sql
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Columns:**

| Column Name | Data Type | Nullable | Description |
|------------|-----------|----------|-------------|
| id | BIGINT | NO | Auto-increment primary key |
| name | VARCHAR(100) | NO | User's full name |
| email | VARCHAR(255) | NO | User's email (unique, used as username) |
| password | VARCHAR(255) | NO | BCrypt hashed password |
| phone_number | VARCHAR(20) | YES | User's phone number |
| role | VARCHAR(20) | NO | User role (USER/ADMIN) |
| created_at | DATETIME | NO | Account creation timestamp |
| updated_at | DATETIME | YES | Last update timestamp |

**Indexes:**
- PRIMARY KEY: `id`
- UNIQUE KEY: `email`

**Constraints:**
- Email must be unique
- Password stored as BCrypt hash ($2a$10$...)
- Role defaults to 'USER'
- Timestamps auto-generated

**Sample Data:**
```sql
INSERT INTO users (id, name, email, password, phone_number, role, created_at) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye...', '1234567890', 'USER', NOW()),
(2, 'Admin User', 'admin@fabrico.com', '$2a$10$xK8pL3mN5oQ9rS4tU6vW7...', '9876543210', 'ADMIN', NOW());
```

---

## 🔑 Java Entity Mapping

### User Entity (`User.java`)

```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

**Annotations Explained:**

- `@Entity`: Marks class as JPA entity
- `@Table(name = "users")`: Maps to 'users' table
- `@Id`: Marks primary key
- `@GeneratedValue(strategy = GenerationType.IDENTITY)`: Auto-increment ID
- `@Column`: Maps field to column
- `@Enumerated(EnumType.STRING)`: Stores enum as string ("USER" or "ADMIN")
- `@PrePersist`: Runs before INSERT
- `@PreUpdate`: Runs before UPDATE

---

## 🔍 Queries

### Repository Interface (`UserRepository.java`)

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email (used for login)
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if email already exists (used for registration)
     */
    boolean existsByEmail(String email);
}
```

**Generated SQL:**

1. **findByEmail:**
```sql
SELECT * FROM users WHERE email = ?
```

2. **existsByEmail:**
```sql
SELECT COUNT(*) > 0 FROM users WHERE email = ?
```

3. **save (new user):**
```sql
INSERT INTO users (name, email, password, phone_number, role, created_at)
VALUES (?, ?, ?, ?, ?, ?)
```

4. **save (update user):**
```sql
UPDATE users 
SET name = ?, email = ?, password = ?, phone_number = ?, role = ?, updated_at = ?
WHERE id = ?
```

5. **findById:**
```sql
SELECT * FROM users WHERE id = ?
```

6. **deleteById:**
```sql
DELETE FROM users WHERE id = ?
```

---

## 📈 Future Tables (Planned)

### 2. Products Table

```sql
CREATE TABLE products (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    category VARCHAR(50),
    image_url VARCHAR(500),
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3. Orders Table

```sql
CREATE TABLE orders (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4. Order Items Table

```sql
CREATE TABLE order_items (
    id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 5. Cart Table

```sql
CREATE TABLE cart (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🔗 Entity Relationships (Future)

```
users
  ├─ One-to-Many → orders
  └─ One-to-Many → cart

products
  ├─ One-to-Many → order_items
  └─ One-to-Many → cart

orders
  ├─ Many-to-One → users
  └─ One-to-Many → order_items

order_items
  ├─ Many-to-One → orders
  └─ Many-to-One → products

cart
  ├─ Many-to-One → users
  └─ Many-to-One → products
```

**ER Diagram:**
```
┌──────────┐       ┌──────────┐       ┌──────────────┐
│  users   │──────<│  orders  │>──────│ order_items  │
└──────────┘   1:N └──────────┘  1:N  └──────────────┘
     │ 1:N                                    N:1 │
     │                                            │
     │                                            ▼
     │                                    ┌──────────┐
     │                                    │ products │
     │                                    └──────────┘
     │ 1:N                                    N:1 │
     │                                            │
     ▼                                            │
┌──────────┐                                     │
│   cart   │────────────────────────────────────┘
└──────────┘                 N:1
```

---

## 🛠️ Database Operations

### Create Database (MySQL Command Line)

```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE fabrico_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Grant privileges
GRANT ALL PRIVILEGES ON fabrico_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Use database
USE fabrico_db;

-- Show tables
SHOW TABLES;

-- Describe users table
DESCRIBE users;
```

### Useful Queries

**Count total users:**
```sql
SELECT COUNT(*) FROM users;
```

**Find users by role:**
```sql
SELECT * FROM users WHERE role = 'ADMIN';
```

**Recent registrations:**
```sql
SELECT name, email, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;
```

**Update user role:**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'john@example.com';
```

**Delete user:**
```sql
DELETE FROM users WHERE id = 5;
```

---

## 🔒 Security Considerations

1. **Password Storage:**
   - Never store plain passwords
   - Use BCrypt (automatic in Spring Security)
   - Password column length: 255 (BCrypt hash length)

2. **Email Validation:**
   - Unique constraint on email column
   - Email format validation at application level
   - Consider email verification for production

3. **Soft Delete (Recommended):**
   ```sql
   ALTER TABLE users ADD COLUMN deleted_at DATETIME;
   ```
   Instead of deleting, set deleted_at timestamp

4. **Audit Trail:**
   ```sql
   CREATE TABLE user_audit (
       id BIGINT NOT NULL AUTO_INCREMENT,
       user_id BIGINT NOT NULL,
       action VARCHAR(50) NOT NULL,
       timestamp DATETIME NOT NULL,
       PRIMARY KEY (id)
   );
   ```

---

## 📊 Performance Optimization

### Indexes

**Current Indexes:**
- PRIMARY KEY on `id` (auto-created)
- UNIQUE KEY on `email` (auto-created)

**Recommended Additional Indexes:**
```sql
-- For role-based queries
CREATE INDEX idx_role ON users(role);

-- For date range queries
CREATE INDEX idx_created_at ON users(created_at);
```

### Query Optimization Tips

1. **Use Pagination:**
```java
Pageable pageable = PageRequest.of(0, 20);
Page<User> users = userRepository.findAll(pageable);
```

2. **Fetch Only Required Columns:**
```java
@Query("SELECT u.id, u.name, u.email FROM User u WHERE u.role = :role")
List<Object[]> findUsersByRole(@Param("role") Role role);
```

3. **Use Caching:**
```java
@Cacheable("users")
Optional<User> findByEmail(String email);
```

---

## 🧪 Testing Queries

### Sample Test Data

```sql
-- Insert test users
INSERT INTO users (name, email, password, phone_number, role, created_at) VALUES
('Test User 1', 'test1@example.com', '$2a$10$test...', '1111111111', 'USER', NOW()),
('Test User 2', 'test2@example.com', '$2a$10$test...', '2222222222', 'USER', NOW()),
('Test Admin', 'admin@test.com', '$2a$10$test...', '3333333333', 'ADMIN', NOW());
```

### Verify Data

```sql
-- Check all users
SELECT id, name, email, role, created_at FROM users;

-- Check password hash format
SELECT email, LEFT(password, 20) AS password_prefix FROM users;

-- Find duplicate emails (should be 0)
SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;
```

---

## 📝 Migration Scripts

### Version 1.0 → 1.1 (Example)

```sql
-- Add profile picture column
ALTER TABLE users ADD COLUMN profile_picture VARCHAR(500) AFTER phone_number;

-- Add email verification
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN verification_token VARCHAR(255);
```

---

## 🔄 Backup & Restore

### Backup Database

```bash
# Full backup
mysqldump -u root -p fabrico_db > backup_fabrico_$(date +%Y%m%d).sql

# Backup only schema
mysqldump -u root -p --no-data fabrico_db > schema_fabrico.sql

# Backup only data
mysqldump -u root -p --no-create-info fabrico_db > data_fabrico.sql
```

### Restore Database

```bash
# Restore from backup
mysql -u root -p fabrico_db < backup_fabrico_20241021.sql
```

---

**Last Updated:** October 21, 2025  
**Schema Version:** 1.0  
**Author:** Fabrico Development Team
