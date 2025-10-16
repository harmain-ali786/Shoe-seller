import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.is_new && (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-md">
            NEW
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-rose-500 hover:bg-rose-600 text-white shadow-md">
            -{discount}%
          </Badge>
        )}
        {product.is_best_seller && (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-md">
            Best Seller
          </Badge>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white shadow-md",
          isWishlisted && "opacity-100"
        )}
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart
          className={cn(
            "h-5 w-5",
            isWishlisted && "fill-rose-500 text-rose-500"
          )}
        />
      </Button>

      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <h3 className="font-semibold text-base line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-md transition-all duration-300"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
