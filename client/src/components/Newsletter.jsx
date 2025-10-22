import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      toast.success('Successfully subscribed to our newsletter!');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-brand-100 text-lg max-w-2xl mx-auto">
              Stay updated with our latest products, exclusive offers, and fashion tips. 
              Join our community of 10,000+ subscribers!
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-300 transition-all"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-brand-600 font-semibold px-8 py-4 rounded-lg hover:bg-brand-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-brand-100 text-sm text-center mt-4">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Thank You for Subscribing!
              </h3>
              <p className="text-brand-100">
                Check your inbox for a confirmation email.
              </p>
            </div>
          )}

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold mb-1">🎁</p>
              <p className="text-sm">Exclusive Offers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold mb-1">🆕</p>
              <p className="text-sm">New Arrivals</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold mb-1">💡</p>
              <p className="text-sm">Fashion Tips</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-2xl font-bold mb-1">⚡</p>
              <p className="text-sm">Flash Sales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
