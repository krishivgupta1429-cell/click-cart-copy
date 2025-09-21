import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
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
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'fill-warning text-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Prime Badge */}
          {product.prime && (
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-current" />
              <span className="font-medium text-primary">Prime</span>
            </div>
          )}

          {/* Title */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-muted-foreground">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    Save {discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
            
            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <span className="text-success font-medium">✓ In Stock</span>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Add to Cart */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-button hover:opacity-90 text-lg py-6"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Separator />

              {/* Shipping Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Truck className="h-4 w-4 text-success" />
                  <span>Free shipping on orders over $35</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-4 w-4 text-success" />
                  <span>Easy returns within 30 days</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Secure payment & privacy protection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};