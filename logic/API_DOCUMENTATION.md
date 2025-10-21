# API Documentation 📡

Complete REST API reference for Fabrico e-commerce backend.

---

## 🌐 Base URL

**Development:** `http://localhost:8080/api`  
**Production:** `https://api.fabrico.com/api` (planned)

---

## 🔐 Authentication

### Overview

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

**Token Format:**
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Token Expiration:** 24 hours (86400000 ms)

---

## 📋 API Endpoints

### 1. Authentication Endpoints

#### Register New User

**Endpoint:** `POST /api/auth/register`  
**Access:** Public  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phoneNumber": "1234567890"
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format, unique
- `password`: Required, min 6 characters
- `phoneNumber`: Optional, 10-20 characters

**Success Response (201 CREATED):**
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

**Error Responses:**

*400 Bad Request - Validation Error:*
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "email": "Email must be valid",
    "password": "Password must be at least 6 characters"
  }
}
```

*409 Conflict - Email Already Exists:*
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 409,
  "error": "Conflict",
  "message": "Email already registered"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "1234567890"
  }'
```

---

#### Login User

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "message": "Login successful"
}
```

**Error Responses:**

*401 Unauthorized - Invalid Credentials:*
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid email or password"
}
```

*400 Bad Request:*
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email and password are required"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### 2. Product Endpoints (Planned)

#### Get All Products

**Endpoint:** `GET /api/products`  
**Access:** Public  
**Query Parameters:**
- `page`: Page number (default: 0)
- `size`: Items per page (default: 20)
- `category`: Filter by category
- `sort`: Sort field (price, name, createdAt)
- `order`: Sort order (asc, desc)

**Example Request:**
```
GET /api/products?page=0&size=10&category=electronics&sort=price&order=asc
```

**Success Response (200 OK):**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 999.99,
      "stock": 50,
      "category": "electronics",
      "imageUrl": "https://...",
      "rating": 4.5,
      "reviewCount": 120
    }
  ],
  "totalElements": 100,
  "totalPages": 10,
  "currentPage": 0,
  "pageSize": 10
}
```

---

#### Get Product by ID

**Endpoint:** `GET /api/products/{id}`  
**Access:** Public  

**Success Response (200 OK):**
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Detailed product description",
  "price": 999.99,
  "stock": 50,
  "category": "electronics",
  "imageUrl": "https://...",
  "rating": 4.5,
  "reviewCount": 120,
  "specifications": {
    "brand": "Samsung",
    "model": "XYZ-123",
    "warranty": "1 year"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Product not found with id: 1"
}
```

---

### 3. Cart Endpoints (Planned)

#### Get User Cart

**Endpoint:** `GET /api/cart`  
**Access:** Protected (JWT required)  

**Success Response (200 OK):**
```json
{
  "items": [
    {
      "id": 1,
      "productId": 5,
      "productName": "Product Name",
      "price": 999.99,
      "quantity": 2,
      "subtotal": 1999.98,
      "imageUrl": "https://..."
    }
  ],
  "totalItems": 3,
  "totalAmount": 5999.97
}
```

---

#### Add to Cart

**Endpoint:** `POST /api/cart/add`  
**Access:** Protected (JWT required)  

**Request Body:**
```json
{
  "productId": 5,
  "quantity": 2
}
```

**Success Response (201 CREATED):**
```json
{
  "message": "Product added to cart",
  "cartId": 1,
  "totalItems": 4
}
```

---

#### Update Cart Item

**Endpoint:** `PUT /api/cart/{itemId}`  
**Access:** Protected (JWT required)  

**Request Body:**
```json
{
  "quantity": 3
}
```

**Success Response (200 OK):**
```json
{
  "message": "Cart updated",
  "totalAmount": 6999.97
}
```

---

#### Remove from Cart

**Endpoint:** `DELETE /api/cart/{itemId}`  
**Access:** Protected (JWT required)  

**Success Response (200 OK):**
```json
{
  "message": "Item removed from cart",
  "totalItems": 2
}
```

---

### 4. Order Endpoints (Planned)

#### Create Order

**Endpoint:** `POST /api/orders`  
**Access:** Protected (JWT required)  

