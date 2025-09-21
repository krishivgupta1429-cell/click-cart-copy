import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/products';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onCategorySelect, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Deliver to New York 10001
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Hello, Sign in</span>
              <span>Returns & Orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary flex-shrink-0">
            AmazonClone
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <select 
                className="bg-muted border border-border rounded-l-md px-3 py-2 text-sm"
                onChange={(e) => onCategorySelect(e.target.value)}
                value={selectedCategory}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-l-0"
                />
              </div>
              
              <Button 
                type="submit" 
                size="sm" 
                className="rounded-l-none bg-gradient-button hover:opacity-90 px-4"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Cart */}
          <Button variant="ghost" className="flex items-center gap-2 relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-semibold">Cart</span>
            {getTotalItems() > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {getTotalItems()}
              </Badge>
            )}
          </Button>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-6 text-sm overflow-x-auto">
            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => onCategorySelect(category)}
                className={`whitespace-nowrap hover:text-primary transition-colors ${
                  selectedCategory === category ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};