
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import VirtualTryOn from '@/components/virtual-try-on';
import { ShoppingCart, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductReviews from '@/components/products/product-reviews';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type ProductPageProps = {
  params: {
    id: string;
  };
};

const lensOptions = [
  { id: 'zero', name: 'Zero Power', price: 0 },
  { id: 'single-vision', name: 'Single Vision', price: 50 },
  { id: 'progressive', name: 'Progressive', price: 120 },
  { id: 'bifocal', name: 'Bifocal', price: 80 },
];

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  const [selectedLensId, setSelectedLensId] = useState(lensOptions[0].id);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  
  const selectedLens = lensOptions.find(l => l.id === selectedLensId) || lensOptions[0];
  const totalPrice = product.price + selectedLens.price;

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 50vw"
              priority
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No Image Available</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Badge variant="outline" className="w-fit">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          
          <p className="text-muted-foreground text-base md:text-lg">{product.description}</p>
          
          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Brand:</span> {product.brand}</div>
            <div><span className="font-semibold">Style:</span> {product.style}</div>
            <div><span className="font-semibold">Material:</span> {product.material}</div>
            <div><span className="font-semibold">Lens Type:</span> {product.lensType}</div>
          </div>
          
          <Separator />
          
          {product.category === 'Eyewear' && (
            <Card>
              <CardHeader>
                <CardTitle>Select Your Lens</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedLensId} onValueChange={setSelectedLensId}>
                  {lensOptions.map((lens) => (
                    <Label
                      key={lens.id}
                      htmlFor={lens.id}
                      className={cn(
                        'flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground',
                        selectedLensId === lens.id && 'border-primary'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={lens.id} id={lens.id} />
                        <span>{lens.name}</span>
                      </div>
                      <span className="font-semibold">
                        {lens.price > 0 ? `+ ₹${lens.price}` : 'Included'}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          <div className="mt-4">
            <p className="text-4xl font-bold text-primary">₹{totalPrice}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="flex-1" asChild>
              <Link href="/checkout">
                <ShoppingBag className="mr-2" />
                Buy Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>
          <div className="mt-4">
            <VirtualTryOn />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Card className="bg-secondary/50">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <CardTitle className="text-lg p-0">Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Returns are available if the product seal is not broken. Please check the product carefully upon receipt.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50">
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Truck className="w-8 h-8 text-primary" />
                <CardTitle className="text-lg p-0">Free Delivery</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">
                  Enjoy free delivery on all orders. No minimum purchase required.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      <ProductReviews productId={product.id} />
    </div>
  );
}
