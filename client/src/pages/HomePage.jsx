import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoryShowcase from "../components/CategoryShowcase";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <HeroSection />
        <FeaturedProducts />
        <CategoryShowcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
