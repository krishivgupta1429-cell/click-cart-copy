import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-banner.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Shopping hero banner"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Everything You Need,
                <span className="block">All in One Place</span>
              </h1>
              <p className="text-lg lg:text-xl opacity-90 max-w-lg">
                Discover millions of products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90 shadow-hero"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Browse Categories
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Stats or Additional Content */}
          <div className="lg:text-right space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">10M+</div>
                <div className="text-sm opacity-80">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">50M+</div>
                <div className="text-sm opacity-80">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">190+</div>
                <div className="text-sm opacity-80">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};