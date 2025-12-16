import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductPageContent from '@/components/products/product-page-content';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
