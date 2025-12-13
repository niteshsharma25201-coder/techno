
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PersonalizedRecommendations from '@/components/recommendations/personalized-recommendations';
import { products } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Truck, Gem, Gift, Eye, Sun, Target, Contact } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const bannerImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

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

  const heroSlides = [
    {
      id: 'hero-banner-1',
      title: 'Free Eye Testing',
      subtitle: 'Frames ke sath lens free',
      buttonText: 'Shop Now',
      buttonLink: '/products',
    },
    {
      id: 'hero-1',
      title: 'Style & Vision',
      subtitle: 'Discover your perfect pair.',
      buttonText: 'Explore Collection',
      buttonLink: '/products?category=Eyewear',
    },
    {
      id: 'hero-2',
      title: 'Expertly Crafted',
      subtitle: 'For the modern professional.',
      buttonText: 'See Menswear',
      buttonLink: '/products?q=man',
    },
    {
        id: 'hero-4',
        title: 'Personalized Service',
        subtitle: 'Let us help you find the perfect fit.',
        buttonText: 'Visit Us',
        buttonLink: '/contact',
    },
    {
      id: 'hero-5',
      title: 'Summer Shades',
      subtitle: 'Protect your eyes in style.',
      buttonText: 'View Sunglasses',
      buttonLink: '/products?category=Sunglasses',
    },
  ];

  const categories = [
    {
      title: 'Eyewear',
      description: 'Find your perfect frame.',
      href: '/products?category=Eyewear',
      icon: Eye,
      imageId: 'hero-2',
    },
    {
      title: 'Sunglasses',
      description: 'Style and protection.',
      href: '/products?category=Sunglasses',
      icon: Sun,
      imageId: 'hero-banner-1',
    },
    {
      title: 'Lenses',
      description: 'Clarity and comfort.',
      href: '/products?category=Lenses',
      icon: Target,
      imageId: 'product-8',
    },
    {
      title: 'Contact Lenses',
      description: 'Effortless vision.',
      href: '/products?category=Contact+Lenses',
      icon: Contact,
      imageId: 'product-7',
    }
  ];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
       <section className="relative w-full h-[60vh] text-white overflow-hidden">
         <Carousel
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroSlides.map((slide) => {
              const bannerImage = PlaceHolderImages.find(p => p.id === slide.id);
              return (
                <CarouselItem key={slide.id}>
                    <div className="relative w-full h-[60vh]">
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        {bannerImage && (
                        <Image
                            src={bannerImage.imageUrl}
                            alt={bannerImage.description}
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint={bannerImage.imageHint}
                        />
                        )}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
                            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-2xl md:text-3xl font-semibold text-white/90 text-shadow">
                                {slide.subtitle}
                            </p>
                            <Button asChild size="lg" className="mt-8 shadow-lg">
                                <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex" />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
              return (
                <Link key={category.title} href={category.href} className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                        {categoryImage ? (
                          <Image
                            src={categoryImage.imageUrl}
                            alt={category.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={categoryImage.imageHint}
                          />
                        ) : (
                          <div className="bg-muted flex items-center justify-center h-full">
                             <category.icon className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Technoii?</h2>
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

      {/* BOGO Banner Section */}
      <section className="w-full py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Gift className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Buy One, Get One Free</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Purchase any frame with lenses and receive another frame of your choice absolutely free!
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 shadow-lg">
            <Link href="/products">Explore Frames</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
