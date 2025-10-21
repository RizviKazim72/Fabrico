# Fabrico Authentication System - Complete Guide 🔐

Complete documentation for JWT-based authentication system in Fabrico e-commerce platform.

---

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication Flow](#authentication-flow)
3. [Backend Components](#backend-components)
4. [Frontend Components](#frontend-components)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Security Concepts](#security-concepts)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FABRICO E-COMMERCE                       │
│                                                               │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │   FRONTEND       │              │   BACKEND           │   │
│  │   (React)        │◄────────────►│   (Spring Boot)    │   │
│  │   Port: 5173     │   REST API   │   Port: 8080       │   │
│  └─────────────────┘              └─────────────────────┘   │
│         │                                    │                │
│         │ localStorage                       │ MySQL         │
│         ▼                                    ▼                │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │  JWT Token       │              │   User Database     │   │
│  │  User Info       │              │   (fabrico_db)      │   │
│  └─────────────────┘              └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- Spring Boot 3.5.6
- Spring Security 6.x
- JWT (jjwt 0.12.6)
- MySQL 8.x
- JPA/Hibernate

**Frontend:**
- React 19.x
- React Router 7.x
- Axios
- React Toastify
- Lucide Icons

---

## 🔄 Authentication Flow

### 1. Registration Flow

```
User Registration Journey:

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │     │ Frontend │     │ Backend  │     │ Database │
│  Action  │     │  React   │     │  Spring  │     │  MySQL   │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ 1. Fill Form   │                │                │
     │───────────────►│                │                │
     │                │                │                │
     │                │ 2. POST /auth/register         │
     │                │───────────────►│                │
     │                │  {name, email,  │                │
     │                │   password}     │                │
     │                │                │                │
     │                │                │ 3. Check Email │
     │                │                │───────────────►│
     │                │                │                │
     │                │                │ 4. Email OK    │
     │                │                │◄───────────────│
     │                │                │                │
     │                │                │ 5. Hash Password│
     │                │                │   (BCrypt)      │
     │                │                │                │
     │                │                │ 6. Save User   │
     │                │                │───────────────►│
     │                │                │                │
     │                │                │ 7. User Saved  │
     │                │                │◄───────────────│
     │                │                │                │
     │                │                │ 8. Generate JWT│
     │                │                │   Token         │
     │                │                │                │
     │                │ 9. Response    │                │
     │                │◄───────────────│                │
     │                │  {token, user} │                │
     │                │                │                │
     │                │ 10. Store in   │                │
     │                │   localStorage │                │
     │                │                │                │
     │ 11. Redirect   │                │                │
     │    to Home     │                │                │
     │◄───────────────│                │                │
     │                │                │                │
```

**Step-by-Step Explanation:**

1. **User fills registration form** (`SignupPage.jsx`)
   - Name, Email, Password, Confirm Password, Phone (optional)
   - Client-side validation

2. **Frontend sends POST request** (`authService.js`)
   ```javascript
   POST http://localhost:8080/api/auth/register
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "phoneNumber": "1234567890"
   }
   ```

3. **Backend validates request** (`AuthController.java`)
   - @Valid annotation checks constraints
   - Email format, password length, etc.

4. **Check if email exists** (`UserRepository.java`)
   ```sql
   SELECT COUNT(*) FROM users WHERE email = 'john@example.com'
   ```

5. **Hash password** (`AuthService.java`)
   ```java
   BCryptPasswordEncoder.encode("password123")
   // Returns: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92...
   ```

6. **Save user to database** (`UserRepository.java`)
   ```sql
   INSERT INTO users (name, email, password, role, created_at)
   VALUES ('John Doe', 'john@example.com', '$2a$10$...', 'USER', NOW())
   ```

7. **Generate JWT token** (`JwtUtil.java`)
   ```
   Token = Header.Payload.Signature
   - Header: {"alg":"HS256","typ":"JWT"}
   - Payload: {"sub":"john@example.com","iat":1234567890,"exp":1234654290}
   - Signature: HMACSHA256(base64(header)+"."+base64(payload), secret)
   ```

8. **Return response**
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "type": "Bearer",
     "userId": 1,
     "name": "John Doe",
     "email": "john@example.com",
     "role": "USER",
     "message": "Registration successful"
   }
   ```

9. **Frontend stores in localStorage** (`authService.js`)
   ```javascript
   localStorage.setItem('token', response.token);
   localStorage.setItem('user', JSON.stringify(userInfo));
   ```

10. **Update Auth Context** (`AuthContext.jsx`)
    ```javascript
    setUser(userInfo);
    setIsAuthenticated(true);
    ```

11. **Show success toast and redirect**
    ```javascript
    toast.success('Registration successful!');
    navigate('/');
    ```

---

### 2. Login Flow

```
User Login Journey:

┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │     │ Frontend │     │ Backend  │     │ Database │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │                │
     │ 1. Enter       │                │                │
     │    Credentials │                │                │
     │───────────────►│                │                │
     │                │                │                │
     │                │ 2. POST /auth/login            │
     │                │───────────────►│                │
     │                │  {email, pwd}  │                │
     │                │                │                │
     │                │                │ 3. Find User   │
     │                │                │───────────────►│
     │                │                │                │
     │                │                │ 4. User Found  │
     │                │                │◄───────────────│
     │                │                │                │
     │                │                │ 5. Compare     │
     │                │                │   Passwords    │
     │                │                │   (BCrypt)     │
     │                │                │                │
     │                │                │ 6. Generate JWT│
     │                │                │                │
     │                │ 7. Response    │                │
     │                │◄───────────────│                │
     │                │  {token, user} │                │
     │                │                │                │
     │                │ 8. Store Token │                │
     │                │                │                │
     │ 9. Redirect    │                │                │
     │◄───────────────│                │                │
```

**Key Differences from Registration:**
- No new user creation
- Password verification using BCrypt
- User must exist in database

---

### 3. Protected API Request Flow

```
Accessing Protected Resource:

┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐
│  User    │     │ Frontend │     │ JWT Filter   │     │Controller│
└────┬─────┘     └────┬─────┘     └────┬─────────┘     └────┬─────┘
     │                │                │                     │
     │ 1. Click "Cart"│                │                     │
     │───────────────►│                │                     │
     │                │                │                     │
     │                │ 2. GET /api/cart                     │
     │                │    Header:                           │
     │                │    Authorization: Bearer <token>     │
     │                │───────────────►│                     │
     │                │                │                     │
     │                │                │ 3. Extract Token    │
     │                │                │    from Header      │
     │                │                │                     │
     │                │                │ 4. Validate Token   │
     │                │                │    - Check signature│
     │                │                │    - Check expiry   │
     │                │                │                     │
     │                │                │ 5. Load User from DB│
     │                │                │                     │
     │                │                │ 6. Set Auth Context │
     │                │                │                     │
     │                │                │ 7. Forward Request  │
     │                │                │────────────────────►│
     │                │                │                     │
     │                │                │ 8. Process Request  │
     │                │                │                     │
     │                │ 9. Response    │                     │
     │                │◄───────────────┴─────────────────────│
     │                │  {cart data}   │                     │
     │                │                │                     │
     │ 10. Show Cart  │                │                     │
     │◄───────────────│                │                     │
```

---

## 🔧 Backend Components

### 1. User Entity (`User.java`)

**Purpose:** Database model representing a user

**Key Features:**
- Implements `UserDetails` (Spring Security requirement)
- Auto-generates timestamps
- BCrypt password storage
- Role-based access control

**Database Table:**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

**Important Methods:**
- `getUsername()`: Returns email (used as username)
- `getAuthorities()`: Returns user roles for authorization
- `isAccountNonExpired()`: Account validity checks

---

### 2. JWT Utility (`JwtUtil.java`)

**Purpose:** Handle all JWT operations

**Key Operations:**

1. **Token Generation**
   ```java
   public String generateToken(UserDetails userDetails) {
       // Creates JWT with:
       // - Subject: user email
       // - Issued At: current time
       // - Expiration: 24 hours
       // - Signature: HMAC SHA256
   }
   ```

2. **Token Validation**
   ```java
   public Boolean validateToken(String token, UserDetails userDetails) {
       // Checks:
       // 1. Email matches
       // 2. Token not expired
       // 3. Signature valid
   }
   ```

3. **Extract Information**
   ```java
   public String extractUsername(String token) {
       // Gets email from token payload
   }
   ```

**JWT Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.          // Header
eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.  // Payload
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c            // Signature
```

---

### 3. Security Configuration (`SecurityConfig.java`)

**Purpose:** Configure Spring Security

**Key Configurations:**

1. **Endpoint Security**
   ```java
   // Public endpoints (no authentication)
   .requestMatchers("/api/auth/**").permitAll()
   
   // Protected endpoints (JWT required)
   .anyRequest().authenticated()
   ```

2. **CORS Configuration**
   ```java
   // Allows React (localhost:5173) to call APIs
   allowedOrigins: ["http://localhost:5173"]
   allowedMethods: ["GET", "POST", "PUT", "DELETE"]
   ```

3. **Password Encryption**
   ```java
   @Bean
   public PasswordEncoder passwordEncoder() {
       return new BCryptPasswordEncoder();
   }
   ```

4. **Session Management**
   ```java
   // Stateless (no server-side sessions)
   .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
   ```

---

### 4. JWT Authentication Filter (`JwtAuthenticationFilter.java`)

**Purpose:** Intercept every request and validate JWT

**Execution Flow:**
```
Request → JwtAuthFilter → SecurityFilterChain → Controller
```

**What it does:**
1. Extracts token from `Authorization` header
2. Validates token signature and expiry
3. Loads user from database
4. Sets authentication in SecurityContext
5. Forwards request to controller

**Code Walkthrough:**
```java
@Override
protected void doFilterInternal(HttpServletRequest request, ...) {
    // 1. Get Authorization header
    String authHeader = request.getHeader("Authorization");
    
    // 2. Check if header exists and starts with "Bearer "
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }
    
    // 3. Extract token
    String jwt = authHeader.substring(7);
    String userEmail = jwtUtil.extractUsername(jwt);
    
    // 4. Load user and validate
    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
    if (jwtUtil.validateToken(jwt, userDetails)) {
        // 5. Set authentication
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
    
    // 6. Continue request
    filterChain.doFilter(request, response);
}
```

---

### 5. Auth Service (`AuthService.java`)

**Purpose:** Business logic for authentication

**Methods:**

1. **Register**
   ```java
   public AuthResponse register(RegisterRequest request) {
       // 1. Check email duplicate
       // 2. Hash password
       // 3. Save user
       // 4. Generate JWT
       // 5. Return response
   }
   ```

2. **Login**
   ```java
   public AuthResponse login(LoginRequest request) {
       // 1. Authenticate credentials
       // 2. Load user
       // 3. Generate JWT
       // 4. Return response
   }
   ```

---

### 6. Auth Controller (`AuthController.java`)

**Purpose:** REST API endpoints

**Endpoints:**

1. **POST /api/auth/register**
   - Request: `RegisterRequest` (name, email, password, phone)
   - Response: `AuthResponse` (token, user info)
   - Status: 201 CREATED

2. **POST /api/auth/login**
   - Request: `LoginRequest` (email, password)
   - Response: `AuthResponse` (token, user info)
   - Status: 200 OK

**Error Handling:**
- 400: Validation errors
- 401: Invalid credentials
- 409: Email already exists

---

## 💻 Frontend Components

### 1. API Configuration (`api.js`)

**Purpose:** Centralized HTTP client

**Features:**
- Base URL configuration
- Automatic JWT token injection
- Global error handling

**Request Interceptor:**
```javascript
api.interceptors.request.use((config) => {
    // Add JWT token to every request
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

**Response Interceptor:**
```javascript
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired, logout user
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

---

### 2. Auth Service (`authService.js`)

**Purpose:** Authentication API calls

**Functions:**

1. **register(userData)**
   ```javascript
   const response = await api.post('/auth/register', userData);
   localStorage.setItem('token', response.data.token);
   localStorage.setItem('user', JSON.stringify(userInfo));
   ```

2. **login(credentials)**
   ```javascript
   const response = await api.post('/auth/login', credentials);
   localStorage.setItem('token', response.data.token);
   ```

3. **logout()**
   ```javascript
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   ```

---

### 3. Auth Context (`AuthContext.jsx`)

**Purpose:** Global authentication state

**Why Context API?**
- Avoid prop drilling
- Share auth state across components
- Single source of truth

**Provides:**
```javascript
{
    user: {id, name, email, role},
    isAuthenticated: boolean,
    loading: boolean,
    login: (credentials) => Promise,
    register: (userData) => Promise,
    logout: () => void
}
```

**Usage in Components:**
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
    const { user, isAuthenticated, logout } = useAuth();
    
    return (
        <div>
            {isAuthenticated ? (
                <p>Welcome, {user.name}!</p>
            ) : (
                <p>Please login</p>
            )}
        </div>
    );
}
```

---

### 4. Login Page (`LoginPage.jsx`)

**Features:**
- Email + Password form
- Client-side validation
- Password visibility toggle
- Toast notifications
- Redirect after success

**Validation Rules:**
- Email: Required, valid format
- Password: Required

**Form Submission:**
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
        await login(formData);
        toast.success('Login successful!');
        navigate('/');
    } catch (error) {
        toast.error('Invalid credentials');
    }
};
```

---

### 5. Signup Page (`SignupPage.jsx`)

**Features:**
- Complete registration form
- Real-time validation
- Password confirmation
- Toast notifications

**Validation Rules:**
- Name: Min 2 characters
- Email: Valid format, unique
- Password: Min 6 characters
- Confirm Password: Must match
- Phone: Optional

---

## 📊 Data Flow Diagrams

### Complete Authentication Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA FLOW OVERVIEW                          │
└─────────────────────────────────────────────────────────────────┘

1. USER ENTERS CREDENTIALS
   ↓
2. FRONTEND VALIDATION
   ↓
3. API CALL (Axios)
   ↓
4. REQUEST INTERCEPTOR (Add JWT if exists)
   ↓
5. BACKEND RECEIVES REQUEST
   ↓
6. JWT FILTER (If token present)
   │
   ├─ Extract Token
   ├─ Validate Token
   ├─ Load User
   └─ Set Authentication
   ↓
7. SECURITY FILTER CHAIN
   │
   ├─ Check Endpoint Permissions
   └─ Allow/Deny Access
   ↓
8. CONTROLLER (@RestController)
   ↓
9. SERVICE LAYER (@Service)
   │
   ├─ Business Logic
   ├─ Password Hashing (BCrypt)
   └─ JWT Generation
   ↓
10. REPOSITORY LAYER (JPA)
    ↓
11. DATABASE (MySQL)
    ↓
12. RESPONSE BACK TO FRONTEND
    ↓
13. RESPONSE INTERCEPTOR (Handle errors)
    ↓
14. STORE IN LOCALSTORAGE
    ↓
15. UPDATE AUTH CONTEXT
    ↓
16. SHOW TOAST NOTIFICATION
    ↓
17. REDIRECT USER
```

---

## 🔒 Security Concepts

### 1. Password Hashing (BCrypt)

**What is it?**
- One-way encryption algorithm
- Cannot be decrypted (even by developer)

**How it works:**
```
Plain Password: "password123"
                    ↓
            BCrypt Algorithm
          (with random salt)
                    ↓
Hashed: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

**Why BCrypt?**
- Includes salt (prevents rainbow table attacks)
- Adaptive (can increase rounds for more security)
- Industry standard

**Verification:**
```java
// Login time
String plainPassword = "password123";
String hashedPassword = "$2a$10$N9q..."; // from database

boolean matches = passwordEncoder.matches(plainPassword, hashedPassword);
// Returns: true
```

---

### 2. JWT (JSON Web Token)

**What is JWT?**
Compact, URL-safe token for securely transmitting information.

**Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← Header
.
eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwi   ← Payload
aWF0IjoxNTE2MjM5MDIyfQ
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_   ← Signature
adQssw5c
```

**Decoded:**
```json
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "sub": "john@example.com",
  "iat": 1516239022,
  "exp": 1516325422
}

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

