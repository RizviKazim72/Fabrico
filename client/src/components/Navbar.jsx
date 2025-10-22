import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut, User as UserIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

/**
 * Main Navigation Bar Component
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Sticky header on scroll
 * - Active link highlighting
 * - Cart badge for item count
 * - Clean Google Material Design inspired UI
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  // Track scroll position for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Navigation links configuration
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { 
      path: '/cart', 
      label: 'Cart', 
      badge: cartCount,
      icon: ShoppingCart 
    },
  ];

  // Check if current route is active
  const isActiveLink = (path) => location.pathname === path;

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300
        ${isScrolled 
          ? 'bg-surface/95 backdrop-blur-md shadow-md' 
          : 'bg-surface'
        }
      `}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo size="md" showTagline={false} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label, badge, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  relative
                  flex items-center gap-2
                  text-sm font-medium
                  transition-colors duration-200
                  ${isActiveLink(path)
                    ? 'text-brand-600'
                    : 'text-text-secondary hover:text-brand-500'
                  }
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
                
                {/* Cart badge */}
                {badge !== undefined && badge > 0 && (
                  <span className="
                    absolute -top-2 -right-3
                    bg-negative-500 text-text-inverse
                    text-xs font-bold
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                  ">
                    {badge}
                  </span>
                )}

                {/* Active link indicator */}
                {isActiveLink(path) && (
                  <span className="
                    absolute -bottom-1 left-0 right-0
                    h-0.5 bg-brand-600 rounded-full
                  " />
                )}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center gap-3 ml-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="
                      px-4 py-2
                      text-sm font-medium
                      text-brand-600
                      hover:text-brand-700
                      transition-colors
                    "
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="
                      px-5 py-2
                      text-sm font-medium
                      bg-brand-500 text-text-inverse
                      rounded-lg
                      hover:bg-brand-600
                      transition-all duration-200
                      shadow-sm hover:shadow-md
                    "
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              md:hidden
              p-2 rounded-lg
              text-text-primary
              hover:bg-neutral-100
              transition-colors
            "
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`
            md:hidden
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 space-y-2 border-t border-border">
            {/* Mobile Nav Links */}
            {navLinks.map(({ path, label, badge, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  block px-4 py-3 rounded-lg
                  text-sm font-medium
                  transition-colors
                  ${isActiveLink(path)
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-text-secondary hover:bg-neutral-100'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4" />}
                    {label}
                  </div>
                  {badge !== undefined && badge > 0 && (
                    <span className="
                      bg-negative-500 text-text-inverse
                      text-xs font-bold
                      px-2 py-1 rounded-full
                    ">
                      {badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="
                      flex items-center gap-2
                      block px-4 py-3 rounded-lg
                      text-sm font-medium text-center
                      text-text-secondary hover:bg-neutral-100
                      transition-colors
                    "
                  >
                    <UserIcon className="w-4 h-4" />
                    {user?.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center justify-center gap-2
                      px-4 py-3 rounded-lg
                      text-sm font-medium
                      text-negative-600
                      hover:bg-negative-50
                      transition-colors
                    "
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="
                      block px-4 py-3 rounded-lg
                      text-sm font-medium text-center
                      text-brand-600
                      border border-brand-200
                      hover:bg-brand-50
                      transition-colors
                    "
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="
                      block px-4 py-3 rounded-lg
                      text-sm font-medium text-center
                      bg-brand-500 text-text-inverse
                      hover:bg-brand-600
                      transition-colors
                    "
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
