import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PersonalizedRecommendations from '@/components/recommendations/personalized-recommendations';
import { products } from '@/lib/products';
import ProductCard from '@/components/products/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] text-white">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            See the World Differently
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            Discover our exclusive collection of premium eyewear, crafted with precision and style.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <PersonalizedRecommendations />

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
    </div>
  );
}
