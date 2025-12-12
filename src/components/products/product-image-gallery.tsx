'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

type ProductImageGalleryProps = {
  product: Product;
};

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const mainImage = PlaceHolderImages.find((p) => p.id === product.imagePlaceholderId);
  
  const thumbnailImages = PlaceHolderImages.filter(p => 
    p.id.startsWith(`${product.imagePlaceholderId}-thumb-`)
  );

  const galleryImages: ImagePlaceholder[] = mainImage ? [mainImage, ...thumbnailImages] : thumbnailImages;

  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | undefined>(mainImage);
  
  if (!selectedImage && galleryImages.length > 0) {
    setSelectedImage(galleryImages[0]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-lg">
        {selectedImage ? (
          <Image
            src={selectedImage.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
            data-ai-hint={selectedImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Image Available</span>
          </div>
        )}
      </div>
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              className={cn(
                "relative aspect-square w-full rounded-md overflow-hidden transition-all duration-200",
                "ring-2 ring-transparent hover:ring-primary focus:ring-primary focus:outline-none",
                selectedImage?.id === image.id && "ring-primary ring-offset-2 ring-offset-background"
              )}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.imageUrl}
                alt={`Thumbnail for ${product.name}`}
                fill
                className="object-cover"
                sizes="10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
