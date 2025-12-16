
import { products, brands, styles, materials, lensTypes, genders, frameTypes } from '@/lib/products';
import ProductFilters from '@/components/products/product-filters';
import ProductList from '@/components/products/product-list';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Define the shape of the search parameters object.
// This is the correct way to type searchParams in the Next.js App Router.
type ResolvedSearchParams = {
  q?: string;
  category?: string;
  brand?: string | string[];
  style?: string | string[];
  material?: string | string[];
  lensType?: string | string[];
  gender?: string | string[];
  frameType?: string | string[];
};

// The page component no longer needs to be async.
// Next.js automatically resolves searchParams on the server.
export default function ProductsPage({ searchParams }: { searchParams: ResolvedSearchParams }) {

  const searchTerm = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">
          {searchTerm ? `Searching for "${searchTerm}"` : 'Our Collection'}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          {searchTerm
            ? `Showing results for your search.`
            : `Explore our wide range of sunglasses, eyewear, and lenses. Use the filters to find your perfect match.`}
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
           <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
            <ProductFilters
              brands={brands}
              styles={styles}
              materials={materials}
              lensTypes={lensTypes}
              genders={genders}
              frameTypes={frameTypes}
              searchParams={searchParams}
            />
          </Suspense>
        </aside>
        <main className="lg:col-span-3">
          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"><Skeleton className="h-96 w-full" /><Skeleton className="h-96 w-full" /><Skeleton className="h-96 w-full" /></div>}>
            <ProductList allProducts={products} searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
