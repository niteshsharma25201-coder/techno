

'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import PrescriptionModal from '@/components/products/prescription-modal';

type ProductPageProps = {
  params: {
    id: string;
  };
};

const lensOptions = [
  { id: 'zero', name: 'Zero Power', price: 0 },
  { id: 'single-vision', name: 'Single Vision', price: 0 },
  { id: 'progressive', name: 'Progressive', price: 0 },
  { id: 'bifocal', name: 'Bifocal', price: 0 },
];

const singleVisionSubOptions = [
    { id: 'sv-basic', name: 'Basic', price: 450 },
    { id: 'sv-premium', name: 'Premium', price: 650 },
    { id: 'sv-super-premium', name: 'Super Premium', price: 1050 },
    { id: 'sv-premium-thin', name: 'Premium Thin', price: 2250 },
    { id: 'sv-tinted-glass', name: 'Tinted Glass', price: 0 },
];

const progressiveSubOptions = [
    { id: 'prog-basic', name: 'Basic', price: 1150 },
    { id: 'prog-premium', name: 'Premium', price: 1700 },
    { id: 'prog-super-premium', name: 'Super Premium', price: 2450 },
    { id: 'prog-premium-thin', name: 'Premium Thin', price: 4500 },
    { id: 'prog-tinted-glass', name: 'Tinted Glass', price: 0 },
];

const bifocalSubOptions = [
    { id: 'bifocal-basic', name: 'Basic', price: 450 },
    { id: 'bifocal-premium', name: 'Premium', price: 650 },
    { id: 'bifocal-super-premium', name: 'Super Premium', price: 1050 },
    { id: 'bifocal-premium-thin', name: 'Premium Thin', price: 2250 },
    { id: 'bifocal-tinted-glass', name: 'Tinted Glass', price: 0 },
];

const tintedGlassSubOptions = [
    { id: 'single', name: 'Single', price: 850 },
    { id: 'double', name: 'Double', price: 1250 },
];

const progressiveTintedGlassSubOptions = [
    { id: 'single', name: 'Single', price: 1650 },
    { id: 'double', name: 'Double', price: 2050 },
];


