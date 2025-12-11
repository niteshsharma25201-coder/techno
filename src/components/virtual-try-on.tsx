'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Camera, X } from 'lucide-react';

export default function VirtualTryOn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="flex-1">
          <Camera className="mr-2" />
          Virtual Try-On
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Virtual Try-On</DialogTitle>
          <DialogDescription>
            See how these glasses look on you! Allow camera access to begin.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-square w-full bg-muted rounded-md flex flex-col items-center justify-center text-center p-4">
          <Camera className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Camera feed would appear here.</p>
          <p className="text-xs text-muted-foreground/80 mt-2">
            This is a UI demonstration of the Virtual Try-On feature.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
