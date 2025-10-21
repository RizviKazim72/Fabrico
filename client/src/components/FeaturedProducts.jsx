import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye, ArrowRight } from 'lucide-react';

/**
 * Product Card Component
 * 
 * Displays individual product with:
 * - Product image
 * - Title and price
 * - Rating
 * - Add to Cart button
 * - Hover effects
 */
const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, image, rating, reviews, badge } = product;

  // Calculate discount percentage
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="
      group
      bg-surface 
      rounded-xl 
      overflow-hidden
      border border-border
      hover:border-brand-300
      hover:shadow-xl
      transition-all duration-300
      transform hover:-translate-y-1
    ">
      {/* Product Image */}
      <Link to={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-neutral-100">
        {/* Badge (New/Sale/etc) */}
        {badge && (
          <span className="
            absolute top-3 left-3 z-10
            px-3 py-1
            bg-negative-500 text-text-inverse
            text-xs font-bold uppercase
            rounded-md
            shadow-lg
          ">
            {badge}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="
            absolute top-3 right-3 z-10
            px-2 py-1
            bg-positive-500 text-text-inverse
            text-xs font-bold
            rounded-md
          ">
            -{discountPercent}%
          </span>
        )}

        {/* Image Placeholder */}
        <div className="
          w-full h-full
          flex items-center justify-center
          bg-gradient-to-br from-neutral-100 to-neutral-200
          group-hover:scale-110
          transition-transform duration-500
        ">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <ShoppingCart className="w-20 h-20 text-neutral-400" />
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="
          absolute inset-0
          bg-text-primary/0 group-hover:bg-text-primary/10
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-all duration-300
        ">
          <span className="
            flex items-center gap-2
            px-4 py-2
            bg-surface text-brand-600
            text-sm font-semibold
            rounded-lg
            shadow-lg
            transform translate-y-4 group-hover:translate-y-0
            transition-transform duration-300
          ">
            <Eye className="w-4 h-4" />
            Quick View
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <Link 
          to={`/products/${id}`}
          className="
            block
            text-text-primary font-medium
            hover:text-brand-600
            transition-colors
            line-clamp-2
          "
        >
          {name}
        </Link>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating)
                      ? 'text-accent-500 fill-accent-500'
                      : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">({reviews || 0})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-text-primary">
            ₹{price.toLocaleString('en-IN')}
          </span>
          {originalPrice && (
            <span className="text-sm text-text-muted line-through">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="
            w-full
            py-2.5
            bg-brand-500 text-text-inverse
            text-sm font-semibold
            rounded-lg
            hover:bg-brand-600
            active:scale-95
            transition-all duration-200
            shadow-sm hover:shadow-md
            flex items-center justify-center gap-2
          "
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to cart functionality
            console.log('Added to cart:', product);
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

/**
 * Featured Products Grid Component
 * 
 * Displays a responsive grid of featured products
 * Includes section heading and "View All" link
 */
const FeaturedProducts = () => {
  // Mock product data - Replace with API call later
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 799,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 128,
      badge: 'NEW',
      image: null // Placeholder
    },
    {
      id: 2,
      name: 'Slim Fit Denim Jeans',
      price: 1899,
      originalPrice: 2999,
      rating: 4.7,
      reviews: 256,
      badge: 'SALE',
      image: null
    },
    {
      id: 3,
      name: 'Casual Sneakers',
      price: 2499,
      originalPrice: 3999,
      rating: 4.3,
      reviews: 89,
      image: null
    },
    {
      id: 4,
      name: 'Leather Wallet',
      price: 899,
      originalPrice: null,
      rating: 4.8,
      reviews: 342,
      badge: 'TRENDING',
      image: null
    },
    {
      id: 5,
      name: 'Smart Watch',
      price: 4999,
      originalPrice: 7999,
      rating: 4.6,
      reviews: 167,
      badge: 'HOT',
      image: null
    },
    {
      id: 6,
      name: 'Designer Sunglasses',
      price: 1499,
      originalPrice: 2499,
      rating: 4.4,
      reviews: 93,
      image: null
    },
    {
      id: 7,
      name: 'Sports Backpack',
      price: 1799,
      originalPrice: null,
      rating: 4.5,
      reviews: 215,
      image: null
    },
    {
      id: 8,
      name: 'Formal Blazer',
      price: 3999,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 178,
      badge: 'NEW',
      image: null
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary font-display">
              Featured Products
            </h2>
            <p className="text-text-muted mt-2">
              Handpicked collection just for you
            </p>
          </div>

          <Link
            to="/products"
            className="
              inline-flex items-center gap-2
              text-brand-600 hover:text-brand-700
              font-semibold
              transition-colors
              group
            "
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6 lg:gap-8
        ">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="
              inline-flex items-center justify-center gap-2
              px-8 py-4
              bg-brand-500 text-text-inverse
              text-base font-semibold
              rounded-lg
              shadow-lg hover:shadow-xl
              hover:bg-brand-600
              transition-all duration-300
              transform hover:-translate-y-0.5
              group
            "
          >
            Explore More Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
