import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand Logo Component
 * 
 * Reusable logo component for Fabrico brand
 * Can be used in Navbar, Footer, or anywhere branding is needed
 * 
 * @param {string} size - Size variant: 'sm', 'md', 'lg', 'xl'
 * @param {string} className - Additional Tailwind classes for customization
 * @param {boolean} showTagline - Whether to show brand tagline
 * @param {boolean} clickable - Whether logo is clickable (links to home)
 */
const Logo = ({ 
  size = 'md', 
  className = '', 
  showTagline = false,
  clickable = true 
}) => {
  
  // Size configurations for responsive logo
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const LogoContent = () => (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Minimalist F design */}
      <div className={`
        ${sizeClasses[size]} 
        font-bold 
        bg-gradient-to-br from-brand-500 to-brand-700 
        text-text-inverse 
        w-10 h-10 
        flex items-center justify-center 
        rounded-lg 
        shadow-md
        transition-transform duration-200 hover:scale-105
      `}>
        F
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <span className={`
          ${sizeClasses[size]} 
          font-display 
          font-bold 
          text-text-primary 
          tracking-tight
        `}>
          Fabrico
        </span>
        
        {/* Optional Tagline */}
        {showTagline && (
          <span className="text-xs text-text-muted font-medium tracking-wide">
            Style Your Story
          </span>
        )}
      </div>
    </div>
  );

  // Return clickable logo with Link wrapper or static logo
  return clickable ? (
    <Link 
      to="/" 
      className="inline-block transition-opacity hover:opacity-80"
      aria-label="Fabrico Home"
    >
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
};

export default Logo;
