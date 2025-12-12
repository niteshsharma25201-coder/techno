'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Landmark, Banknote } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const checkoutSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  address1: z.string().min(1, 'Address line is required.'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required.'),
  state: z.string().min(1, 'State is required.'),
  postalCode: z.string().min(1, 'Postal code is required.'),
  country: z.string().min(1, 'Country is required.'),
  paymentMethod: z.enum(['credit-card', 'debit-card', 'upi']),
  upiId: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      paymentMethod: 'credit-card',
      upiId: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const ordersRef = useMemoFirebase(
    () => (user ? collection(firestore, 'users', user.uid, 'orders') : null),
    [firestore, user]
  );

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!user || !ordersRef) {
      toast({
        variant: 'destructive',
        title: 'Not Logged In',
        description: 'You must be logged in to place an order.',
      });
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        totalAmount: 999, // Replace with actual cart total
        status: 'Pending',
        shippingAddress: {
          fullName: data.fullName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDocumentNonBlocking(ordersRef, orderData);
      
      toast({
        title: 'Order Placed!',
        description: 'Your order has been successfully placed.',
      });
      
      router.push(`/checkout/confirmation?orderId=${docRef.id}`);

    } catch (error) {
      console.error("Error placing order: ", error);
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="flex justify-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl">Checkout</CardTitle>
            <CardDescription>
              Please fill in your shipping and payment details to complete your order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Shipping Address Section */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apartment, suite, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State / Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Maharashtra" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="400001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <Separator />

                {/* Payment Method Section */}
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedPaymentMethod(value);
                        }}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <Label
                          htmlFor="credit-card"
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                          <CreditCard className="mb-3 h-6 w-6" />
                          Credit Card
                        </Label>
                        <Label
                          htmlFor="debit-card"
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="debit-card" id="debit-card" className="sr-only" />
                          <Landmark className="mb-3 h-6 w-6" />
                          Debit Card
                        </Label>
                        <Label
                          htmlFor="upi"
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="upi" id="upi" className="sr-only" />
                          <Banknote className="mb-3 h-6 w-6" />
                          UPI
                        </Label>
                      </RadioGroup>
                    )}
                  />

                  <div className="mt-6">
                    {selectedPaymentMethod === 'upi' && (
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="yourname@bank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {(selectedPaymentMethod === 'credit-card' || selectedPaymentMethod === 'debit-card') && (
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                         <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem className="md:col-span-3">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="**** **** **** ****" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Expiry (MM/YY)</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                              <FormItem className="md:col-span-1">
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      </div>
                    )}
                  </div>
                </section>

                <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
