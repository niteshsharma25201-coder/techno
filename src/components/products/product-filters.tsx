import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type ProductFiltersProps = {
  brands: string[];
  styles: string[];
  materials: string[];
  lensTypes: string[];
  // In a real app, these would be controlled by a state management solution
  // and passed down to ProductList. For this example, filtering is client-side in ProductList.
};

export default function ProductFilters({
  brands,
  styles,
  materials,
  lensTypes,
}: ProductFiltersProps) {
  // This component is for UI display.
  // The filtering logic is managed in ProductList component for this example.
  // In a larger app, you'd use state management (like Zustand or Context)
  // to lift the filter state up.

  const renderFilterOptions = (items: string[], filterId: string) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox id={`${filterId}-${item}`} value={item} />
          <Label htmlFor={`${filterId}-${item}`} className="font-normal">
            {item}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['brand', 'style']}>
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
              {renderFilterOptions(lensTypes, 'lens')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
