// NOTE: For simplicity in this scaffold, filtering logic is self-contained here.
// In a production app, you would likely use URL state (search params) or a
// state management library (like Zustand) to manage filters and fetch data
// from a server.

import { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { SearchX } from 'lucide-react';

type ProductListProps = {
  allProducts: Product[];
};

export default function ProductList({ allProducts }: ProductListProps) {
  // In a real app, you would get filtered products from a server-side fetch
  // or apply filters based on state from a state manager.
  // For this demo, we're just displaying all products.
  const filteredProducts = allProducts;

  if (filteredProducts.length === 0) {
    return (
      <Alert>
        <SearchX className="h-4 w-4" />
        <AlertTitle>No Products Found</AlertTitle>
        <AlertDescription>
          Try adjusting your filters or check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
