'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

type PrescriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  lensType: string;
};

export default function PrescriptionModal({
  isOpen,
  onClose,
  productName,
  lensType,
}: PrescriptionModalProps) {
  const router = useRouter();
  const [leftEye, setLeftEye] = useState('');
  const [rightEye, setRightEye] = useState('');
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  const handleProceed = () => {
    // In a real app, you would save the prescription data
    // to the cart/order state before navigating.
    console.log({
      productName,
      lensType,
      prescription: prescriptionFile
        ? { fileName: prescriptionFile.name }
        : { leftEye, rightEye },
    });
    router.push('/checkout');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {lensType} ({productName})
          </DialogTitle>
          <DialogDescription>
            Upload a prescription for the selected lens type to proceed, or you can manually
            enter your eye vision details.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div>
            <Label htmlFor="prescription-upload">Upload Prescription</Label>
            <Input
              id="prescription-upload"
              type="file"
              onChange={(e) => setPrescriptionFile(e.target.files?.[0] ?? null)}
              className="mt-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground font-medium">OR</span>
            <Separator className="flex-1" />
          </div>

          <div>
            <h3 className="text-center font-semibold mb-4 text-foreground">
              Manually Enter Eye Vision
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="right-eye">Right Eye (DV-OD)</Label>
                <Input
                  id="right-eye"
                  placeholder="e.g., -1.75"
                  value={rightEye}
                  onChange={(e) => setRightEye(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="left-eye">Left Eye (DV-OS)</Label>
                <Input
                  id="left-eye"
                  placeholder="e.g., -2.00"
                  value={leftEye}
                  onChange={(e) => setLeftEye(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Back
          </Button>
          <div className="flex gap-2">
             <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button type="button" onClick={handleProceed}>
              Proceed to Buy
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
