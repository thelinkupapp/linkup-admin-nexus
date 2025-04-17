
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Camera, Zap, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
  id: string;
  type: string;
  url: string;
  source?: "uploaded" | "ai-generated" | "stock";
}

interface LinkupMediaProps {
  media: MediaItem[];
  className?: string;
}

const sourceConfig = {
  uploaded: {
    icon: Camera,
    label: "Uploaded",
    className: "bg-blue-100 text-blue-800 border-blue-200"
  },
  "ai-generated": {
    icon: Zap,
    label: "AI-Generated",
    className: "bg-purple-100 text-purple-800 border-purple-200"
  },
  stock: {
    icon: ImageIcon,
    label: "Stock",
    className: "bg-green-100 text-green-800 border-green-200"
  }
};

export function LinkupMedia({ media, className }: LinkupMediaProps) {
  if (!media?.length) return null;

  // For now, just show the first media item
  const firstMedia = media[0];
  const source = firstMedia.source || "uploaded"; // Default to uploaded if not specified
  const { icon: SourceIcon, label, className: sourceClassName } = sourceConfig[source];

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <AspectRatio ratio={9/16} className="bg-muted">
        {firstMedia.type === "image" && (
          <img 
            src={firstMedia.url} 
            alt="Linkup media" 
            className="object-cover w-full h-full"
          />
        )}
        {firstMedia.type === "video" && (
          <video 
            src={firstMedia.url}
            controls
            className="w-full h-full object-cover"
          />
        )}
      </AspectRatio>
      
      <Badge 
        variant="outline" 
        className={cn(
          "absolute top-3 right-3 flex items-center gap-1.5",
          sourceClassName
        )}
      >
        <SourceIcon className="h-3.5 w-3.5" />
        {label}
      </Badge>
    </div>
  );
}
