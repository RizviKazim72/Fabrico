# 🔧 Fabrico Backend - Spring Boot API

RESTful API backend for the Fabrico e-commerce platform built with Spring Boot.

## 📦 Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12+

## 🚀 Quick Start

### 1. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE fabrico;
\q
```

### 2. Configure Application

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/fabrico
spring.datasource.username=your_username
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-super-secret-key-minimum-256-bits-change-in-production
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### 3. Build and Run

```bash
# Build project
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

Server will start on `http://localhost:8080`

## 📁 Project Structure

```
server/
├── src/
│   ├── main/
│   │   ├── java/com/fabrico/server/
│   │   │   ├── config/                    # Configuration classes
│   │   │   │   ├── SecurityConfig.java    # Spring Security config
│   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   ├── controller/                # REST Controllers
│   │   │   │   └── AuthController.java
│   │   │   ├── dto/                       # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   └── AuthResponse.java
│   │   │   ├── entity/                    # JPA Entities
│   │   │   │   ├── User.java
│   │   │   │   └── Role.java
│   │   │   ├── repository/                # Database Repositories
│   │   │   │   └── UserRepository.java
│   │   │   ├── service/                   # Business Logic
│   │   │   │   ├── AuthService.java
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   ├── util/                      # Utility Classes
│   │   │   │   └── JwtUtil.java
│   │   │   └── FabricoApplication.java    # Main Application
│   │   └── resources/
│   │       ├── application.properties     # Configuration
│   │       ├── static/                    # Static resources
│   │       └── templates/                 # Template files
│   └── test/                              # Unit Tests
│       └── java/com/fabrico/server/
│           └── FabricoApplicationTests.java
├── target/                                # Build output
├── pom.xml                                # Maven dependencies
├── mvnw                                   # Maven wrapper (Unix)
└── mvnw.cmd                              # Maven wrapper (Windows)
```

## 🛠️ Technologies

- **Spring Boot 3.4.1** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **PostgreSQL** - Relational Database
- **JWT (io.jsonwebtoken)** - Token-based Auth
- **Lombok** - Reduce boilerplate code
- **Maven** - Build tool

## 📡 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Error Responses

```http
400 Bad Request
{
  "message": "Email already exists"
}

401 Unauthorized
{
  "message": "Invalid credentials"
}

500 Internal Server Error
{
  "message": "An error occurred"
}
```

## 🔐 Security

### JWT Authentication

- **Algorithm**: HMAC SHA-256
- **Token Expiration**: 24 hours (86400000 ms)
- **Token Location**: Authorization header
- **Format**: `Bearer <token>`

### Password Security

- Passwords are encrypted using BCrypt
- Minimum strength validation recommended

### CORS Configuration

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Update origins in production!

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Role Enum
- `USER` - Regular user
- `ADMIN` - Administrator

## 🔧 Configuration

### Application Properties

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/fabrico
spring.datasource.username=postgres
spring.datasource.password=password

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT
jwt.secret=your-secret-key-must-be-at-least-256-bits
jwt.expiration=86400000

# Server
server.port=8080

# Logging
logging.level.com.fabrico.server=DEBUG
logging.level.org.springframework.security=DEBUG
```

## 🧪 Testing

### Run Tests
```bash
./mvnw test
```

### Test Coverage
```bash
./mvnw test jacoco:report
```

## 📦 Building

### Create JAR
```bash
./mvnw clean package
```

JAR file will be created in `target/` directory.

### Run JAR
```bash
java -jar target/fabrico-0.0.1-SNAPSHOT.jar
```

## 🚀 Deployment

### Environment Variables

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/fabrico
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password
export JWT_SECRET=your-production-secret-key
export JWT_EXPIRATION=86400000
```

### Docker (Optional)

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/fabrico-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 🔍 Logging

Application uses SLF4J with Logback:

```java
@Slf4j
public class YourClass {
    log.info("Info message");
    log.error("Error message", exception);
}
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials
- Ensure database exists

### JWT Token Issues
- Verify secret key is at least 256 bits
- Check token expiration time
- Validate token format in requests

### CORS Issues
- Update `@CrossOrigin` annotation
- Check allowed origins in SecurityConfig

## 📚 Dependencies

Key dependencies in `pom.xml`:

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.6</version>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

## 🔄 Future Enhancements

- [ ] Product CRUD endpoints
- [ ] Order management
- [ ] Payment integration
- [ ] Email notifications
- [ ] File upload for product images
- [ ] Admin dashboard APIs
- [ ] Password reset functionality
- [ ] Refresh token mechanism

## 📞 Support

For issues or questions, create an issue on GitHub.

## 📝 License

This project is licensed under the MIT License.

---

**Built with ☕ and Spring Boot**