**Why JWT?**
- Stateless (no server-side sessions)
- Self-contained (all info in token)
- Scalable (works across multiple servers)

**Security:**
- Signature prevents tampering
- Expiration prevents indefinite access
- Secret key known only to server

---

### 3. CORS (Cross-Origin Resource Sharing)

**The Problem:**
```
Frontend: http://localhost:5173
Backend:  http://localhost:8080

Browser blocks requests by default (security)
```

**The Solution:**
Backend allows specific origins:
```java
configuration.setAllowedOrigins(List.of("http://localhost:5173"));
configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
```

---

### 4. Role-Based Access Control (RBAC)

**User Roles:**
- USER: Regular customers
- ADMIN: System administrators

**Implementation:**
```java
@PreAuthorize("hasRole('ADMIN')")
public void deleteProduct() {
    // Only admins can delete products
}
```

---

## 🧪 Testing Guide

### 1. Backend Testing (Postman)

**Register New User:**
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}

Expected Response: 201 CREATED
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "message": "Registration successful"
}
```

**Login User:**
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Expected Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  ...
}
```

**Access Protected Endpoint:**
```
GET http://localhost:8080/api/cart
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Expected Response: 200 OK with cart data
```

---

### 2. Frontend Testing

**Test Registration:**
1. Navigate to http://localhost:5173/signup
2. Fill form with valid data
3. Submit
4. Check:
   - Success toast appears
   - Redirected to home
   - Token in localStorage
   - Navbar shows user name

