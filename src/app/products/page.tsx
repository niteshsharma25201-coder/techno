import { products, brands, styles, materials, lensTypes } from '@/lib/products';
import ProductFilters from '@/components/products/product-filters';
import ProductList from '@/components/products/product-list';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Our Collection</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of sunglasses, eyewear, and lenses. Use the filters to find your perfect match.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductFilters
            brands={brands}
            styles={styles}
            materials={materials}
            lensTypes={lensTypes}
          />
        </aside>
        <main className="lg:col-span-3">
          <ProductList allProducts={products} />
        </main>
      </div>
    </div>
  );
}
