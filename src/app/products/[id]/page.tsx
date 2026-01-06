
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductPageContent from '@/components/products/product-page-content';

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
