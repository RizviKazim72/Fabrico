import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './styles/globals.css';

/**
 * Main App Component
 * 
 * Handles routing for the entire Fabrico e-commerce application
 * Wraps app with AuthProvider for global authentication state
 * Includes ToastContainer for notifications
 * 
 * Public Routes (accessible without login):
 * - / : Home page with hero and featured products
 * - /login : User login page
 * - /signup : User registration page
 * - /products : All products listing
 * - /products/:id : Individual product details
 * 
 * Protected Routes (require authentication) - To be implemented:
 * - /cart : Shopping cart
 * - /profile : User profile and orders
 * - /checkout : Checkout process
 * - /orders : Order history
 */
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Placeholder routes - To be implemented */}
            <Route path="/products" element={<div className="pt-20 text-center">Products Page - Coming Soon</div>} />
            <Route path="/products/:id" element={<div className="pt-20 text-center">Product Details - Coming Soon</div>} />
            <Route path="/cart" element={<div className="pt-20 text-center">Cart Page - Coming Soon</div>} />
            
            {/* 404 Page */}
            <Route path="*" element={<div className="pt-20 text-center">404 - Page Not Found</div>} />
          </Routes>

          {/* Toast Notifications Container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;