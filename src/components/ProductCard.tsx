import React from 'react';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      className="group cursor-pointer hover:shadow-product transition-all duration-200 bg-gradient-card"
      onClick={() => onClick(product)}
    >
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="aspect-square mb-4 bg-muted rounded-md overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Prime Badge */}
        {product.prime && (
          <div className="flex items-center gap-1 mb-2">
            <Zap className="h-4 w-4 text-primary fill-current" />
            <span className="text-xs font-medium text-primary">Prime</span>
          </div>
        )}

        {/* Product Title */}
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-xs text-success font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-destructive font-medium">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-gradient-button hover:opacity-90 transition-opacity"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};