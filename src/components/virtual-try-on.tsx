'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Camera, X, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function VirtualTryOn() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    const disableCamera = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setHasCameraPermission(null);
    };

    if (isOpen) {
      setHasCameraPermission(null); // Reset on open
      enableCamera();
    } else {
      disableCamera();
    }

    return () => {
      disableCamera(); // Cleanup on component unmount
    };
  }, [isOpen, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <div className="relative aspect-square w-full bg-muted rounded-md flex flex-col items-center justify-center text-center p-4 overflow-hidden">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
          {hasCameraPermission === false && (
             <div className="z-10 bg-muted/80 p-4 rounded-md">
                <VideoOff className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Camera access is required.</p>
             </div>
          )}
           {hasCameraPermission === null && (
             <div className="z-10">
                <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Requesting camera access...</p>
             </div>
          )}
        </div>
        {hasCameraPermission === false && (
             <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access in your browser settings to use this feature.
              </AlertDescription>
            </Alert>
        )}
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
