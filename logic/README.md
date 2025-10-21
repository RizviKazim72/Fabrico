# Fabrico Documentation 📚

Complete technical documentation for the Fabrico E-commerce Platform.

---

## 📖 Overview

Welcome to the Fabrico documentation! Yeh folder mein complete technical details hain project ki - architecture, authentication flow, database schema, API endpoints, aur step-by-step setup guide.

**College Project:** Final Year  
**Marks:** 50  
**Tech Stack:** React + Spring Boot + MySQL  
**Authentication:** JWT-based stateless authentication  

---

## 📁 Documentation Files

### 1. **AUTHENTICATION_GUIDE.md** 🔐
**Size:** ~15,000 words  
**Purpose:** Complete JWT authentication system ki detailed explanation

**Covers:**
- ✅ Registration Flow (step-by-step with diagrams)
- ✅ Login Flow (credentials → JWT → localStorage)
- ✅ Protected API Requests (JWT validation)
- ✅ Backend Components (JwtUtil, SecurityConfig, Filters)
- ✅ Frontend Components (AuthContext, authService, api.js)
- ✅ Security Concepts (BCrypt, JWT structure, CORS)
- ✅ Testing Guide (Postman examples)
- ✅ Troubleshooting (common issues & solutions)

**Read this first** if you want to understand:
- JWT kaise kaam karta hai
- Backend mein Spring Security kaise configured hai
- Frontend mein Context API kaise use ho raha hai
- Token kaise generate aur validate hota hai
- localStorage mein data kaise store ho raha hai

---

### 2. **DATABASE_SCHEMA.md** 🗄️
**Purpose:** MySQL database structure and queries

**Covers:**
- ✅ Users Table (columns, indexes, constraints)
- ✅ JPA Entity Mapping (User.java explained)
- ✅ Repository Queries (findByEmail, existsByEmail)
- ✅ Future Tables (Products, Orders, Cart - planned)
- ✅ Entity Relationships (ER diagrams)
- ✅ Performance Optimization (indexes, pagination)
- ✅ Backup & Restore commands

**Read this** if you want to:
- Database schema samajhna hai
- SQL queries dekhne hain
- JPA annotations samajhne hain
- Future tables plan dekhna hai

---

### 3. **API_DOCUMENTATION.md** 📡
**Purpose:** REST API endpoints reference

**Covers:**
- ✅ Authentication Endpoints (register, login)
- ✅ Request/Response formats
- ✅ Error codes & messages
- ✅ cURL examples
- ✅ Postman test scripts
- ✅ Future endpoints (products, cart, orders)
- ✅ Rate limiting (planned)

**Read this** if you want to:
- API endpoints test karne hain
- Request body format chahiye
- Error handling samajhna hai
- Postman setup karna hai

---

### 4. **FRONTEND_ARCHITECTURE.md** 🎨
**Purpose:** React frontend structure and data flow

**Covers:**
- ✅ Project Structure (folder organization)
- ✅ Component Architecture (Logo, Navbar, Hero, Products)
- ✅ Data Flow (Component → Context → Service → API)
- ✅ Auth Context (global state management)
- ✅ Auth Service (API call wrappers)
- ✅ Axios Configuration (interceptors explained)
- ✅ Page Components (Login, Signup logic)
- ✅ Tailwind v4 Theme (custom variables)
- ✅ Protected Routes (implementation guide)

**Read this** if you want to:
- Frontend architecture samajhna hai
- Component ka code samajhna hai
- Context API kaise use ho raha hai
- Axios interceptors ka logic samajhna hai
- State management samajhna hai

---

### 5. **QUICKSTART_GUIDE.md** 🚀
**Purpose:** Step-by-step setup guide for running project

**Covers:**
- ✅ Prerequisites (Node, Java, MySQL installation)
- ✅ Database Setup (create database, tables)
- ✅ Backend Setup (Maven install, run server)
- ✅ Frontend Setup (npm install, run dev server)
- ✅ Verification Steps (test registration, login)
- ✅ Troubleshooting (common errors & fixes)
- ✅ Daily Workflow (start/stop commands)

**Read this FIRST** if you want to:
- Project ko locally run karna hai
- Setup errors fix karne hain
- Daily development workflow samajhna hai

---

## 🎯 Reading Order

### For Complete Understanding:

```
1. QUICKSTART_GUIDE.md       (Setup project)
   ↓
2. AUTHENTICATION_GUIDE.md   (Understand auth flow)
   ↓
3. DATABASE_SCHEMA.md        (Database structure)
   ↓
4. API_DOCUMENTATION.md      (API endpoints)
   ↓
5. FRONTEND_ARCHITECTURE.md  (Frontend code)
```

