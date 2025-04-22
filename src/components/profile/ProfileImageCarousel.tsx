
import React from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfilePhoto {
  id: string;
  url: string;
  uploadDate: string;
  isProfilePicture: boolean;
}

interface ProfileImageCarouselProps {
  photos: ProfilePhoto[];
}

export const ProfileImageCarousel = ({ photos }: ProfileImageCarouselProps) => {
  if (!photos || photos.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full mb-6">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo.id} className="basis-full">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-[3/2] cursor-pointer group">
                    <img
                      src={photo.url}
                      alt={`Profile photo from ${new Date(photo.uploadDate).toLocaleDateString()}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {photo.isProfilePicture && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                        Current Profile Photo
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <span className="text-white text-sm">Click to enlarge</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={photo.url}
                    alt={`Profile photo from ${new Date(photo.uploadDate).toLocaleDateString()}`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
