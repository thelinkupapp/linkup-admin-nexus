
import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { WandSparkles } from "lucide-react";

interface EnlargeableImageProps {
  src: string;
  alt: string;
  label?: string;
  showAiLabel?: boolean;
  className?: string;
  imageClassName?: string;
}

export const EnlargeableImage: React.FC<EnlargeableImageProps> = ({
  src,
  alt,
  label,
  showAiLabel = false,
  className = "",
  imageClassName = "",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`relative rounded-2xl overflow-hidden cursor-pointer transition-shadow shadow group hover:shadow-lg ${className}`}
          tabIndex={0}
          aria-label="Click to enlarge image"
        >
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${imageClassName}`}
            style={{ aspectRatio: "4/5" }}
          />
          {/* Label top left if exists */}
          {showAiLabel && (
            <span className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-black/70 text-white rounded-full text-xs font-semibold drop-shadow animate-fade-in">
              <WandSparkles className="h-4 w-4" />
              AI-Generated
            </span>
          )}
          {/* "Click to enlarge" hover */}
          <span className="absolute inset-0 flex items-center justify-center text-white text-base font-medium opacity-0 group-hover:opacity-100 bg-black/25 transition-opacity">
            Click to enlarge
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-2 rounded-2xl bg-black bg-opacity-80 max-w-3xl flex flex-col items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};
