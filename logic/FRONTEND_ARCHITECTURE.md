# Frontend Architecture Documentation 🎨

Complete guide to Fabrico frontend structure, state management, and component architecture.

---

## 📁 Project Structure

```
client/
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Root component with routing
│   ├── index.css                 # Global Tailwind imports
│   │
│   ├── assets/                   # Static files
│   │   └── banner.jpg
│   │
│   ├── components/               # Reusable components
│   │   ├── Logo.jsx              # Brand logo
│   │   ├── Navbar.jsx            # Navigation header
│   │   ├── HeroSection.jsx       # Landing page hero
│   │   └── FeaturedProducts.jsx  # Product grid
│   │
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx          # Landing page
│   │   ├── LoginPage.jsx         # Login form
│   │   └── SignupPage.jsx        # Registration form
│   │
│   ├── services/                 # API & Business logic
│   │   ├── api.js                # Axios instance
│   │   └── authService.js        # Auth API calls
│   │
│   ├── context/                  # Global state management
│   │   └── AuthContext.jsx       # Authentication state
│   │
│   └── styles/                   # CSS files
│       ├── globals.css           # Custom styles
│       └── variables/
│           └── variables.css     # Tailwind theme variables
│
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
└── eslint.config.js             # ESLint rules
```

---

## 🔄 Data Flow Architecture

### Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    FABRICO FRONTEND                          │
│                                                               │
│  ┌───────────────┐                                           │
│  │  Components   │ ← Use hooks to access context            │
│  │  (UI Layer)   │                                           │
│  └───────┬───────┘                                           │
│          │                                                    │
│          ↓                                                    │
│  ┌───────────────┐                                           │
│  │ Context API   │ ← Global state (user, auth status)       │
│  │ (State Layer) │                                           │
│  └───────┬───────┘                                           │
│          │                                                    │
│          ↓                                                    │
│  ┌───────────────┐                                           │
│  │ Auth Service  │ ← API call wrappers                      │
│  │(Business Logic│                                           │
│  └───────┬───────┘                                           │
│          │                                                    │
│          ↓                                                    │
│  ┌───────────────┐                                           │
│  │  Axios API    │ ← HTTP client with interceptors          │
│  │  (HTTP Layer) │                                           │
│  └───────┬───────┘                                           │
│          │                                                    │
│          ↓                                                    │
│  ┌───────────────┐                                           │
│  │ localStorage  │ ← Persistent storage                      │
│  └───────────────┘                                           │
│                                                               │
└───────────────────────┬───────────────────────────────────────┘
                        │
                        ↓ HTTP Requests
               ┌─────────────────┐
               │  Backend API    │
               │ (Spring Boot)   │
               └─────────────────┘
```

---

## 🎯 Component Architecture

### 1. Entry Point (`main.jsx`)

**Purpose:** Initialize React application

**Code:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Flow:**
1. Import React and App component
2. Mount to `<div id="root">` in index.html
3. Wrap in StrictMode for development warnings
4. Import global styles (Tailwind CSS)

---

### 2. Root Component (`App.jsx`)

**Purpose:** Setup routing, providers, and global components

**Architecture:**
```javascript
<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* Future routes */}
    </Routes>
    <ToastContainer />
  </AuthProvider>
</BrowserRouter>
```

**Key Features:**
- **BrowserRouter:** Client-side routing
- **AuthProvider:** Global authentication state
- **Routes:** Page navigation
- **ToastContainer:** Global notifications

**Provider Hierarchy:**
```
BrowserRouter (Routing)
  └─ AuthProvider (Auth State)
      └─ App Layout
          ├─ Routes (Pages)
          └─ ToastContainer (Notifications)
```

---

### 3. Authentication Context (`AuthContext.jsx`)

**Purpose:** Manage global authentication state

**State Structure:**
```javascript
{
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "USER"
  },
  isAuthenticated: true,
  loading: false
}
```

**Provided Functions:**
```javascript
const { 
  user,              // Current user object
  isAuthenticated,   // Boolean: logged in?
  loading,           // Boolean: initializing?
  login,             // Function: async (credentials)
  register,          // Function: async (userData)
  logout             // Function: void
} = useAuth();
```

**Implementation Details:**

**1. Initial State Load (useEffect):**
```javascript
useEffect(() => {
  // Check localStorage on mount
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  if (token && storedUser) {
    setUser(JSON.parse(storedUser));
    setIsAuthenticated(true);
  }
  setLoading(false);
}, []);
```

**2. Login Function:**
```javascript
const login = async (credentials) => {
  const response = await authService.login(credentials);
  setUser(response.user);
  setIsAuthenticated(true);
  // authService handles localStorage
};
```

**3. Logout Function:**
```javascript
const logout = () => {
  authService.logout();
  setUser(null);
  setIsAuthenticated(false);
};
```

**Data Flow:**
```
User Action (Login) 
  ↓
