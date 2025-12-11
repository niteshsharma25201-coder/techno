'use client';

import { useEffect, useState } from 'react';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-product-recommendations';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        // Simulate user behavior for the AI model
        const input = {
          viewingHistory: '1, 5, 8', // IDs for Classic Aviators, Titanium Frames, HD Vision Lenses
          searchBehavior: 'round sunglasses, polarized lenses',
        };

        const result = await getPersonalizedRecommendations(input);
        const recommendedIds = result.productRecommendations.split(',').map(id => id.trim());
        
        const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));
        setRecommendations(recommendedProducts);
      } catch (err) {
        console.error('Failed to fetch recommendations:', err);
        setError('Could not load personalized recommendations at this time.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
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

  if (error || recommendations.length === 0) {
    return (
        <section className="w-full py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>No Recommendations</AlertTitle>
                    <AlertDescription>
                        {error ? error : "We couldn't find any recommendations for you right now. Please check back later!"}
                    </AlertDescription>
                </Alert>
            </div>
        </section>
    )
  }

  return (
    <section className="w-full py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Just For You</h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            AI-powered suggestions based on your interests.
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
