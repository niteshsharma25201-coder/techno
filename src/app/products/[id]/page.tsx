
import { notFound, useRouter } from 'next/navigation';
import { products } from '@/lib/products';
import ProductPageContent from '@/components/products/product-page-content';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  // In Next.js 15, params can be a promise. We handle it here in a server component.
  const { id } = params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
