import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { FEATURED_PRODUCTS } from "../constants/products";

const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, image, rating, reviews, badge } =
    product;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-surface rounded-xl overflow-hidden border border-border hover:border-brand-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link
        to={`/products/${id}`}
        className="block relative aspect-square overflow-hidden bg-neutral-100"
      >
        {badge && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-negative-500 text-text-inverse text-xs font-bold uppercase rounded-md shadow-lg">
            {badge}
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute top-3 right-3 z-10 px-2 py-1 bg-positive-500 text-text-inverse text-xs font-bold rounded-md">
            -{discountPercent}%
          </span>
        )}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 group-hover:scale-110 transition-transform duration-500">
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
        <div className="absolute inset-0 bg-text-primary/0 group-hover:bg-text-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="flex items-center gap-2 px-4 py-2 bg-surface text-brand-600 text-sm font-semibold rounded-lg shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-4 h-4" /> Quick View
          </span>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link
          to={`/products/${id}`}
          className="block text-text-primary font-medium hover:text-brand-600 transition-colors line-clamp-2"
        >
          {name}
        </Link>

        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating)
                      ? "text-accent-500 fill-accent-500"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">({reviews || 0})</span>
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-text-primary">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {originalPrice && (
            <span className="text-sm text-text-muted line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <button
          className="w-full py-2.5 bg-brand-500 text-text-inverse text-sm font-semibold rounded-lg hover:bg-brand-600 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            console.log("Added to cart:", product);
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold transition-colors group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 text-text-inverse text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-brand-600 transition-all duration-300 transform hover:-translate-y-0.5 group"
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
