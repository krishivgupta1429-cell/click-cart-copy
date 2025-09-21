import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { mockProducts, categories } from '@/data/products';
import { Product } from '@/types/product';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <main>
        <HeroSection />
        
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {searchQuery ? (
                `Showing ${filteredProducts.length} results for "${searchQuery}"`
              ) : (
                `Discover our amazing selection of products`
              )}
            </p>
          </div>
          
          <ProductGrid 
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
