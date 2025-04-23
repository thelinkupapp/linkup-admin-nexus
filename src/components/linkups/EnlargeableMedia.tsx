
import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Video } from "lucide-react";

interface EnlargeableMediaProps {
  type: "image" | "video";
  src: string;
  alt: string;
  thumbnail?: string;
  className?: string;
}

export const EnlargeableMedia: React.FC<EnlargeableMediaProps> = ({
  type,
  src,
  alt,
  thumbnail,
  className = "",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`relative aspect-square rounded-md overflow-hidden border group cursor-pointer ${className}`}
        >
          {type === "image" ? (
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full relative">
              <img 
                src={thumbnail || src} 
                alt={alt}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 rounded-full p-3">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          )}
          <span className="absolute inset-0 flex items-center justify-center text-white text-base font-medium opacity-0 group-hover:opacity-100 bg-black/25 transition-opacity">
            Click to enlarge
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-2 rounded-2xl bg-black bg-opacity-80 max-w-4xl flex flex-col items-center justify-center">
        {type === "image" ? (
          <img
            src={src}
            alt={alt}
            className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
          />
        ) : (
          <video
            src={src}
            controls
            className="rounded-lg w-full h-auto max-h-[80vh]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
