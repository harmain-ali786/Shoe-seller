import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';

type FilterType = 'all' | 'mens' | 'womens' | 'sports' | 'casual';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeFilter, products]);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });

    if (data) {
      const typedProducts = data as unknown as Product[];
      setProducts(typedProducts);
    }
    setLoading(false);
  };

  const filterProducts = async () => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
      return;
    }

    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', activeFilter)
      .single();

    if (categories) {
      const typedCategory = categories as unknown as { id: string };
      setFilteredProducts(products.filter(p => p.category_id === typedCategory.id));
    }
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Shoes', value: 'all' },
    { label: "Men's Shoes", value: 'mens' },
    { label: "Women's Shoes", value: 'womens' },
    { label: 'Sports & Athletic', value: 'sports' },
    { label: 'Casual Shoes', value: 'casual' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
          All Shoes
        </h1>

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.value)}
              className={
                activeFilter === filter.value
                  ? 'bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white'
                  : ''
              }
            >
              {filter.label}
            </Button>
          ))}
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
