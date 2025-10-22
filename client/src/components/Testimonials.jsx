import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, CUSTOMER_STATS } from '../constants/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = TESTIMONIALS;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-50 to-purple-50 rounded-2xl shadow-xl p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-200 opacity-50" />
            
            <div className="text-center mb-8">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {currentTestimonial.name}
              </h3>
              <p className="text-brand-600 font-medium mb-3">
                {currentTestimonial.role}
              </p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < currentTestimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-lg text-center leading-relaxed mb-8 italic">
              "{currentTestimonial.text}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white hover:bg-brand-500 hover:text-white text-brand-600 transition-colors shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-brand-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white hover:bg-brand-500 hover:text-white text-brand-600 transition-colors shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">{CUSTOMER_STATS.happyCustomers}</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">{CUSTOMER_STATS.averageRating}</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">{CUSTOMER_STATS.satisfactionRate}</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
