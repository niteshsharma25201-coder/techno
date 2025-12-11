export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imagePlaceholderId: string;
  category: 'Sunglasses' | 'Eyewear' | 'Lenses' | 'Contact Lenses';
  brand: string;
  style: string;
  material: string;
  lensType: string;
};
