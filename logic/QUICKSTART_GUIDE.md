# Quick Start Guide 🚀

Step-by-step guide to run Fabrico e-commerce platform locally.

---

## 📋 Prerequisites

### Required Software

1. **Node.js** (v20.17+ recommended)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **Java JDK 21+**
   - Download: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java --version`

3. **MySQL 8.x**
   - Download: https://dev.mysql.com/downloads/installer/
   - Verify: `mysql --version`

4. **Maven** (usually comes with IDE)
   - Download: https://maven.apache.org/download.cgi
   - Verify: `mvn --version`

5. **Git**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

---

## 🗄️ Database Setup

### Step 1: Start MySQL

**Windows:**
```powershell
# Start MySQL service
net start MySQL80

# Or use MySQL Workbench
```

**Mac/Linux:**
```bash
sudo service mysql start
```

### Step 2: Create Database

**Option A: Using MySQL Command Line**
```sql
mysql -u root -p

CREATE DATABASE fabrico_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SHOW DATABASES;

USE fabrico_db;

EXIT;
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to localhost
3. Click "Create New Schema"
4. Name: `fabrico_db`
5. Character Set: `utf8mb4`
6. Collation: `utf8mb4_unicode_ci`
7. Click "Apply"

### Step 3: Verify Connection

```sql
mysql -u root -p fabrico_db

SHOW TABLES;  -- Should be empty initially
```

---

## 🔧 Backend Setup (Spring Boot)

### Step 1: Navigate to Server Directory

```powershell
cd d:\Fabrico\server
```

### Step 2: Update Configuration (if needed)

Edit `src/main/resources/application.properties`:

```properties
# Database connection (Update if different)
spring.datasource.url=jdbc:mysql://localhost:3306/fabrico_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JWT Secret (DO NOT CHANGE without regenerating tokens)
jwt.secret=YXNkZmFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZmFzZGZhc2RmYXNkZmFzZGZhc2Rm
jwt.expiration=86400000

# Server port (default: 8080)
server.port=8080
```

### Step 3: Install Dependencies

```powershell
mvn clean install
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] Total time: 45 s
```

### Step 4: Run Backend Server

```powershell
mvn spring-boot:run
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.5.6)

2024-10-21 10:30:00.123  INFO --- [  restartedMain] c.f.s.FabricoApplication: Started FabricoApplication in 5.123 seconds
2024-10-21 10:30:00.125  INFO --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080
```

### Step 5: Verify Backend

**Open browser:** http://localhost:8080

**Expected:** Whitelabel Error Page (normal for API-only backend)

**Test API:**
```powershell
# Using curl
curl http://localhost:8080/api/auth/login

# Or using Postman
POST http://localhost:8080/api/auth/login
```

**Backend Console Logs:**
```
2024-10-21 10:30:05.123  INFO --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet: Initializing Servlet 'dispatcherServlet'
2024-10-21 10:30:05.124  INFO --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet: Completed initialization
```

---

## 💻 Frontend Setup (React)

### Step 1: Open New Terminal

**Keep backend terminal running!**

Open new PowerShell/Terminal window.

### Step 2: Navigate to Client Directory

```powershell
cd d:\Fabrico\client
```

### Step 3: Install Dependencies

```powershell
npm install
```

**Expected Output:**
```
added 172 packages, and audited 173 packages in 30s

found 0 vulnerabilities
```

**Common Issues:**
```
npm ERR! code ERESOLVE
```

**Fix:**
```powershell
npm install --legacy-peer-deps
```

### Step 4: Run Frontend Development Server

```powershell
npm run dev
```

**Expected Output:**
```
  VITE v7.1.11  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open Application

**Browser:** http://localhost:5173/

**Expected:** Fabrico landing page with:
- Navbar (Logo, Login, Sign Up buttons)
- Hero section with banner
- Featured products grid

---

## ✅ Verify Full Setup

### Test 1: Registration

1. Click "Sign Up" in navbar
2. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
   - Phone: `1234567890`
3. Click "Sign Up"
4. **Expected:** 
   - Success toast notification
   - Redirected to home page
   - Navbar shows "Welcome, Test User"

### Test 2: Check Database

```sql
mysql -u root -p fabrico_db

SELECT * FROM users;
```

**Expected Output:**
```
+----+-----------+------------------+--------------------------------------------------------------+-------------+-------+---------------------+-------------+
| id | name      | email            | password                                                     | phone       | role  | created_at          | updated_at  |
+----+-----------+------------------+--------------------------------------------------------------+-------------+-------+---------------------+-------------+
|  1 | Test User | test@example.com | $2a$10$N9qo8uLOickgx2ZMRZoMye...                              | 1234567890  | USER  | 2024-10-21 10:35:00 | NULL        |
+----+-----------+------------------+--------------------------------------------------------------+-------------+-------+---------------------+-------------+
```

### Test 3: Login

1. Click "Logout" (if logged in)
2. Click "Login"
3. Enter credentials:
   - Email: `test@example.com`
   - Password: `test123`
4. Click "Login"
5. **Expected:**
   - Success toast
   - Redirected to home
   - Navbar shows user name

### Test 4: JWT Token

**Open Browser DevTools:**
1. Press F12
2. Go to "Application" tab
3. Expand "Local Storage" → `http://localhost:5173`
4. **Expected:**
   - `token`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - `user`: `{"id":1,"name":"Test User","email":"test@example.com","role":"USER"}`

