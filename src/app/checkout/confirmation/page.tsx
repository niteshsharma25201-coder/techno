'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Home } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="items-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Thank you for your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderId && (
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground">Your Order ID is:</p>
              <p className="text-lg font-mono font-semibold">{orderId}</p>
            </div>
          )}
          <p>
            You will receive an email confirmation shortly with your order details.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
