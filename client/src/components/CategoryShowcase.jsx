import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Watch, Footprints, Smartphone } from 'lucide-react';
import { CATEGORY_SHOWCASE } from '../constants/categories';

const CategoryShowcase = () => {
  // Map icon names to actual icon components
  const iconMap = {
    'Shirt': Shirt,
    'Watch': Watch,
    'Footprints': Footprints,
    'Smartphone': Smartphone,
  };

  const categories = CATEGORY_SHOWCASE;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our diverse collection of premium products across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 group-hover:bg-white/30 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                    </div>
                    <p className="text-sm mb-1">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{category.itemCount}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
