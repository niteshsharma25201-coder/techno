
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductPageContent from '@/components/products/product-page-content';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ProductPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Image Gallery Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        </div>
        {/* Product Info Skeleton */}
        <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-px w-full" />
            <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-12 w-1/2" />
            <div className="flex gap-4 mt-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
            </div>
        </div>
      </div>
    </div>
  );
}


export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductPageSkeleton />}>
        <ProductPageContent product={product} />
    </Suspense>
  );
}
