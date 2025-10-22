# 🎯 Fabrico Frontend - React Client

Modern React frontend for the Fabrico e-commerce platform.

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Application will run on `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Production build will be created in `dist/` folder.

## 🔍 Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Logo.jsx
│   ├── HeroSection.jsx
│   ├── FeaturedProducts.jsx
│   ├── CategoryShowcase.jsx
│   ├── Testimonials.jsx
│   └── Newsletter.jsx
├── constants/           # Data constants
│   ├── products.js      # Product catalog
│   ├── categories.js    # Category definitions
│   ├── testimonials.js  # Customer reviews
│   └── navigation.js    # Navigation links
├── context/             # React Context
│   └── AuthContext.jsx  # Authentication state
├── pages/               # Page components
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── CartPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── ProfilePage.jsx
├── services/            # API services
│   ├── api.js           # Axios instance
│   └── authService.js   # Auth API calls
├── styles/              # Global styles
│   └── globals.css
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## 🎨 Features

### ✅ Implemented Features

- **Authentication**
  - User registration
  - User login
  - JWT token management
  - Protected routes
  - Persistent authentication

- **Product Browsing**
  - Product catalog (30+ products)
  - Category filtering
  - Real-time search
  - Product ratings and reviews
  - Stock availability display

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Persistent cart (localStorage)
  - Real-time cart updates
  - Cart badge counter

- **User Profile**
  - View profile information
  - Update profile details
  - Logout functionality

- **Homepage Sections**
  - Hero banner
  - Featured products
  - Category showcase
  - Customer testimonials
  - Newsletter subscription
  - Footer with links

### 🎯 UI Components

All components use centralized constants - no hardcoded data!

- ✅ **Navbar** - Responsive navigation with cart badge
- ✅ **Footer** - Multi-section footer with social links
- ✅ **FeaturedProducts** - Product grid with add to cart
- ✅ **CategoryShowcase** - Visual category cards
- ✅ **Testimonials** - Customer review carousel
- ✅ **Newsletter** - Email subscription form
- ✅ **HeroSection** - Landing page hero banner

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Toastify** - Notifications
- **Axios** - HTTP client

## 📚 Constants Architecture

All static data is centralized in `/src/constants/`:

### products.js
```javascript
export const PRODUCTS = [...];           // 30 products
export const FEATURED_PRODUCTS = [...];  // Featured items
export const PRODUCT_CATEGORIES = [...]; // Categories
```

### categories.js
```javascript
export const CATEGORY_SHOWCASE = [...];  // Category showcase data
```

### testimonials.js
```javascript
export const TESTIMONIALS = [...];       // Customer reviews
export const CUSTOMER_STATS = {...};     // Statistics
```

### navigation.js
```javascript
export const NAV_LINKS = [...];          // Main navigation
export const USER_MENU_LINKS = [...];    // User menu
export const FOOTER_LINKS = {...};       // Footer sections
export const SOCIAL_LINKS = [...];       // Social media
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### API Base URL

Update in `src/services/api.js` if needed.

## 🎨 Styling

### Tailwind CSS

Custom theme configuration in `tailwind.config.js`

### Custom Colors

```javascript
colors: {
  brand: { /* Brand colors */ },
  accent: { /* Accent colors */ },
  positive: { /* Success colors */ },
  negative: { /* Error colors */ },
  // ... more
}
```

## 📱 Responsive Design

All components are fully responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Authentication

### Protected Routes

Routes that require authentication:
- `/profile`
- `/orders` (if implemented)
- Checkout pages

### Auth Context

Provides authentication state across the app:
```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

## 🛒 Cart Management

Cart data stored in localStorage:
- Persists across sessions
- Real-time updates
- Event-based synchronization

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Code Style

- ESLint configuration included
- Consistent naming conventions
- Component-based architecture

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

## 🔗 API Integration

### Base Configuration

```javascript
// src/services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
});
```

### Interceptors

- Request interceptor adds JWT token
- Response interceptor handles 401 errors

## 📊 State Management

- **React Context** for authentication
- **Local State** for component-specific data
- **localStorage** for cart persistence

## 🎯 Performance

- Code splitting with React.lazy (if implemented)
- Optimized images from Unsplash
- Memoization where needed
- Efficient re-renders

## 🐛 Known Issues

- Node.js version requirement: 20.19+ or 22.12+
- Some Tailwind class suggestions (non-breaking)

## 📞 Support

For issues or questions, create an issue on GitHub.

## 🙏 Credits

- UI/UX inspired by modern e-commerce platforms
- Images from Unsplash
- Icons from Lucide React

---

**Happy Coding! 🚀**

