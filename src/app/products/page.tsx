
import { products, brands, styles, materials, lensTypes, genders, frameTypes } from '@/lib/products';
import ProductFilters from '@/components/products/product-filters';
import ProductList from '@/components/products/product-list';

type ProductsPageProps = {
  searchParams?: {
    q?: string;
    category?: string;
    brand?: string | string[];
    style?: string | string[];
    material?: string | string[];
    lensType?: string | string[];
    gender?: string | string[];
    frameType?: string | string[];
  };
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const searchTerm = searchParams?.q || '';

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
          <ProductFilters
            brands={brands}
            styles={styles}
            materials={materials}
            lensTypes={lensTypes}
            genders={genders}
            frameTypes={frameTypes}
            searchParams={searchParams}
          />
        </aside>
        <main className="lg:col-span-3">
          <ProductList allProducts={products} searchParams={searchParams} />
        </main>
      </div>
    </div>
  );
}
