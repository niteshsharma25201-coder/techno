'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderSummary() {
  const searchParams = useSearchParams();

  const productId = searchParams.get('productId');
  const framePrice = parseFloat(searchParams.get('framePrice') || '0');
  const lensPrice = parseFloat(searchParams.get('lensPrice') || '0');
  const lensSelection = searchParams.get('lensSelection');
  const shippingFee = 0; // Free shipping
  const totalPayable = framePrice + lensPrice + shippingFee;

  const product = products.find(p => p.id === productId);
  const image = PlaceHolderImages.find(p => p.id === product?.imagePlaceholderId);

  if (!product) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-24" />
                <div className="space-y-2 mt-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                />
            )}
          </div>
          <div>
            <p className="font-semibold">{product.name}</p>
            {lensSelection && <p className="text-sm text-muted-foreground">{lensSelection}</p>}
            <p className="font-medium">₹{framePrice.toFixed(2)}</p>
          </div>
        </div>

        <Separator />
        
        <div className="space-y-2">
            <div className="flex justify-between">
                <p className="text-muted-foreground">Frame Price</p>
                <p>₹{framePrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-muted-foreground">Lens Price</p>
                <p>₹{lensPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping Fee</p>
                <p>Free</p>
            </div>
        </div>

        <Separator />
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between font-bold text-lg">
            <span>Total Payable Amount</span>
            <span>₹{totalPayable.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