### Test 5: Protected API Request (Future)

**Browser Console (F12 → Console):**
```javascript
// Get token from localStorage
const token = localStorage.getItem('token');

// Make authenticated request
fetch('http://localhost:8080/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Port 8080 already in use
```
Error: Port 8080 is already in use
```

**Solution 1:** Kill existing process
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Solution 2:** Change port in `application.properties`
```properties
server.port=8081
```

---

**Problem:** Database connection refused
```
Error: Communications link failure
```

**Solution:**
1. Check MySQL running: `net start MySQL80`
2. Verify credentials in `application.properties`
3. Test connection: `mysql -u root -p fabrico_db`
4. Check firewall not blocking port 3306

---

**Problem:** JWT secret error
```
Error: JWT signature does not match
```

**Solution:**
1. Delete all tokens from frontend localStorage
2. Logout all users
3. Restart backend server
4. Register new user

---

### Frontend Issues

**Problem:** Vite not starting
```
Error: EADDRINUSE: address already in use :::5173
```

**Solution:**
```powershell
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or run on different port
npm run dev -- --port 5174
```

---

**Problem:** CORS error
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
1. Check backend CORS configuration in `SecurityConfig.java`
2. Verify frontend URL in `allowedOrigins`
3. Restart backend after changes

**SecurityConfig.java:**
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",  // Vite default
    "http://localhost:3000"   // Alternative
));
```

---

**Problem:** API calls failing
```
Error: Network Error
```

**Solution:**
1. Check backend running on port 8080
2. Verify baseURL in `client/src/services/api.js`:
   ```javascript
   baseURL: 'http://localhost:8080/api'
   ```
3. Test backend directly: http://localhost:8080/api/auth/login

---

**Problem:** Toast notifications not showing
```
No toasts appearing
```

**Solution:**
1. Check `<ToastContainer />` in `App.jsx`
2. Verify `react-toastify` CSS imported:
   ```javascript
   import 'react-toastify/dist/ReactToastify.css';
   ```
3. Check browser console for errors

---

### Database Issues

**Problem:** Table doesn't exist
```
Error: Table 'fabrico_db.users' doesn't exist
```

**Solution:**
1. Check `spring.jpa.hibernate.ddl-auto=update` in `application.properties`
2. Restart backend (tables auto-created)
3. Or manually create:
   ```sql
   CREATE TABLE users (
       id BIGINT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       phone_number VARCHAR(20),
       role VARCHAR(20) NOT NULL DEFAULT 'USER',
       created_at DATETIME NOT NULL,
       updated_at DATETIME
   );
   ```

---

**Problem:** Password authentication failed
```
Error: Access denied for user 'root'@'localhost'
```

**Solution:**
```sql
-- Reset root password
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

Update `application.properties`:
```properties
spring.datasource.password=new_password
```

---

## 📦 Production Build (Future)

### Backend

```powershell
cd d:\Fabrico\server

# Create JAR file
mvn clean package

# Run JAR
java -jar target/fabrico-server-0.0.1-SNAPSHOT.jar
```

### Frontend

```powershell
cd d:\Fabrico\client

# Create production build
npm run build

# Output in dist/ folder
# Deploy to: Vercel, Netlify, AWS S3, etc.
```

---

## 🔄 Daily Development Workflow

### Morning Start

1. **Start MySQL**
   ```powershell
   net start MySQL80
   ```

2. **Start Backend** (Terminal 1)
   ```powershell
   cd d:\Fabrico\server
   mvn spring-boot:run
   ```

3. **Start Frontend** (Terminal 2)
   ```powershell
   cd d:\Fabrico\client
   npm run dev
   ```

4. **Open Browser**
   - http://localhost:5173/

### Evening Shutdown

1. **Stop Frontend:** Press `Ctrl+C` in Terminal 2
2. **Stop Backend:** Press `Ctrl+C` in Terminal 1
3. **Stop MySQL (optional):**
   ```powershell
   net stop MySQL80
   ```

---

## 📞 Support

**Common Commands Reference:**

```powershell
# Check what's running on port
netstat -ano | findstr :PORT_NUMBER

# Kill process
taskkill /PID <PID> /F

# Check Java version
java --version

# Check Node version
node --version

# Check npm version
npm --version

# Check MySQL status
mysqladmin -u root -p status

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

**Last Updated:** October 21, 2025  
**Version:** 1.0  
**Author:** Fabrico Development Team
