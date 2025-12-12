
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';

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

const singleVisionSubOptions = [
    { id: 'sv-basic', name: 'Basic', price: 20 },
    { id: 'sv-premium', name: 'Premium', price: 40 },
    { id: 'sv-super-premium', name: 'Super Premium', price: 60 },
    { id: 'sv-premium-thin', name: 'Premium Thin', price: 80 },
    { id: 'sv-tinted-glass', name: 'Tinted Glass', price: 50 },
];

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);
  const [selectedLensId, setSelectedLensId] = useState(lensOptions[0].id);
  const [selectedSingleVisionId, setSelectedSingleVisionId] = useState<string | null>(null);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  
  const selectedLens = lensOptions.find(l => l.id === selectedLensId) || lensOptions[0];
  const selectedSingleVisionLens = selectedLensId === 'single-vision' 
    ? singleVisionSubOptions.find(sv => sv.id === selectedSingleVisionId)
    : null;

  const totalPrice = product.price + selectedLens.price + (selectedSingleVisionLens?.price ?? 0);

  const handleMainLensChange = (value: string) => {
    setSelectedLensId(value);
    // Reset sub-selection if main lens type changes away from single vision
    if (value !== 'single-vision') {
        setSelectedSingleVisionId(null);
    } else {
        // Default to first sub-option when single-vision is selected
        setSelectedSingleVisionId(singleVisionSubOptions[0].id);
    }
  };

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
                <RadioGroup value={selectedLensId} onValueChange={handleMainLensChange}>
                  {lensOptions.map((lens) => (
                    <Collapsible key={lens.id} asChild>
                      <div>
                        <div className={cn(
                          'flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground',
                           selectedLensId === lens.id && 'border-primary'
                        )}>
                            <Label htmlFor={lens.id} className="flex items-center gap-3 w-full cursor-pointer">
                                <RadioGroupItem value={lens.id} id={lens.id} />
                                <span>{lens.name}</span>
                            </Label>
                            <div className="flex items-center gap-4">
                                <span className="font-semibold shrink-0">
                                    {lens.price > 0 ? `+ ₹${lens.price}` : 'Included'}
                                </span>
                                {lens.id === 'single-vision' && (
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-9 p-0" disabled={selectedLensId !== 'single-vision'}>
                                            <ChevronsUpDown className="h-4 w-4" />
                                            <span className="sr-only">Toggle</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                )}
                            </div>
                        </div>
                        {lens.id === 'single-vision' && (
                            <CollapsibleContent className="py-2 pl-4 pr-2 space-y-2">
                                 <RadioGroup value={selectedSingleVisionId ?? ''} onValueChange={setSelectedSingleVisionId}>
                                    {singleVisionSubOptions.map(subOption => (
                                        <Label key={subOption.id} htmlFor={subOption.id} className={cn(
                                            'flex items-center justify-between rounded-md border-2 border-muted bg-popover p-3 pl-4 hover:bg-accent hover:text-accent-foreground',
                                            selectedSingleVisionId === subOption.id && 'border-primary/50'
                                        )}>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem value={subOption.id} id={subOption.id} />
                                                <span>{subOption.name}</span>
                                            </div>
                                            <span className="font-semibold">
                                                + ₹{subOption.price}
                                            </span>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </CollapsibleContent>
                        )}
                      </div>
                    </Collapsible>
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
