'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const ordersQuery = useMemoFirebase(
    () =>
      user
        ? query(collection(firestore, 'users', user.uid, 'orders'), orderBy('createdAt', 'desc'))
        : null,
    [user, firestore]
  );

  const { data: orders, isLoading: isLoadingOrders } = useCollection(ordersQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Shipped':
        return 'default';
      case 'Processing':
      case 'Pending':
        return 'secondary';
      case 'Delivered':
        return 'outline';
      case 'Canceled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const renderContent = () => {
    if (isUserLoading || isLoadingOrders) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (!user) {
      return (
         <Alert>
          <AlertTitle>Please Log In</AlertTitle>
          <AlertDescription>You need to be logged in to view your orders.</AlertDescription>
        </Alert>
      );
    }
    
    if (orders && orders.length === 0) {
      return (
         <Alert>
          <AlertTitle>No Orders Found</AlertTitle>
          <AlertDescription>You haven&apos;t placed any orders yet.</AlertDescription>
          <Button asChild className="mt-4">
              <Link href="/products">Start Shopping</Link>
          </Button>
        </Alert>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.id}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell className="text-right">₹{order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <CardDescription>Here is a list of your past orders.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