### For Specific Tasks:

**Just want to run the project?**
→ `QUICKSTART_GUIDE.md` (Steps 1-5)

**Want to understand JWT authentication?**
→ `AUTHENTICATION_GUIDE.md` (Section 2: Authentication Flow)

**Need to test APIs?**
→ `API_DOCUMENTATION.md` (Section 1: Authentication Endpoints)

**Want to modify frontend?**
→ `FRONTEND_ARCHITECTURE.md` (Section 3: Component Architecture)

**Need database queries?**
→ `DATABASE_SCHEMA.md` (Section 3: Queries)

---

## 🔑 Key Concepts Summary

### Authentication Flow (High-Level)

```
1. User registers/logs in
   ↓
2. Backend validates credentials
   ↓
3. Backend generates JWT token
   ↓
4. Frontend stores token in localStorage
   ↓
5. Frontend adds token to all API requests
   ↓
6. Backend validates token on each request
   ↓
7. Backend returns requested data
```

### Data Flow (Complete)

```
User Action (Click Login)
  ↓
LoginPage Component
  ↓
useAuth() hook
  ↓
AuthContext.login()
  ↓
authService.login()
  ↓
api.post('/auth/login')
  ↓
Axios Request Interceptor (Add JWT)
  ↓
Backend API (AuthController)
  ↓
AuthService (Validate credentials)
  ↓
UserRepository (Database query)
  ↓
JwtUtil (Generate token)
  ↓
Response back to frontend
  ↓
Axios Response Interceptor (Check status)
  ↓
Store in localStorage
  ↓
Update Auth Context
  ↓
Show Toast Notification
  ↓
Redirect to Home
  ↓
Navbar re-renders (shows user name)
```

---

## 🛠️ Tech Stack Details

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Spring Boot | 3.5.6 | Backend framework |
| Spring Security | 6.x | Authentication & Authorization |
| JWT (jjwt) | 0.12.6 | Token generation/validation |
| MySQL | 8.x | Database |
| JPA/Hibernate | - | ORM (Object-Relational Mapping) |
| Lombok | - | Reduce boilerplate code |
| Maven | - | Dependency management |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.1.1 | UI framework |
| Vite | 7.1.11 | Build tool & dev server |
| React Router | 7.x | Client-side routing |
| Tailwind CSS | 4.1.15 | Styling (utility-first) |
| Axios | - | HTTP client |
| React Toastify | - | Toast notifications |
| Lucide React | - | Icon library |

---

## 📊 Project Statistics

**Backend:**
- Total Java Files: 11
- Lines of Code: ~800
- Entities: 1 (User)
- Controllers: 1 (AuthController)
- Services: 2 (AuthService, UserDetailsServiceImpl)
- Repositories: 1 (UserRepository)
- DTOs: 3 (LoginRequest, RegisterRequest, AuthResponse)
- Configurations: 2 (SecurityConfig, JwtAuthenticationFilter)
- Utilities: 1 (JwtUtil)

**Frontend:**
- Total React Files: 11
- Lines of Code: ~1200
- Pages: 3 (Home, Login, Signup)
- Components: 4 (Logo, Navbar, Hero, FeaturedProducts)
- Services: 2 (api.js, authService.js)
- Context: 1 (AuthContext)

**Documentation:**
- Total Files: 5
- Total Words: ~25,000
- Total Pages (printed): ~100

---

## 🎓 Learning Resources

### Understanding JWT
- Video: "What is JWT?" by Web Dev Simplified
- Article: jwt.io/introduction
- **Our Doc:** `AUTHENTICATION_GUIDE.md` (Section 6: Security Concepts)

### Spring Security
- Official Docs: spring.io/guides/gs/securing-web
- Video: "Spring Security Crash Course" by Amigoscode
- **Our Doc:** `AUTHENTICATION_GUIDE.md` (Section 3: Backend Components)

### React Context API
- Official Docs: react.dev/learn/passing-data-deeply-with-context
- Video: "React Context & Hooks Tutorial" by Net Ninja
- **Our Doc:** `FRONTEND_ARCHITECTURE.md` (Section 2: Auth Context)

### MySQL
- Tutorial: w3schools.com/mysql
- **Our Doc:** `DATABASE_SCHEMA.md` (Section 4: Queries)

---

## 🔄 Version History

### Version 1.0 (Current)
- ✅ JWT Authentication (complete)
- ✅ User Registration & Login
- ✅ Protected Routes (backend)
- ✅ Auth Context (frontend)
- ✅ Toast Notifications
- ✅ Responsive Navbar
- ✅ Landing Page
- ✅ Documentation (complete)

