
import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Video, Maximize2 } from "lucide-react";

interface EnlargeableMediaProps {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  alt: string;
  className?: string;
}

export const EnlargeableMedia: React.FC<EnlargeableMediaProps> = ({
  type,
  url,
  thumbnail,
  alt,
  className = "",
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`relative w-full h-full cursor-pointer group ${className}`}
          tabIndex={0}
          aria-label="Click to enlarge"
        >
          {type === "image" ? (
            <img 
              src={url} 
              alt={alt} 
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="relative w-full h-full">
              <img 
                src={thumbnail || ""} 
                alt={alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <Video className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 p-2 rounded-full">
              <Maximize2 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="p-2 rounded-2xl bg-black bg-opacity-80 max-w-4xl flex items-center justify-center">
        {type === "image" ? (
          <img
            src={url}
            alt={alt}
            className="rounded-lg w-full h-auto max-h-[80vh] object-contain"
          />
        ) : (
          <video
            src={url}
            controls
            poster={thumbnail}
            className="rounded-lg w-full h-auto max-h-[80vh]"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
