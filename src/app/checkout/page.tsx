'use client';

import { Suspense } from 'react';
import CheckoutForm from '@/components/checkout/checkout-form';
import OrderSummary from '@/components/checkout/order-summary';

function CheckoutContent() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="lg:order-2">
            <OrderSummary />
        </div>
        <div className="lg:order-1">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
