import { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProductCarousel } from '@/components/ProductCarousel';
import { supabase } from '@/lib/supabase';
import { Product } from '@/lib/types';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [mensShoes, setMensShoes] = useState<Product[]>([]);
  const [womensShoes, setWomensShoes] = useState<Product[]>([]);
  const [sportsShoes, setSportsShoes] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data: products } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('created_at', { ascending: false });

    if (products) {
      const typedProducts = products as unknown as Product[];
      setFeaturedProducts(typedProducts.slice(0, 10));
      setNewArrivals(typedProducts.filter(p => p.is_new).slice(0, 10));
      setBestSellers(typedProducts.filter(p => p.is_best_seller).slice(0, 10));

      const { data: categories } = await supabase
        .from('categories')
        .select('*');

      if (categories) {
        const typedCategories = categories as unknown as { id: string; name: string; slug: string; created_at: string }[];
        const mensCategory = typedCategories.find(c => c.slug === 'mens');
        const womensCategory = typedCategories.find(c => c.slug === 'womens');
        const sportsCategory = typedCategories.find(c => c.slug === 'sports');

        if (mensCategory) {
          setMensShoes(typedProducts.filter(p => p.category_id === mensCategory.id).slice(0, 10));
        }
        if (womensCategory) {
          setWomensShoes(typedProducts.filter(p => p.category_id === womensCategory.id).slice(0, 10));
        }
        if (sportsCategory) {
          setSportsShoes(typedProducts.filter(p => p.category_id === sportsCategory.id).slice(0, 10));
        }
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <ProductCarousel products={featuredProducts} title="Featured Products" />
      <ProductCarousel products={newArrivals} title="New Arrivals" />
      <ProductCarousel products={bestSellers} title="Best Sellers" />
      <ProductCarousel products={mensShoes} title="Men's Shoes" />
      <ProductCarousel products={womensShoes} title="Women's Shoes" />
      <ProductCarousel products={sportsShoes} title="Sports & Athletic" />
    </div>
  );
}
