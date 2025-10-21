import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Truck, RotateCcw, Shield } from 'lucide-react';
import BannerImage from '../assets/FashionBanner.webp';

/**
 * Hero/Banner Section Component
 * 
 * Eye-catching landing section inspired by Flipkart/Amazon
 * Features:
 * - Full-width responsive banner
 * - Compelling headline and CTA
 * - Clean gradient background
 * - Professional imagery with overlay effects
 */
const HeroSection = () => {
  return (
    <section className="
      relative 
      bg-gradient-to-br from-brand-50 via-surface to-neutral-50
      overflow-hidden
    ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-200 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="
          grid grid-cols-1 lg:grid-cols-2 
          gap-8 lg:gap-12 
          items-center 
          min-h-[calc(100vh-5rem)] 
          py-12 sm:py-16 lg:py-20
        ">
          
          {/* Left Content - Headline & CTA */}
          <div className="
            flex flex-col 
            justify-center 
            space-y-6 sm:space-y-8
            text-center lg:text-left
          ">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start">
              <span className="
                inline-flex items-center gap-2
                px-4 py-1.5 
                bg-positive-50 text-positive-600
                text-xs font-semibold 
                rounded-full 
                border border-positive-200
              ">
                <Sparkles className="w-4 h-4" />
                New Collection Available
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="
              text-4xl sm:text-5xl lg:text-6xl 
              font-bold font-display
              text-text-primary 
              leading-tight
            ">
              Elevate Your Style with
              <span className="
                block 
                bg-gradient-to-r from-brand-500 to-brand-700 
                bg-clip-text text-transparent
                mt-2
              ">
                Premium Fashion
              </span>
            </h1>

            {/* Subheadline */}
            <p className="
              text-base sm:text-lg lg:text-xl 
              text-text-secondary 
              max-w-xl
              mx-auto lg:mx-0
            ">
              Discover the latest trends in clothing and accessories. 
              Quality craftsmanship meets contemporary design at Fabrico.
            </p>

            {/* CTA Buttons */}
            <div className="
              flex flex-col sm:flex-row 
              gap-4 
              justify-center lg:justify-start
            ">
              <Link
                to="/products"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4
                  bg-brand-500 text-text-inverse
                  text-base font-semibold
                  rounded-lg
                  shadow-lg shadow-brand-500/30
                  hover:bg-brand-600 hover:shadow-xl
                  transition-all duration-300
                  transform hover:-translate-y-0.5
                  group
                "
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/products"
                className="
                  inline-flex items-center justify-center
                  px-8 py-4
                  bg-surface text-brand-600
                  text-base font-semibold
                  rounded-lg
                  border-2 border-brand-200
                  hover:border-brand-500 hover:bg-brand-50
                  transition-all duration-300
                "
              >
                View Collection
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="
              flex flex-wrap 
              gap-6 sm:gap-8 
              justify-center lg:justify-start
              pt-4
            ">
              <div className="flex items-center gap-2 text-text-muted hover:text-positive-600 transition-colors">
                <Truck className="w-5 h-5 text-positive-500" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted hover:text-positive-600 transition-colors">
                <RotateCcw className="w-5 h-5 text-positive-500" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted hover:text-positive-600 transition-colors">
                <Shield className="w-5 h-5 text-positive-500" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="
            relative 
            flex items-center justify-center
            lg:justify-end
          ">
            {/* Image Container with Professional Effects */}
            <div className="
              relative 
              w-full max-w-md lg:max-w-lg
              aspect-[3/4]
              rounded-2xl
              overflow-hidden
              shadow-2xl shadow-brand-500/20
              transform lg:rotate-2
              transition-all duration-500
              hover:rotate-0 hover:scale-105
              group
            ">
              {/* Main Banner Image */}
              <img 
                src={BannerImage} 
                alt="Latest Fashion Collection - Premium Clothing" 
                className="
                  w-full h-full 
                  object-cover 
                  transition-transform duration-700
                  group-hover:scale-110
                "
              />

              {/* Gradient Overlay for Better Text Contrast */}
              <div className="
                absolute inset-0 
                bg-gradient-to-t from-text-primary/60 via-transparent to-transparent
                opacity-70
              " />

              {/* Quality Badge Overlay */}
              <div className="
                absolute top-4 right-4
                bg-surface/90 backdrop-blur-sm
                px-4 py-2
                rounded-full
                shadow-lg
                flex items-center gap-2
              ">
                <CheckCircle2 className="w-4 h-4 text-positive-500" />
                <span className="text-xs font-semibold text-text-primary">Premium Quality</span>
              </div>

              {/* Bottom Banner Text Overlay */}
              <div className="
                absolute bottom-0 left-0 right-0
                p-6
                bg-gradient-to-t from-text-primary/80 to-transparent
                text-text-inverse
              ">
                <p className="text-sm font-medium mb-1">Latest Collection 2025</p>
                <p className="text-xs opacity-90">Curated for Style & Comfort</p>
              </div>
            </div>

            {/* Floating Badge - Products Count */}
            <div className="
              absolute -bottom-4 -left-4
              bg-surface 
              px-6 py-4 
              rounded-xl 
              shadow-xl
              border-2 border-brand-100
              transform hover:scale-110 transition-transform
            ">
              <p className="text-2xl font-bold text-brand-600">1000+</p>
              <p className="text-sm text-text-muted font-medium">Products</p>
            </div>

            {/* Floating Badge - Customer Satisfaction */}
            <div className="
              absolute -top-4 -right-4
              bg-positive-500 
              px-5 py-3 
              rounded-full 
              shadow-lg
              transform hover:scale-110 transition-transform
            ">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-text-inverse">4.8</span>
                <span className="text-text-inverse text-sm">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