export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);
  const [selectedLensId, setSelectedLensId] = useState(lensOptions[0].id);
  const [selectedSingleVisionId, setSelectedSingleVisionId] = useState<string | null>(null);
  const [selectedProgressiveId, setSelectedProgressiveId] = useState<string | null>(null);
  const [selectedBifocalId, setSelectedBifocalId] = useState<string | null>(null);
  const [selectedTintedGlassType, setSelectedTintedGlassType] = useState<'single' | 'double' | null>(null);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  if (!product) {
    notFound();
  }
  
  const isTintedGlassSelected = selectedSingleVisionId?.endsWith('tinted-glass') ||
                                selectedProgressiveId?.endsWith('tinted-glass') ||
                                selectedBifocalId?.endsWith('tinted-glass');
                                
  useEffect(() => {
    if (isTintedGlassSelected) {
      if (!selectedTintedGlassType) {
        setSelectedTintedGlassType('single');
      }
    } else {
      setSelectedTintedGlassType(null);
    }
  }, [isTintedGlassSelected, selectedTintedGlassType]);


  const image = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  
  const selectedLens = lensOptions.find(l => l.id === selectedLensId) || lensOptions[0];
  
  const selectedSingleVisionLens = selectedLensId === 'single-vision' 
    ? singleVisionSubOptions.find(sv => sv.id === selectedSingleVisionId)
    : null;

  const selectedProgressiveLens = selectedLensId === 'progressive'
    ? progressiveSubOptions.find(p => p.id === selectedProgressiveId)
    : null;
    
  const selectedBifocalLens = selectedLensId === 'bifocal'
    ? bifocalSubOptions.find(b => b.id === selectedBifocalId)
    : null;
    
  const currentTintedGlassOptions = selectedLensId === 'progressive' ? progressiveTintedGlassSubOptions : tintedGlassSubOptions;

  const selectedTintedGlassOption = isTintedGlassSelected
    ? currentTintedGlassOptions.find(t => t.id === selectedTintedGlassType)
    : null;

  const totalPrice = product.price + (selectedLens?.price ?? 0)
    + (selectedSingleVisionLens?.price ?? 0)
    + (selectedProgressiveLens?.price ?? 0)
    + (selectedBifocalLens?.price ?? 0)
    + (selectedTintedGlassOption?.price ?? 0);

  const handleMainLensChange = (value: string) => {
    setSelectedLensId(value);
    setSelectedSingleVisionId(null);
    setSelectedProgressiveId(null);
    setSelectedBifocalId(null);

    if (value === 'single-vision') {
        setSelectedSingleVisionId(singleVisionSubOptions[0].id);
    } else if (value === 'progressive') {
        setSelectedProgressiveId(progressiveSubOptions[0].id);
    } else if (value === 'bifocal') {
        setSelectedBifocalId(bifocalSubOptions[0].id);
    }
  };
  
  const handleSubLensChange = (value: string, lensType: 'single-vision' | 'progressive' | 'bifocal') => {
    if (lensType === 'single-vision') {
        setSelectedSingleVisionId(value);
    } else if (lensType === 'progressive') {
        setSelectedProgressiveId(value);
    } else if (lensType === 'bifocal') {
        setSelectedBifocalId(value);
    }
  };

  const handleBuyNowClick = () => {
    const isEyewear = product.category === 'Eyewear';
    const isLensSelected = selectedLensId !== 'zero';

    if (isEyewear && isLensSelected) {
      setIsPrescriptionModalOpen(true);
    } else {
      router.push('/checkout');
    }
  };
  
  const getSelectedLensName = () => {
    if (selectedLens.id === 'zero') return 'Zero Power';

    let subLensName = '';
    if (selectedSingleVisionLens) subLensName = selectedSingleVisionLens.name;
    else if (selectedProgressiveLens) subLensName = selectedProgressiveLens.name;
    else if (selectedBifocalLens) subLensName = selectedBifocalLens.name;

    if (isTintedGlassSelected && selectedTintedGlassOption) {
      return `${selectedLens.name} - ${subLensName} (${selectedTintedGlassOption.name} Tint)`;
    }
    
    return `${selectedLens.name} - ${subLensName}`;
  }

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
              <CardContent className="space-y-4">
                <RadioGroup value={selectedLensId} onValueChange={handleMainLensChange}>
                  {lensOptions.map((lens) => (
                    <div key={lens.id}>
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
                            </div>
                        </div>
                      </div>
                  ))}
                </RadioGroup>

                {selectedLensId === 'single-vision' && selectedSingleVisionId && (
                    <div className="pl-4 pr-2 space-y-2">
                        <Label>Single Vision Options</Label>
                        <Select onValueChange={(value) => handleSubLensChange(value, 'single-vision')} value={selectedSingleVisionId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a single vision lens type" />
                            </SelectTrigger>
                            <SelectContent>
                                {singleVisionSubOptions.map(subOption => (
                                    <SelectItem key={subOption.id} value={subOption.id}>
                                        {subOption.name} {subOption.price > 0 ? `(+ ₹${subOption.price})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                
                {selectedLensId === 'progressive' && selectedProgressiveId && (
                    <div className="pl-4 pr-2 space-y-2">
                        <Label>Progressive Options</Label>
                        <Select onValueChange={(value) => handleSubLensChange(value, 'progressive')} value={selectedProgressiveId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a progressive lens type" />
                            </SelectTrigger>
                            <SelectContent>
                                {progressiveSubOptions.map(subOption => (
                                    <SelectItem key={subOption.id} value={subOption.id}>
                                        {subOption.name} {subOption.price > 0 ? `(+ ₹${subOption.price})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                
                {selectedLensId === 'bifocal' && selectedBifocalId && (
                    <div className="pl-4 pr-2 space-y-2">
                        <Label>Bifocal Options</Label>
                        <Select onValueChange={(value) => handleSubLensChange(value, 'bifocal')} value={selectedBifocalId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a bifocal lens type" />
                            </SelectTrigger>
                            <SelectContent>
                                {bifocalSubOptions.map(subOption => (
                                    <SelectItem key={subOption.id} value={subOption.id}>
                                        {subOption.name} {subOption.price > 0 ? `(+ ₹${subOption.price})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {isTintedGlassSelected && selectedTintedGlassType && (
                    <div className="pl-4 pr-2 space-y-2">
                        <Label>Tinted Glass Type</Label>
                        <RadioGroup value={selectedTintedGlassType} onValueChange={(value: 'single' | 'double') => setSelectedTintedGlassType(value)} className="flex gap-4">
                           {currentTintedGlassOptions.map((tint) => (
                             <div key={tint.id}>
                                <div className={cn(
                                  'flex items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground',
                                   selectedTintedGlassType === tint.id && 'border-primary'
                                )}>
                                    <Label htmlFor={`tint-${tint.id}`} className="flex items-center gap-3 w-full cursor-pointer">
                                        <RadioGroupItem value={tint.id} id={`tint-${tint.id}`} />
                                        <span>{tint.name} {tint.price > 0 ? `(+ ₹${tint.price})` : ''}</span>
                                    </Label>
                                </div>
                              </div>
                          ))}
                        </RadioGroup>
                    </div>
                )}

              </CardContent>
            </Card>
          )}

          <div className="mt-4">
            <p className="text-4xl font-bold text-primary">₹{totalPrice}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="flex-1" onClick={handleBuyNowClick}>
              <ShoppingBag className="mr-2" />
              Buy Now
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
       <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        productName={product.name}
        lensType={getSelectedLensName()}
      />
    </div>
  );
}