**Test Login:**
1. Navigate to /login
2. Enter credentials
3. Submit
4. Check localStorage and redirect

**Test Logout:**
1. Click logout button
2. Check:
   - localStorage cleared
   - Navbar shows login/signup
   - Redirected appropriately

---

## 🔍 Troubleshooting

### Common Issues

1. **CORS Error**
   ```
   Error: Access to XMLHttpRequest blocked by CORS policy
   
   Solution:
   - Check backend CORS configuration
   - Ensure frontend URL in allowedOrigins
   - Verify both servers running
   ```

2. **401 Unauthorized**
   ```
   Problem: Token expired or invalid
   
   Solution:
   - Login again to get new token
   - Check token expiration (24 hours)
   - Verify JWT secret matches
   ```

3. **JWT Signature Mismatch**
   ```
   Problem: Different secret keys
   
   Solution:
   - Ensure application.properties has correct jwt.secret
   - Restart backend after changing secret
   ```

4. **User Not Found**
   ```
   Problem: Database connection issue
   
   Solution:
   - Check MySQL running
   - Verify database credentials in application.properties
   - Check database created (fabrico_db)
   ```

---

## 📝 Best Practices

1. **Never commit JWT secret to Git**
   - Use environment variables in production
   - Generate strong secret (64+ characters)

2. **Validate on both client and server**
   - Client: Better UX
   - Server: Security

3. **Use HTTPS in production**
   - JWT tokens are sensitive
   - HTTPS encrypts data in transit

4. **Implement token refresh**
   - Short-lived access tokens
   - Long-lived refresh tokens
   - Better security

5. **Log security events**
   - Failed login attempts
   - Suspicious activity
   - Monitor logs regularly

---

## 🎯 Next Steps

1. **Add Forgot Password**
   - Email verification
   - Password reset token

2. **Implement Refresh Tokens**
   - Extend session without re-login
   - Better security

3. **Add OAuth2 Login**
   - Google, Facebook login
   - Social authentication

4. **Rate Limiting**
   - Prevent brute force attacks
   - API throttling

5. **Two-Factor Authentication**
   - SMS or Email OTP
   - Enhanced security

---

**Last Updated:** October 21, 2025  
**Author:** Fabrico Development Team