### Version 1.1 (Planned)
- ⏳ Products Listing Page
- ⏳ Add to Cart functionality
- ⏳ Cart Page
- ⏳ Checkout Flow
- ⏳ Order History
- ⏳ Admin Panel

### Version 2.0 (Future)
- 🔮 Payment Integration
- 🔮 Email Verification
- 🔮 Forgot Password
- 🔮 Product Reviews & Ratings
- 🔮 Search & Filters
- 🔮 Wishlist

---

## 🐛 Known Issues

1. **Tailwind v4 Lint Warnings**
   - Issue: `bg-gradient-to-br` should be `bg-linear-to-br`
   - Impact: None (code works fine)
   - Status: Will fix in v1.1

2. **Node Version Warning**
   - Issue: Package requires Node 20.19+, using 20.17
   - Impact: None (project runs fine)
   - Status: Update Node when convenient

---

## 📞 Contact & Support

**Project Maintainers:**
- Developer: Fabrico Team
- College: [Your College Name]
- Batch: Final Year
- Project Guide: [Guide Name]

**For Queries:**
1. Read relevant documentation first
2. Check troubleshooting sections
3. Search known issues
4. Ask project guide

---

## 📝 Contributing (Future)

### Code Style

**Java:**
- Follow Google Java Style Guide
- Use meaningful variable names
- Add JSDoc comments

**JavaScript:**
- Use ES6+ features
- Prefer functional components
- Use PropTypes for validation

**Database:**
- Use snake_case for columns
- Add indexes for foreign keys
- Document schema changes

---

## 🎯 Project Goals

### Academic Requirements ✅
- [x] JWT-based authentication
- [x] RESTful API design
- [x] Database integration
- [x] Responsive frontend
- [x] Clean code architecture
- [x] Comprehensive documentation

### Additional Features ✅
- [x] Toast notifications
- [x] Form validation
- [x] Error handling
- [x] CORS configuration
- [x] Password encryption
- [x] Token expiration

### Future Enhancements ⏳
- [ ] Product CRUD operations
- [ ] Shopping cart
- [ ] Order management
- [ ] Payment gateway
- [ ] Email notifications
- [ ] Admin dashboard

---

## 📈 Performance Metrics (Future)

### Backend
- API Response Time: < 200ms
- Database Queries: Optimized with indexes
- Concurrent Users: 100+
- Token Validation: < 10ms

### Frontend
- Page Load Time: < 2s
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB

---

## 🔒 Security Checklist

- [x] Passwords hashed with BCrypt
- [x] JWT tokens signed with secret key
- [x] CORS configured properly
- [x] SQL injection prevention (JPA)
- [x] XSS prevention (React escapes by default)
- [x] CSRF disabled (stateless API)
- [ ] HTTPS in production
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] Security headers

---

## 🚀 Deployment Guide (Future)

### Backend (AWS EC2 / Heroku)
```bash
# Build JAR
mvn clean package

# Run on server
java -jar target/fabrico-server.jar
```

### Frontend (Vercel / Netlify)
```bash
# Build production
npm run build

# Deploy dist/ folder
```

### Database (AWS RDS / Cloud)
- Export schema
- Import to cloud database
- Update connection string
- Test connection

---

## 📚 Additional Resources

### Inside This Folder
- `AUTHENTICATION_GUIDE.md` - Auth system deep dive
- `DATABASE_SCHEMA.md` - Database structure
- `API_DOCUMENTATION.md` - API reference
- `FRONTEND_ARCHITECTURE.md` - React architecture
- `QUICKSTART_GUIDE.md` - Setup instructions

### External Links
- Spring Boot Docs: spring.io/projects/spring-boot
- React Docs: react.dev
- JWT Docs: jwt.io
- MySQL Docs: dev.mysql.com/doc
- Tailwind Docs: tailwindcss.com

---

**Last Updated:** October 21, 2025  
**Documentation Version:** 1.0  
**Project Version:** 1.0  
**Status:** ✅ Complete & Ready for Review

---

## 💡 Quick Tips

**First time setup?**  
→ Start with `QUICKSTART_GUIDE.md`

**Understanding authentication?**  
→ Read `AUTHENTICATION_GUIDE.md` Section 2

**Need API details?**  
→ Check `API_DOCUMENTATION.md`

**Want to modify frontend?**  
→ Study `FRONTEND_ARCHITECTURE.md`

**Database questions?**  
→ Refer `DATABASE_SCHEMA.md`

---

**Happy Coding! 🚀**
