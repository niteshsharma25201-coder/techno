
'use client';

import { useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { SearchX } from 'lucide-react';

type ProductListProps = {
  allProducts: Product[];
  searchParams?: {
    q?: string;
    category?: string;
    brand?: string | string[];
    style?: string | string[];
    material?: string | string[];
    lensType?: string | string[];
  };
};

export default function ProductList({ allProducts, searchParams }: ProductListProps) {

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    const { q, category, brand, style, material, lensType } = searchParams || {};

    if (q) {
      const searchTerm = q.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
    }
    
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    const filterByParam = (key: 'brand' | 'style' | 'material' | 'lensType') => {
      const value = searchParams?.[key];
      if (value && value.length > 0) {
        const values = Array.isArray(value) ? value : [value];
        products = products.filter(p => {
            const productValue = p[key as keyof Product];
            return typeof productValue === 'string' && values.includes(productValue);
        });
      }
    };

    filterByParam('brand');
    filterByParam('style');
    filterByParam('material');
    filterByParam('lensType');
    
    return products;
  }, [allProducts, searchParams]);

  if (filteredProducts.length === 0) {
    return (
      <Alert>
        <SearchX className="h-4 w-4" />
        <AlertTitle>No Products Found</AlertTitle>
        <AlertDescription>
          Try adjusting your search or filters.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
