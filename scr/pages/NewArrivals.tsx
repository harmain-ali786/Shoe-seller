import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewProducts();
  }, []);

  const loadNewProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('is_new', true)
      .order('created_at', { ascending: false });

    if (data) {
      const typedProducts = data as unknown as Product[];
      setProducts(typedProducts);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            New Arrivals
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our latest collection of shoes
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No new arrivals at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
