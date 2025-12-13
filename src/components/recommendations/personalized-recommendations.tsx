'use client';

import { useEffect, useState } from 'react';
import { products } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Lightbulb } from 'lucide-react';

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // To prevent API rate-limiting errors, we'll use a static list of featured products.
    // In a production environment, you would implement proper caching or use a dedicated recommendations engine.
    const featuredProductIds = ['1', '2', '3', '4'];
    const recommendedProducts = products.filter(p => featuredProductIds.includes(p.id));
    setRecommendations(recommendedProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Just For You</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Getting personalized recommendations based on your activity...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Just For You</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Our top picks based on your interests.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendations.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
