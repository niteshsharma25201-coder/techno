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

export type Review = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};