AuthContext.login() 
  ↓
authService.login() 
  ↓
api.post('/auth/login') 
  ↓
Backend Response 
  ↓
Store in localStorage 
  ↓
Update Context State 
  ↓
Components Re-render
```

---

### 4. Auth Service (`authService.js`)

**Purpose:** Centralize authentication API calls

**Functions:**

**1. Register:**
```javascript
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  const { token, userId, name, email, role } = response.data;
  
  // Store token
  localStorage.setItem('token', token);
  
  // Store user info
  const user = { id: userId, name, email, role };
  localStorage.setItem('user', JSON.stringify(user));
  
  return { token, user };
};
```

**2. Login:**
```javascript
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  const { token, userId, name, email, role } = response.data;
  
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify({ id: userId, name, email, role }));
  
  return { token, user: { id: userId, name, email, role } };
};
```

**3. Logout:**
```javascript
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

**4. Get Current User:**
```javascript
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
```

**5. Check Authentication:**
```javascript
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Convert to boolean
};
```

---

### 5. API Client (`api.js`)

**Purpose:** Configured Axios instance with interceptors

**Configuration:**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Request Interceptor:**
```javascript
api.interceptors.request.use(
  (config) => {
    // Add JWT token to every request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

**Why this matters:**
- Automatically adds token to EVERY request
- No need to manually add Authorization header
- Centralized token management

**Response Interceptor:**
```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Why this matters:**
- Auto-logout on token expiry
- Consistent error handling
- User redirected to login

**Request Flow:**
```
Component makes API call
  ↓
api.get('/cart')  [Request Interceptor]
  ↓
Add "Authorization: Bearer <token>" header
  ↓
Send to backend
  ↓
Backend response  [Response Interceptor]
  ↓
Check status code
  ├─ 200-299: Return data
  └─ 401: Clear auth, redirect to login
  ↓
Component receives response
```

---

## 📄 Page Components

### 1. Login Page (`LoginPage.jsx`)

**Structure:**
```javascript
function LoginPage() {
  // State
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Handlers
  const handleChange = (e) => { ... };
  const validate = () => { ... };
  const handleSubmit = async (e) => { ... };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        {/* Password Input */}
        {/* Submit Button */}
      </form>
    </div>
  );
}
```

**Validation Logic:**
```javascript
const validate = () => {
  const newErrors = {};
  
  // Email validation
  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }
  
  // Password validation
  if (!formData.password) {
    newErrors.password = 'Password is required';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Submit Flow:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Validate
  if (!validate()) return;
  
  // 2. Set loading state
  setLoading(true);
  
  try {
    // 3. Call auth service
    await login(formData);
    
    // 4. Show success notification
    toast.success('Login successful!');
    
    // 5. Redirect to home
    navigate('/');
  } catch (error) {
    // 6. Show error notification
    toast.error(error.response?.data?.message || 'Login failed');
  } finally {
    // 7. Remove loading state
    setLoading(false);
  }
};
```

---

### 2. Signup Page (`SignupPage.jsx`)

**Additional Features:**
- Confirm password field
- Phone number (optional)
- More complex validation

**Validation:**
```javascript
const validate = () => {
  const newErrors = {};
  
  if (!formData.name || formData.name.length < 2) {
    newErrors.name = 'Name must be at least 2 characters';
  }
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Valid email is required';
  }
  
  if (!formData.password || formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Submit Logic:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validate()) return;
  
  setLoading(true);
  
  try {
    // Remove confirmPassword before sending
    const { confirmPassword, ...registrationData } = formData;
    
    await register(registrationData);
    toast.success('Registration successful!');
    navigate('/');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Registration failed');
  } finally {
    setLoading(false);
  }
};
```

---

## 🧩 Reusable Components

### 1. Navbar (`Navbar.jsx`)

**Features:**
- Responsive mobile menu
- Authentication-based rendering
- Active route highlighting
- Sticky positioning

**Conditional Rendering:**
```javascript
const { user, isAuthenticated, logout } = useAuth();

return (
  <nav>
    {isAuthenticated ? (
      // Authenticated UI
      <>
        <span>Welcome, {user.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </>
    ) : (
      // Guest UI
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    )}
  </nav>
);
```

