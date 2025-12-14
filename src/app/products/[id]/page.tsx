
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductPageContent from '@/components/products/product-page-content';

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
