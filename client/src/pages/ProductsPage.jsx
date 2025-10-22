import { useState } from 'react';
import { Search, ShoppingCart, Star, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

/**
 * Products Page Component
 * 
 * Features:
 * - Product grid with 30 items
 * - Search functionality
 * - Category filters
 * - Add to cart
 * - Responsive layout
 */
function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock product data (30 products)
  const products = [
    { id: 1, name: 'Cotton T-Shirt', category: 'clothing', price: 599, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', rating: 4.5, stock: 50 },
    { id: 2, name: 'Denim Jeans', category: 'clothing', price: 1299, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300', rating: 4.7, stock: 30 },
    { id: 3, name: 'Running Shoes', category: 'footwear', price: 2499, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', rating: 4.8, stock: 25 },
    { id: 4, name: 'Leather Wallet', category: 'accessories', price: 799, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300', rating: 4.3, stock: 100 },
    { id: 5, name: 'Smart Watch', category: 'electronics', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', rating: 4.6, stock: 15 },
    { id: 6, name: 'Backpack', category: 'accessories', price: 1499, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', rating: 4.4, stock: 40 },
    { id: 7, name: 'Sunglasses', category: 'accessories', price: 899, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300', rating: 4.2, stock: 60 },
    { id: 8, name: 'Hoodie', category: 'clothing', price: 1799, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300', rating: 4.5, stock: 35 },
    { id: 9, name: 'Sneakers', category: 'footwear', price: 3299, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300', rating: 4.9, stock: 20 },
    { id: 10, name: 'Laptop Bag', category: 'accessories', price: 1999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', rating: 4.3, stock: 45 },
    { id: 11, name: 'Polo Shirt', category: 'clothing', price: 799, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300', rating: 4.4, stock: 55 },
    { id: 12, name: 'Formal Shoes', category: 'footwear', price: 2999, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300', rating: 4.6, stock: 30 },
    { id: 13, name: 'Wireless Earbuds', category: 'electronics', price: 2499, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300', rating: 4.7, stock: 50 },
    { id: 14, name: 'Baseball Cap', category: 'accessories', price: 499, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300', rating: 4.1, stock: 80 },
    { id: 15, name: 'Jacket', category: 'clothing', price: 2999, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300', rating: 4.8, stock: 25 },
    { id: 16, name: 'Sports Shoes', category: 'footwear', price: 1999, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300', rating: 4.5, stock: 40 },
    { id: 17, name: 'Power Bank', category: 'electronics', price: 1299, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300', rating: 4.4, stock: 60 },
    { id: 18, name: 'Leather Belt', category: 'accessories', price: 599, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=300', rating: 4.2, stock: 70 },
    { id: 19, name: 'Cargo Pants', category: 'clothing', price: 1499, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300', rating: 4.3, stock: 35 },
    { id: 20, name: 'Slippers', category: 'footwear', price: 399, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300', rating: 4.0, stock: 90 },
    { id: 21, name: 'Bluetooth Speaker', category: 'electronics', price: 1999, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300', rating: 4.6, stock: 45 },
    { id: 22, name: 'Wrist Watch', category: 'accessories', price: 2499, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300', rating: 4.7, stock: 30 },
    { id: 23, name: 'Track Pants', category: 'clothing', price: 999, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300', rating: 4.2, stock: 50 },
    { id: 24, name: 'Sandals', category: 'footwear', price: 799, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300', rating: 4.1, stock: 65 },
    { id: 25, name: 'Phone Case', category: 'electronics', price: 299, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300', rating: 4.3, stock: 100 },
    { id: 26, name: 'Gym Bag', category: 'accessories', price: 1299, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', rating: 4.4, stock: 40 },
    { id: 27, name: 'Winter Coat', category: 'clothing', price: 3999, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300', rating: 4.9, stock: 20 },
    { id: 28, name: 'Loafers', category: 'footwear', price: 1799, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300', rating: 4.5, stock: 35 },
    { id: 29, name: 'USB Cable', category: 'electronics', price: 199, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300', rating: 4.0, stock: 150 },
    { id: 30, name: 'Tie Set', category: 'accessories', price: 699, image: 'https://images.unsplash.com/photo-1589756823695-278bc8617d30?w=300', rating: 4.2, stock: 55 },
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'clothing', name: 'Clothing', count: products.filter(p => p.category === 'clothing').length },
    { id: 'footwear', name: 'Footwear', count: products.filter(p => p.category === 'footwear').length },
    { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'accessories').length },
    { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add to cart function
  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // Increase quantity
      existingCart[existingItemIndex].quantity += 1;
      toast.info(`${product.name} quantity increased!`);
    } else {
      // Add new item
      existingCart.push({ ...product, quantity: 1 });
      toast.success(`${product.name} added to cart!`);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch event for cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-brand-600" />
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-brand-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 text-brand-600 hover:text-brand-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.stock < 30 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Low Stock
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">
                          ({Math.floor(Math.random() * 500 + 100)} reviews)
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xl font-bold text-brand-600">
                          ₹{product.price.toLocaleString()}
                        </p>
                        <span className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