**Mobile Menu State:**
```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Toggle function
const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

// Close on route change
useEffect(() => {
  setIsMenuOpen(false);
}, [location.pathname]);
```

---

### 2. Logo Component (`Logo.jsx`)

**Purpose:** Reusable brand logo with variants

**Props:**
```javascript
Logo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showTagline: PropTypes.bool,
};
```

**Size Variants:**
- `sm`: 24px (mobile nav)
- `md`: 32px (default)
- `lg`: 48px (footer)
- `xl`: 64px (landing page)

---

### 3. Hero Section (`HeroSection.jsx`)

**Features:**
- Full-screen banner
- Gradient overlays
- CTA buttons
- Floating badges (products count, rating)
- Hover animations

**Image Overlay Structure:**
```jsx
<div className="relative">
  {/* Base Image */}
  <img src={banner} />
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/40" />
  
  {/* Content */}
  <div className="absolute inset-0 flex items-center">
    <h1>Welcome to Fabrico</h1>
    <button>Shop Now</button>
  </div>
  
  {/* Floating Badges */}
  <div className="absolute top-8 right-8">
    <span>1000+ Products</span>
  </div>
</div>
```

---

### 4. Featured Products (`FeaturedProducts.jsx`)

**Structure:**
- Grid layout (4 columns desktop, 2 mobile)
- Product cards with hover effects
- Rating display
- Badge system (Sale, New, Popular)

**Product Card:**
```javascript
function ProductCard({ product }) {
  return (
    <div className="group hover:shadow-xl">
      {/* Image */}
      <img className="group-hover:scale-110" />
      
      {/* Badge */}
      {product.badge && <span>{product.badge}</span>}
      
      {/* Info */}
      <h3>{product.name}</h3>
      <p className="text-brand-600">${product.price}</p>
      
      {/* Rating */}
      <div>
        <Star /> {product.rating}
      </div>
      
      {/* Actions */}
      <button>Add to Cart</button>
    </div>
  );
}
```

---

## 🎨 Styling Architecture

### Tailwind CSS v4 Configuration

**Import Chain:**
```
main.jsx
  └─ imports index.css
       └─ @import "tailwindcss"
       └─ @import "./styles/globals.css"
            └─ @import "./styles/variables/variables.css"
                 └─ @theme { :root { --color-brand-500: #1a73e8 } }
```

**Theme Variables (`variables.css`):**
```css
@theme {
  :root {
    /* Fonts */
    --font-sans: 'Inter', sans-serif;
    --font-serif: 'Roboto', serif;
    
    /* Colors */
    --color-brand-50: #e8f0fe;
    --color-brand-500: #1a73e8;
    --color-brand-900: #1557b0;
    
    /* Spacing */
    --spacing-section: 5rem;
  }
}
```

**Usage in Components:**
```jsx
<div className="bg-brand-500 text-brand-50 font-sans">
  Styled with theme variables
</div>
```

---

## 🔐 Protected Routes (To Implement)

**ProtectedRoute Component:**
```javascript
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

**Usage:**
```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* Protected Routes */}
  <Route 
    path="/cart" 
    element={
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    } 
  />
  <Route 
    path="/orders" 
    element={
      <ProtectedRoute>
        <OrdersPage />
      </ProtectedRoute>
    } 
  />
</Routes>
```

---

## 📦 State Management Summary

### localStorage

**Stored Data:**
- `token`: JWT authentication token
- `user`: User object (id, name, email, role)

**When Updated:**
- On login/register: Store token & user
- On logout: Clear all data
- On token expiry: Auto-cleared by interceptor

### Context API

**Auth Context:**
- User object
- Authentication status
- Loading state
- Login/register/logout functions

**Why Context over Redux:**
- Simpler for small apps
- No boilerplate
- Built-in React
- Sufficient for authentication state

---

## 🚀 Performance Optimization

### Code Splitting (Future)

```javascript
import { lazy, Suspense } from 'react';

const CartPage = lazy(() => import('./pages/CartPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));

<Suspense fallback={<Loading />}>
  <CartPage />
</Suspense>
```

### Memoization

```javascript
import { useMemo } from 'react';

const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);
```

### useCallback

```javascript
import { useCallback } from 'react';

const handleAddToCart = useCallback((productId) => {
  // Add to cart logic
}, []);
```

---

## 🧪 Testing Approach (Planned)

**Unit Tests:**
```javascript
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});
```

**Integration Tests:**
```javascript
test('login flow', async () => {
  render(<App />);
  
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
```

---

**Last Updated:** October 21, 2025  
**Frontend Version:** 1.0  
**Author:** Fabrico Development Team
