import React from 'react';
import { Link } from 'react-router-dom';

// Brand logo component - supports dark and light themes
const Logo = ({ 
  size = 'md',
  variant = 'default',
  className = '', 
  showTagline = false,
  clickable = true 
}) => {
  
  // Different sizes available
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  // Footer ya dark background ke liye light variant 
  const textColor = variant === 'light' ? 'text-white' : 'text-text-primary';
  const taglineColor = variant === 'light' ? 'text-gray-300' : 'text-text-muted';

  const LogoContent = () => (
    <div className={`flex items-center gap-2 ${className}`}>
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

      <div className="flex flex-col">
        <span className={`
          ${sizeClasses[size]} 
          font-display 
          font-bold 
          ${textColor}
          tracking-tight
        `}>
          Fabrico
        </span>
        
        {showTagline && (
          <span className={`text-xs ${taglineColor} font-medium tracking-wide`}>
            Style Your Story
          </span>
        )}
      </div>
    </div>
  );

  // Clickable ya simple logo return 
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
