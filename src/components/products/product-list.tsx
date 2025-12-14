
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
    gender?: string | string[];
  };
};

export default function ProductList({ allProducts, searchParams }: ProductListProps) {

  const filteredProducts = useMemo(() => {
    let products = allProducts;
    const { q, category, brand, style, material, lensType, gender } = searchParams || {};

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
    
    const filterByParam = (key: 'brand' | 'style' | 'material' | 'lensType' | 'gender') => {
        const urlValue = searchParams?.[key];
        if (!urlValue || (Array.isArray(urlValue) && urlValue.length === 0)) {
            return;
        }

        const filterValues = Array.isArray(urlValue) ? urlValue : [urlValue];
        
        products = products.filter(p => {
            const productValue = p[key];
            return typeof productValue === 'string' && filterValues.includes(productValue);
        });
    };

    filterByParam('brand');
    filterByParam('style');
    filterByParam('material');
    filterByParam('lensType');
    filterByParam('gender');
    
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
