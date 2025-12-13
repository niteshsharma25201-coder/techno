
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ProductFiltersProps = {
  brands: string[];
  styles: string[];
  materials: string[];
  lensTypes: string[];
  searchParams?: {
    q?: string;
    category?: string;
    brand?: string | string[];
    style?: string | string[];
    material?: string | string[];
    lensType?: string | string[];
  };
};

export default function ProductFilters({
  brands,
  styles,
  materials,
  lensTypes,
  searchParams,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const handleFilterChange = useCallback(
    (filterName: string, value: string, checked: boolean) => {
      const newParams = new URLSearchParams(currentSearchParams.toString());
      
      if (checked) {
        newParams.append(filterName, value);
      } else {
        const allValues = newParams.getAll(filterName);
        newParams.delete(filterName);
        allValues.filter((v) => v !== value).forEach(v => newParams.append(filterName, v));
      }
      
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [currentSearchParams, pathname, router]
  );
  
  const getFilterValues = (key: keyof NonNullable<typeof searchParams>): string[] => {
    const values = searchParams?.[key];
    if (Array.isArray(values)) return values;
    if (typeof values === 'string') return [values];
    return [];
  };

  const renderFilterOptions = (items: string[], filterId: string) => {
    const selectedValues = getFilterValues(filterId as any);
    return (
        <div className="space-y-2">
        {items.map((item) => (
            <div key={item} className="flex items-center space-x-2">
            <Checkbox
                id={`${filterId}-${item}`}
                value={item}
                checked={selectedValues.includes(item)}
                onCheckedChange={(checked) => handleFilterChange(filterId, item, !!checked)}
            />
            <Label htmlFor={`${filterId}-${item}`} className="font-normal cursor-pointer">
                {item}
            </Label>
            </div>
        ))}
        </div>
    );
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['brand', 'style']} className="w-full">
          <AccordionItem value="brand">
            <AccordionTrigger>Brand</AccordionTrigger>
            <AccordionContent>
              {renderFilterOptions(brands, 'brand')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="style">
            <AccordionTrigger>Style</AccordionTrigger>
            <AccordionContent>
              {renderFilterOptions(styles, 'style')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="material">
            <AccordionTrigger>Material</AccordionTrigger>
            <AccordionContent>
              {renderFilterOptions(materials, 'material')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="lensType">
            <AccordionTrigger>Lens Type</AccordionTrigger>
            <AccordionContent>
              {renderFilterOptions(lensTypes, 'lensType')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
