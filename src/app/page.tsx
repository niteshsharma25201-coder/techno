'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PersonalizedRecommendations from '@/components/recommendations/personalized-recommendations';
import { products } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { ShieldCheck, Truck, Gem } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const features = [
    {
      icon: Gem,
      title: 'Premium Quality',
      description: 'We use only the finest materials to craft durable and stylish eyewear.',
    },
    {
      icon: Truck,
      title: 'Free & Fast Shipping',
      description: 'Get your new favorite glasses delivered to your door, free of charge.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Shop with confidence using our secure and encrypted payment system.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={image.id}>
                <div className="relative h-[70vh] w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={image.imageHint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-shadow-lg">
            See the World Differently
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 text-shadow">
            Discover our exclusive collection of premium eyewear, crafted with precision and style.
          </p>
          <Button asChild size="lg" className="mt-8 shadow-lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <PersonalizedRecommendations />

      {/* Featured Products Section */}
      <section className="w-full py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Handpicked styles from our latest collection, just for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Technoii Optics?</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              We are committed to providing the best products and services to our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-card rounded-lg">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