**Request Body:**
```json
{
  "items": [
    {
      "productId": 5,
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "CREDIT_CARD"
}
```

**Success Response (201 CREATED):**
```json
{
  "orderId": 1,
  "orderNumber": "ORD-2024-001",
  "status": "PENDING",
  "totalAmount": 1999.98,
  "message": "Order placed successfully"
}
```

---

#### Get User Orders

**Endpoint:** `GET /api/orders`  
**Access:** Protected (JWT required)  

**Success Response (200 OK):**
```json
{
  "orders": [
    {
      "orderId": 1,
      "orderNumber": "ORD-2024-001",
      "status": "SHIPPED",
      "totalAmount": 1999.98,
      "createdAt": "2024-10-20T10:30:00",
      "itemCount": 2
    }
  ]
}
```

---

#### Get Order Details

**Endpoint:** `GET /api/orders/{orderId}`  
**Access:** Protected (JWT required)  

**Success Response (200 OK):**
```json
{
  "orderId": 1,
  "orderNumber": "ORD-2024-001",
  "status": "SHIPPED",
  "totalAmount": 1999.98,
  "createdAt": "2024-10-20T10:30:00",
  "items": [
    {
      "productId": 5,
      "productName": "Product Name",
      "quantity": 2,
      "price": 999.99,
      "subtotal": 1999.98
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}
```

---

## 🔒 Authentication Flow

### How JWT Works

```
1. User Login/Register
   ↓
2. Server Validates Credentials
   ↓
3. Server Generates JWT Token
   ↓
4. Client Stores Token (localStorage)
   ↓
5. Client Sends Token in Headers for Protected Routes
   ↓
6. Server Validates Token
   ↓
7. Server Returns Requested Data
```

### Token Structure

**Header:**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload:**
```json
{
  "sub": "john@example.com",
  "iat": 1516239022,
  "exp": 1516325422
}
```

**Signature:**
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## ⚠️ Error Codes

| Status Code | Description | Common Causes |
|------------|-------------|---------------|
| 400 | Bad Request | Invalid input, validation errors |
| 401 | Unauthorized | Missing/invalid JWT token, wrong credentials |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate email, resource already exists |
| 500 | Internal Server Error | Server-side error, database connection issues |

---

## 📊 Response Format

### Standard Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Standard Error Response

```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Detailed error message",
  "path": "/api/auth/register"
}
```

---

## 🧪 Testing with Postman

### Setup

1. Create new collection "Fabrico API"
2. Add environment variables:
   - `baseUrl`: http://localhost:8080/api
   - `token`: (will be set automatically)

### Register User

```
POST {{baseUrl}}/auth/register

Body:
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123",
  "phoneNumber": "1234567890"
}

Tests Script:
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.be.a('string');
    pm.environment.set("token", jsonData.token);
});
```

### Login User

```
POST {{baseUrl}}/auth/login

Body:
{
  "email": "test@example.com",
  "password": "test123"
}

Tests Script:
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Save token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("token", jsonData.token);
});
```

### Protected Endpoint

```
GET {{baseUrl}}/cart

Headers:
Authorization: Bearer {{token}}
```

---

## 🔄 Rate Limiting (Planned)

**Limits:**
- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- Login attempts: 5 attempts/15 minutes

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1634789200
```

**Rate Limit Exceeded (429):**
```json
{
  "timestamp": "2024-10-21T10:30:00",
  "status": 429,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again in 60 seconds."
}
```

---

## 📝 Best Practices

### Frontend Integration

**Axios Example:**
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

// Request interceptor (add JWT token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (handle errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Error Handling

```javascript
try {
  const response = await api.post('/auth/login', credentials);
  return response.data;
} catch (error) {
  if (error.response) {
    // Server responded with error
    throw new Error(error.response.data.message);
  } else if (error.request) {
    // Request made but no response
    throw new Error('Network error. Please check your connection.');
  } else {
    // Something else happened
    throw new Error('An unexpected error occurred.');
  }
}
```

---

## 🔐 Security Headers

**Recommended Response Headers:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

**Last Updated:** October 21, 2025  
**API Version:** 1.0  
**Author:** Fabrico Development Team
