import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';

/**
 * Home Page Component
 * 
 * Main landing page for Fabrico e-commerce platform
 * Accessible to all visitors (public route)
 * 
 * Structure:
 * - Navbar (sticky header)
 * - Hero/Banner section (full-width hero with CTA)
 * - Featured Products grid (product showcase)
 * 
 * Future additions:
 * - Category showcase section
 * - Testimonials/Reviews
 * - Newsletter signup
 * - Footer
 */
const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content - Add top padding to account for fixed navbar */}
      <main className="pt-16 sm:pt-20">
        {/* Hero Banner Section */}
        <HeroSection />

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Future sections can be added here */}
        {/* <CategoryShowcase /> */}
        {/* <Testimonials /> */}
        {/* <Newsletter /> */}
      </main>

      {/* Footer - To be implemented */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
