import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  products: Product[];
  title: string;
  autoplay?: boolean;
}

export function ProductCarousel({ products, title, autoplay = true }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    const onPointerDown = () => clearInterval(interval);
    emblaApi.on('pointerDown', onPointerDown);

    return () => {
      clearInterval(interval);
      emblaApi.off('pointerDown', onPointerDown);
    };
  }, [emblaApi, autoplay]);

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
