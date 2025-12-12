'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, orderBy, where, doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Review } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ProductReviewsProps = {
  productId: string;
};

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required.').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters.'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

function StarRating({ rating, setRating, interactive = false }: { rating: number; setRating?: (rating: number) => void; interactive?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-5 w-5',
            rating >= star ? 'text-primary fill-primary' : 'text-muted-foreground',
            interactive && 'cursor-pointer transition-colors hover:text-primary'
          )}
          onClick={() => interactive && setRating?.(star)}
        />
      ))}
    </div>
  );
}


export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [hoverRating, setHoverRating] = useState(0);

  const reviewsRef = useMemoFirebase(() => collection(firestore, 'products', productId, 'reviews'), [firestore, productId]);
  const reviewsQuery = useMemoFirebase(() => query(reviewsRef, orderBy('createdAt', 'desc')), [reviewsRef]);
  
  const { data: reviews, isLoading: isLoadingReviews } = useCollection<Review>(reviewsQuery);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    if (!user) return;

    const reviewData = {
      productId,
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(),
    };
    
    addDocumentNonBlocking(reviewsRef, reviewData);
    form.reset();
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {user ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Rating</FormLabel>
                    <FormControl>
                      <StarRating rating={field.value} setRating={field.onChange} interactive />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share your thoughts on this product..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit Review
              </Button>
            </form>
          </Form>
        ) : (
          <Alert>
            <AlertTitle>Want to share your thoughts?</AlertTitle>
            <AlertDescription>
              Please log in to leave a review.
            </AlertDescription>
          </Alert>
        )}

        <Separator />

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">
            {reviews?.length ?? 0} Reviews
          </h3>
          {isLoadingReviews && <p>Loading reviews...</p>}
          {!isLoadingReviews && reviews && reviews.length === 0 && (
            <p className="text-muted-foreground">Be the first to review this product!</p>
          )}
          {reviews?.map((review) => (
            <div key={review.id} className="flex gap-4">
              <Avatar>
                <AvatarFallback>{getInitials(review.userName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.userName}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="my-1">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
